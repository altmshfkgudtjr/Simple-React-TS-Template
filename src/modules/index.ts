import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk';
// modules
import snackbar, { SnackbarState } from 'modules/snackbar'
import modal, { ModalState } from 'modules/modal'

export type RootState = {
	snackbar: SnackbarState;
	modal: ModalState;
};

/*
	Combine Reducers
*/
const rootReducer = combineReducers({
	snackbar,
	modal
});


/*
	Attach Middelware & Create Store
*/
const store = createStore(
	rootReducer,
	applyMiddleware(ReduxThunk)
);

export default store