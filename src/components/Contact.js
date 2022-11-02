import React, { useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { blinkEnter1, blinkExit } from '../other/animations'
import Theme from '../other/Theme'

import {
	GraphicsFieldSmall,
	TextName,
	TextHi,
	TextMail,
	TextMessage,
	GraphicsFieldLarge,
	TextSend,
} from '../other/Vectors'

const Container = styled.div`
	position: absolute;
	z-index: -100;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	animation: ${({ state }) => {
			switch (state) {
				case 'entering':
					return
				case 'entered':
					return blinkEnter1
				case 'exiting':
					return blinkExit
				case 'exited':
					return
			}
		}}
		0.3s step-end forwards;
	${({ state }) => {
		switch (state) {
			case 'entering':
				return
			case 'entered':
				return 'animation-delay: .5s'
			case 'exiting':
				return
			case 'exited':
				return
		}
	}};
`

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
`

const Text = styled(TextHi)`
	margin-bottom: 5rem;
	backface-visibility: hidden;
	-webkit-backface-visibility: hidden;
	& > path {
		fill: ${Theme.text};
	}
`

const FieldS = styled.div`
	position: relative;
	width: 319px;
	height: 33px;
	padding: 0.5rem;
	margin-top: 0.5rem;
	margin-bottom: 2rem;
`
const FieldBorderS = styled(GraphicsFieldSmall)`
	position: absolute;
	transform: translate(-0.5rem, -0.5rem);
`
const InputS = styled.input`
	border: none;
	background-color: ${Theme.background};
	position: relative;
	width: 100%;
	height: 100%;
	color: ${Theme.text};
	box-shadow: 0 0 0px 1000px ${Theme.background} inset;
	-webkit-text-fill-color: ${Theme.text};

	&:focus {
		outline: none;
	}
	&:active {
	}
`

const FieldL = styled.div`
	position: relative;
	width: 319px;
	height: 130px;
	padding: 0.5rem;
	margin-top: 0.5rem;
	margin-bottom: 4rem;
`
const FieldBorderL = styled(GraphicsFieldLarge)`
	position: absolute;
	transform: translate(-0.5rem, -0.5rem);
`
const InputMsg = styled.textarea`
	border: none;
	background-color: transparent;
	position: relative;
	width: 100%;
	height: 100%;
	color: ${Theme.text};
	resize: none;

	&:focus {
		outline: none;
	}
`

const Btn = styled.button`
	display: flex;
	background-color: ${Theme.text};
	border: none;
	border-radius: 10px;
	align-self: flex-start;
	padding: 1rem 4rem;
	cursor: pointer;
`

const Contact = (props) => {
	const [state, setState] = useState({
		name: '',
		email: '',
		message: '',
		formErrors: { email: '', name: '', message: '' },
		emailValid: false,
		formValid: false,
	})
	const nameRef = useRef(null)
	const emailRef = useRef(null)
	const messageRef = useRef(null)

	const submitHandler = (e) => {
		e.preventDefault()
		console.log(
			nameRef.current.value,
			emailRef.current.value,
			messageRef.current.value
		)
	}

	return (
		<>
			<Container state={props.state}>
				<Wrapper>
					<Form>
						<Text width="390" height="33" fill={Theme.text} />
						<label htmlFor="user_name">
							<TextName width="40" height="8" fill={Theme.text} />
						</label>
						<FieldS>
							<FieldBorderS width="319" height="36" fill={Theme.text} />
							<InputS type="text" name="user_name" ref={nameRef} />
						</FieldS>
						<label htmlFor="user_email">
							<TextMail width="43" height="8" fill={Theme.text} />
						</label>
						<FieldS>
							<FieldBorderS width="319" height="36" fill={Theme.text} />
							<InputS type="email" name="user_email" ref={emailRef} />
						</FieldS>
						<label htmlFor="message">
							<TextMessage
								width="64"
								height="8"
								fill={Theme.text}
								ref={messageRef}
							/>
						</label>
						<FieldL>
							<FieldBorderL width="319" height="132" fill={Theme.text} />
							<InputMsg name="message" />
						</FieldL>
						<Btn
							type="submit"
							// disabled={!state.formValid}
							onClick={(e) => {
								submitHandler(e)
							}}
						>
							<TextSend width="64" height="15" fill={Theme.background} />
						</Btn>
					</Form>
				</Wrapper>
			</Container>
		</>
	)
}

export default Contact
