import { produce } from 'immer'
// types
import { SnackbarThunk } from 'modules/thunkTypes'

// setTimeout 참조 넣어두는 리스트
const RefEvent: ReturnType<typeof setTimeout>[] = [];

/*
	Thunk Actions
*/
export const newSnackbar = (text: string, type?: SnackbarType): SnackbarThunk => {
	return async dispatch => {
		if (RefEvent.length !== 0) {
			const event: NodeJS.Timeout | undefined = RefEvent.shift();
			if (!!event) {
				clearTimeout(event);
			}
		}
		dispatch(deleteSnackbar());
		await setTimeout(function() {
			const obj = !!type 
								? { text, type }
								: { text };
			dispatch(appendSnackbar(obj));
			const event = setTimeout(function() {
				dispatch(deleteSnackbar());
			}, 4000);
			RefEvent.push(event);
		}, 50);
	}
}


/*
	Actions
*/
const APPEND_SNACKBAR = 'snackbar/APPEND_SNACKBAR' as const;
const DELETE_SNACKBAR = 'snackbar/DELETE_SNACKBAR' as const;

export interface appendSnackbarPayload {
	text: string;
	type?: SnackbarType;
}

export const appendSnackbar = (data: appendSnackbarPayload) => ({ type: APPEND_SNACKBAR, payload: data });
export const deleteSnackbar = () => ({ type: DELETE_SNACKBAR});

export type SnackbarAction = 
	| ReturnType<typeof appendSnackbar>
	| ReturnType<typeof deleteSnackbar>

/*
	InitialState
*/
export type SnackbarType = 'INFO' |'SUCCESS' |'WARNING' |'ERROR';

export interface SnackbarState {
	show: boolean;
	text: string;
	type: SnackbarType;
}

const initialState: SnackbarState = {
	show: false,
	text: '',
	type: 'INFO'
};


/*
	Reducer
*/
export default function snackbar(
	state: SnackbarState = initialState, 
	action: SnackbarAction
): SnackbarState {
	switch(action.type) {
		case APPEND_SNACKBAR:
			return produce(state, draft => {
				draft.show = true;
				draft.text = action.payload['text'];
				if (!!action.payload['type']) {
					draft.type = action.payload['type'];
				}
			});

		case DELETE_SNACKBAR:
			return produce(state, draft => {
				draft.show = false;
				draft.text = '';
				draft.type = 'INFO';
			});
			
		default:
			return state;
	}
}