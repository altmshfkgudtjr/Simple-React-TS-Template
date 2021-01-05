/*
	InitialState
*/
export type SnackbarType = 'INFO' |'SUCCESS' |'WARNING' |'ERROR';

export interface SnackbarState {
	text: string;
	type: SnackbarType;
}

const initialState: SnackbarState = {
	text: '',
	type: 'INFO'
};


export default initialState