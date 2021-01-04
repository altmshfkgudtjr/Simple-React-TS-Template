import { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
// modules
import { RootState } from 'modules'
import { popModal, deleteModal } from 'modules/modal'
// lib
import zIndex from 'lib/styles/zIndex'
import animations from 'lib/styles/animations'

const Modal = () => {
	const dispatch = useDispatch();
	const modalList = useSelector((state: RootState) => state.modal.modalList);
	const show = modalList.length !== 0;
	
	const PreventModalOff = e => e.stopPropagation();

	const onMouseDown = (id: string) => {
		dispatch(deleteModal(id));
	}

	const ModalList = modalList.map(modal => {
		const Content:any = modal['elem'];
		return <Content key={modal['id']}
										PreventModalOff={PreventModalOff}
										ModalOff={() => { onMouseDown(modal['id']) }}
										args={modal['args']} />;
	});

	useEffect(() => {
		const target = document.querySelector('body');
		if (show) {
			target && (function(){ target.style.overflow = 'hidden' })();
		} else {
			target && target.removeAttribute('style');
		}
	}, [show]);

	return (
		<>
			{show && <ModalBackground onMouseDown={() => { dispatch(popModal()) }}>
				{ModalList}
			</ModalBackground>}
		</>
	);
}

const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(249, 249, 249, 0.85);	// Set background color
	z-index: ${zIndex.modal};
	animation: ${animations.fadeIn} .2s;
`;

export default Modal