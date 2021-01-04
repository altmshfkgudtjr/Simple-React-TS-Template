export const zIndexSet = (layer: number): string => `
	${layer}
`;

const zIndex = {
	modal: zIndexSet(100),
	tooltip: zIndexSet(500),
	snackbar: zIndexSet(400),
};

export default zIndex;