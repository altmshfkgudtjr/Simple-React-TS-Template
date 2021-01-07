/*
	Thunks
*/


/*
	Actions Types
*/
export const PUSH_MODAL = 'modal/PUSH_MODAL' as const;
export const POP_MODAL = 'modal/POP_MODAL' as const;
export const DELETE_MODAL = 'modal/DELETE_MODAL' as const;
export const CLEAR_MODAL	= 'modal/CLEAR_MODAL' as const;


/*
	Action Payload Types
*/


/*
	Actions Constructors
*/
export const pushModal = (id: string, elem: React.ReactNode, args?: any) => ({ type: PUSH_MODAL, payload: { id, elem, args } });
export const popModal = () => ({ type: POP_MODAL });
export const deleteModal = (id: string) => ({ type: DELETE_MODAL, payload: id });
export const clearModal = () => ({ type: CLEAR_MODAL });

export type ActionType = 
	| ReturnType<typeof pushModal>
	| ReturnType<typeof popModal>
	| ReturnType<typeof deleteModal>
	| ReturnType<typeof clearModal>