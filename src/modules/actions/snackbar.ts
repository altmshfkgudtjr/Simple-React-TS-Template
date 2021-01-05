/*
	Thunk
*/
const RefEvent = [];

export const newSnackbar = async (dispatch: any, text: string, type: SnackbarType = 'INFO') => {
	if(RefEvent.length !== 0) {
		let event = RefEvent.shift();
		clearTimeout(event);
	}
	dispatch(deleteSnackbar());
	await setTimeout(function() {
		dispatch(appendSnackbar({text, type}));
		let event = setTimeout(function() {
			dispatch(deleteSnackbar());
		}, 4000);
		RefEvent.push(event);
	}, 50);
}


/*
	Actions
*/
export const APPEND_SNACKBAR = 'snackbar/APPEND_SNACKBAR' as const;
export const DELETE_SNACKBAR = 'snackbar/DELETE_SNACKBAR' as const;

export type SnackbarType = 'INFO' |'SUCCESS' |'WARNING' |'ERROR';

export interface appendSnackbarPayload {
	text: string;
	type?: SnackbarType;
}

export const appendSnackbar = (data: appendSnackbarPayload) => ({ type: APPEND_SNACKBAR, payload: data });
export const deleteSnackbar = () => ({ type: DELETE_SNACKBAR});

export type SnackbarAction = 
	| ReturnType<typeof appendSnackbar>
	| ReturnType<typeof deleteSnackbar>