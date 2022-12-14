import React, { useReducer, useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Transition, TransitionGroup } from 'react-transition-group'
import styled, { keyframes } from 'styled-components'

import Theme from '../../../other/Theme'
import { randomID } from '../../../other/utils'
import {
	IconHome,
	IconSkills,
	IconProjects,
	IconContact,
	TextHome,
	TextSkills,
	TextProjects,
	TextContact,
	GraphicsArrow2,
} from '../../../other/Vectors'

const pages = [
	{ id: 0, url: '/', icon: IconHome, title: TextHome },
	{ id: 1, url: '/skills', icon: IconSkills, title: TextSkills },
	{ id: 2, url: '/projects', icon: IconProjects, title: TextProjects },
	{ id: 3, url: '/contact', icon: IconContact, title: TextContact },
]

// Animations
const arrowsAnimation = keyframes`
	17% {
		clip-path: polygon(0 0, 0 0, 0 0, 0 0);
	}
	34% {
		clip-path: polygon(66% 0, 100% 0, 100% 100%, 66% 100%);
	}
	51% {
		clip-path: polygon(33% 0, 100% 0, 100% 100%, 33% 100%);
	}
	68% {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
	}
	85% {
		clip-path: polygon(0 0, 66% 0, 66% 100%, 0 100%);
	}
	100% {
		clip-path: polygon(0 0, 33% 0, 33% 100%, 0 100%);
	}
`
const iconAppear = keyframes`
	to {
		width: 32px;
		height: 32px;
	}
`
const blink = keyframes`
	0%{
		opacity: 0;
	}
	20% {
		opacity: 1;
	}
	40% {
		opacity: 0;
	}
	60% {
		opacity: 1;
	}
	80% {
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
`

// Styles
const Nav = styled.nav`
	position: absolute;
	z-index: 1000;
	right: 7px;
	bottom: 95px;
	width: 40px;
	height: 150px;
`
const List = styled.ul`
	list-style: none;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`
const ListItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const NavLink = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 0px;
	height: 0px;
	animation: ${iconAppear} 0.5s ${(props) => props.number * 0.2}s
		cubic-bezier(0.17, 0.67, 0.37, 1.81) forwards;
`
const Indicator = styled.div`
	display: flex;
	align-items: center;
	position: absolute;
	bottom: 30px;
	right: 160px;
	height: 10px;
	width: 100px;
	transform: translateX(100%);
	animation: ${blink} 0.2s step-start forwards;
`
const ArrowsContainer = styled.div`
	display: flex;
	height: 10px;
	width: 26px;
	margin-right: 1rem;
	animation: ${arrowsAnimation} 1s step-start infinite;
`

// State variables
const orders = [
	[0, 1, 2, 3],
	[1, 0, 2, 3],
	[1, 2, 0, 3],
	[1, 2, 3, 0],
]
const initialiseState = () => {
	const path = window.location.pathname
	const state = {
		current: undefined,
		hover: null,
		order: [],
	}
	switch (path) {
		case '/':
			state.order = orders[0]
			state.current = pages[0]
			break
		case '/skills':
			state.order = orders[1]
			state.current = pages[1]
			break
		case '/projects':
			state.order = orders[2]
			state.current = pages[2]
			break
		case '/contact':
			state.order = orders[3]
			state.current = pages[3]
			break
	}
	return state
}

let initialState = initialiseState()

const reducer = (state, { event, el }) => {
	if (event === 'click')
		return {
			...state,
			current: pages[el],
			order: orders[el],
		}
	if (event === 'hover')
		return {
			...state,
			hover: el,
		}
	if (event === 'set') {
		return {
			...initialState,
		}
	}
}

//Component
const Navbar = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const location = useLocation()

	useEffect(() => {
		initialState = initialiseState()
		dispatch({ event: 'set', el: null })
	}, [location])

	return (
		<>
			<Nav>
				<List>
					<TransitionGroup component={null}>
						{pages.map((page) => {
							return (
								state.order[page.id] !== 0 && (
									<Transition timeout={0} appear>
										<ListItem>
											<NavLink
												key={page.id}
												to={page.url}
												onClick={() => {
													dispatch({ event: 'click', el: page.id })
												}}
												onMouseEnter={() => {
													dispatch({ event: 'hover', el: page.id })
												}}
												onMouseLeave={() => {
													dispatch({ event: 'hover', el: null })
												}}
												number={page.id}
											>
												{<page.icon fill={Theme.text} />}
											</NavLink>
										</ListItem>
									</Transition>
								)
							)
						})}
					</TransitionGroup>
				</List>
			</Nav>

			<Indicator>
				<ArrowsContainer>
					{[...Array(3)].map((_, idx) => {
						return <GraphicsArrow2 fill={Theme.text} number={idx} />
					})}
				</ArrowsContainer>

				<state.current.title key={randomID()} fill={Theme.text} />
			</Indicator>
		</>
	)
}

export default Navbar
