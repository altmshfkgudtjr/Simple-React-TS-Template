import React from 'react'
import styled from 'styled-components'

interface TitleProps {
	children: React.ReactNode;
}
const Title = ({ children }: TitleProps) => {
	return <Content>{children}</Content>
}

const Content = styled.span`
	position: relative;
	font-size: 24px;
	font-weight: 600;
`;

export default Title