import React, { createContext, useReducer, Dispatch } from 'react'
import { produce } from 'immer'
// modules
import initialState from 'modules/states/modal'
// types
import { ModalState } from 'modules/states/modal'
import * as actions from 'modules/actions/modal'

/*
	Reducer
*/
export const reducer = (
	state: ModalState = initialState, 
	action: actions.ActionType
): ModalState => {
	switch(action.type) {
		case actions.PUSH_MODAL:
			return produce(state, draft => {
				draft.modalList.push(action.payload);
			});

		case actions.POP_MODAL:
			return produce(state, draft => {
				const index = draft.modalList.length - 1;
				if (index >= 0) {
					draft.modalList.splice(index, 1);
				}
			});
		
		case actions.DELETE_MODAL:
			return produce(state, draft => {
				draft.modalList = draft.modalList.filter(modal => modal.id !== action.payload);
			});
		
		case actions.CLEAR_MODAL:
			return produce(state, draft => {
				draft.modalList = [];
			});

		default:
			return state;
	}
}


/*
	Context
*/
export const modalContext = createContext<{
  state: ModalState;
  dispatch: Dispatch<actions.ActionType>;
}>({ state: initialState, dispatch: () => null });

const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };

	return (
		<modalContext.Provider value={value}>
			{children}
		</modalContext.Provider>
	);
}

export default Provider