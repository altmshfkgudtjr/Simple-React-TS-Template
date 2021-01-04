export const mediaQuery = (maxWidth: number): string => `
	@media (max-width: ${maxWidth}px)
`;

const media = {
	xlarge : mediaQuery(1600),
	large : mediaQuery(1440),
	medium : mediaQuery(1200),
	small : mediaQuery(702),
	xsmall : mediaQuery(350),
	custom : mediaQuery,
};

export default media;