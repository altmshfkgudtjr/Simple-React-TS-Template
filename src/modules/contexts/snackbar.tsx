import React, { createContext, useReducer, Dispatch } from 'react'
import { produce } from 'immer'
// modules
import initialState from 'modules/states/snackbar'
// types
import { SnackbarState } from 'modules/states/snackbar'
import * as actions from 'modules/actions/snackbar'

/*
	Reducer
*/
export const reducer = (
	state: SnackbarState = initialState, 
	action: actions.ActionType
): SnackbarState => {
	switch(action.type) {
		case actions.APPEND_SNACKBAR:
			return produce(state, draft => {
				draft.text = action.payload['text'];
				if (!!action.payload['type']) {
					draft.type = action.payload['type'];
				}
			});

		case actions.DELETE_SNACKBAR:
			return produce(state, draft => {
				draft.text = '';
				draft.type = 'INFO';
			});
			
		default:
			return state;
	}
}


/*
	Context
*/
export const snackbarContext = createContext<{
  state: SnackbarState;
  dispatch: Dispatch<actions.ActionType>;
}>({ state: initialState, dispatch: () => null });

const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };

	return (
		<snackbarContext.Provider value={value}>
			{children}
		</snackbarContext.Provider>
	);
}

export default Provider