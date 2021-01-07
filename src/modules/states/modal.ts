import { IModal } from 'types/modules/modal'

/*
	Initial State
*/
export interface ModalState {
	modalList: IModal[];
}

const initialState: ModalState = {
	modalList: []
}

export default initialState