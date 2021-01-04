import reducer, * as actions from '../snackbar'
// types
import { SnackbarType } from 'modules/snackbar'

describe('snackbar', () => {
	let state = reducer(undefined, {});

	beforeEach(() => {
		state = reducer(undefined, {});
	});

	it('should create actions', () => {
		const expectedActions = [
			{ type: 'snackbar/APPEND_SNACKBAR', payload: { text: 'Test', type: 'SUCCESS' } },
			{ type: 'snackbar/DELETE_SNACKBAR' },
		];
		const snackbarActions = [
			actions.appendSnackbar({ text: 'Test', type: 'SUCCESS' }) ,
			actions.deleteSnackbar() ,
		];
		expect(snackbarActions).toEqual(expectedActions);
	});

	describe('reducer', () => {
		it ('should return the initialState.', () => {
			expect(state).toEqual({
				show: false,
				text: '',
				type: 'INFO'
			});
		});

		it('should change init snackbar.', () => {
			state = reducer(state, actions.appendSnackbar({
				text: 'snackbar test',
				type: 'success',
			}));
			expect(state.show).toBe(true);
			expect(state.text).toBe('snackbar test');
			expect(state.type).toBe('success');
		});

		it('should change delete snackbar.', () => {
			state = reducer(state, actions.deleteSnackbar());
			expect(state.show).toBe(false);
			expect(state.text).toBe('');
			expect(state.type).toBe('INFO');
		});
	});
});