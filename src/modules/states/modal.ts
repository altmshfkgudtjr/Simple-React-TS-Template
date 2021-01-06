import { Modal } from 'types/modules/modal'

/*
	Initial State
*/
export interface ModalState {
	modalList: Modal[];
}

const initialState: ModalState = {
	modalList: []
}

export default initialState