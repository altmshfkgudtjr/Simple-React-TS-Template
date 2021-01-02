import React from 'react'
import produce from 'immer';

/*
	Thunk Actions
*/


/*
	Actions
*/
const PUSH_MODAL = 'modal/PUSH_MODAL' as const;
const POP_MODAL = 'modal/POP_MODAL' as const;
const DELETE_MODAL = 'modal/DELETE_MODAL' as const;
const CLEAR_MODAL	= 'modal/CLEAR_MODAL' as const;

export const pushModal = (id: string, elem: React.ReactNode, args: any) => ({ type: PUSH_MODAL, payload: { id, elem, args } });
export const popModal = () => ({ type: POP_MODAL });
export const deleteModal = (id: string) => ({ type: DELETE_MODAL, payload: id });
export const clearModal = () => ({ type: CLEAR_MODAL });

export type ModalAction = 
	| ReturnType<typeof pushModal>
	| ReturnType<typeof popModal>
	| ReturnType<typeof deleteModal>
	| ReturnType<typeof clearModal>


/*
	InitialState
*/
export interface Modal {
	id: string;
	elem: React.ReactNode;
	args: any;
}

export interface ModalState {
	modalList: Modal[];
}

const initialState = {
	modalList: []
};


/*
	Reducer
*/
export default function modal(
	state: ModalState = initialState, 
	action: ModalAction
): ModalState {
	switch(action.type) {
		case PUSH_MODAL:
			return produce(state, draft => {
				draft.modalList.push(action.payload);
			});

		case POP_MODAL:
			return produce(state, draft => {
				const index = draft.modalList.length - 1;
				if (index >= 0) {
					draft.modalList.splice(index, 1);
				}
			});
		
		case DELETE_MODAL:
			return produce(state, draft => {
				draft.modalList = draft.modalList.filter(modal => modal.id !== action.payload);
			});
		
		case CLEAR_MODAL:
			return produce(state, draft => {
				draft.modalList = [];
			});

		default:
			return state;
	}
}