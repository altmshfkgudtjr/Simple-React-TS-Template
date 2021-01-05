/*
	Initial State
*/
export interface Modal {
	id: string;
	elem: React.ReactNode;
	args?: any;
}

export interface ModalState {
	modalList: Modal[];
}

const initialState: ModalState = {
	modalList: []
}

export default initialState