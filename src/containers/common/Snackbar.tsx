import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
// components
import Snackbar from 'components/common/Snackbar'
// lib
import zIndex from 'lib/styles/zIndex'
import media from 'lib/styles/media'
// module
import { RootState } from 'modules'
import { deleteSnackbar } from 'modules/snackbar'
// types
import { SnackbarType } from 'modules/snackbar'

const SnackbarWrapper = ()=> {
	const dispatch = useDispatch();
	const show: boolean = useSelector((state: RootState) => state.snackbar.show);
	const text: string = useSelector((state: RootState) => state.snackbar.text);
	const type: SnackbarType = useSelector((state: RootState) => state.snackbar.type);

	const onClick = () => dispatch(deleteSnackbar());

	return (
		<Container>
			{show && <Snackbar onClick={onClick} text={text} type={type}></Snackbar>}
		</Container>
	);
}

const Container = styled.div`
	position: fixed;
	top: 40px;
	right: 30px;
	width: 320px;
	height: auto;
	z-index: ${zIndex.snackbar};

	${media.small} {
		width: 100%;
		top: initial;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
`;

export default SnackbarWrapper