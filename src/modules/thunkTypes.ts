import { ThunkAction } from 'redux-thunk'
import { RootState } from 'modules'
// types
import { SnackbarAction } from 'modules/snackbar'

export type SnackbarThunk = ThunkAction<void, RootState, null, SnackbarAction>