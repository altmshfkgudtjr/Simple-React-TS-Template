import { SnackbarType } from 'types/modules/snackbar'

/*
	InitialState
*/
export interface SnackbarState {
	text: string;
	type: SnackbarType;
}

const initialState: SnackbarState = {
	text: '',
	type: 'INFO'
};


export default initialState