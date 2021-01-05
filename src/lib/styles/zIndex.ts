export const zIndexSet = (layer: number): string => `
	${layer}
`;

const zIndex = {
	modal: zIndexSet(100),
	snackbar: zIndexSet(400),
	tooltip: zIndexSet(500)
};

export default zIndex;