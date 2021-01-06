import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
// lib
import palette from 'lib/styles/palette'
import * as styles from 'lib/styles/styles'
import animations from 'lib/styles/animations'

interface BadgeProps {
	onClick(): void;
	title: string;
}
const Badge = ({ onClick, title }: BadgeProps) => {
	const [eventOn, setEventOn] = useState<boolean>(false);
	
	const onClickBadge = () => {
		onClick();
		setEventOn(true);
	};

	useEffect(() => {
		if (eventOn) {
			const e = setTimeout(() => setEventOn(false), 2000);
			return () => clearTimeout(e);
		}
	}, [eventOn]);

	return <Content eventOn={eventOn} 
									onClick={onClickBadge}>{title}</Content>;
}

interface ContentTypes {
	eventOn: boolean;
}
const Content = styled.div`
	position: relative;
	display: inline-block;
	width: 80px;
	margin-right: .5rem;
	font-size: 14px;
	line-height: 24px;
	background-color: ${palette.blue4};
	border: 1.8px solid ${palette.blue4};
	border-radius: 2rem;
	font-weight: 600;
	text-align: center;
	color: #fefefe;
	cursor: pointer;
	${styles.noselect}
	${(props: ContentTypes) => props.eventOn && css`
		animation: 1s ${animations.pulse} infinite
	`};

	&:hover {
		background-color: ${palette.blue3};
		border: 1.8px solid ${palette.blue3};
	}
`;

export default Badge