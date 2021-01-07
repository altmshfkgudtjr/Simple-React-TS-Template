import { SnackbarType } from 'types/modules/snackbar'

/*
	Thunks
*/
const RefEvent: number[] = [];

export const newSnackbar = async (dispatch: any, text: string, type: SnackbarType = 'INFO') => {
	if(RefEvent.length !== 0) {
		const event = RefEvent.shift();
		clearTimeout(event);
	}
	dispatch(deleteSnackbar());
	await window.setTimeout(function() {
		dispatch(appendSnackbar({text, type}));
		const event = window.setTimeout(function() {
			dispatch(deleteSnackbar());
		}, 4000);
		RefEvent.push(event);
	}, 50);
}


/*
	Actions Types
*/
export const APPEND_SNACKBAR = 'snackbar/APPEND_SNACKBAR' as const;
export const DELETE_SNACKBAR = 'snackbar/DELETE_SNACKBAR' as const;


/*
	Action Payload Types
*/
export interface IAppendSnackbar {
	text: string;
	type?: SnackbarType;
}


/*
	Actions Constructors
*/
export const appendSnackbar = (data: IAppendSnackbar) => ({ type: APPEND_SNACKBAR, payload: data });
export const deleteSnackbar = () => ({ type: DELETE_SNACKBAR});

export type ActionType = 
	| ReturnType<typeof appendSnackbar>
	| ReturnType<typeof deleteSnackbar>