import { useContext } from 'react'
import styled from 'styled-components'
// components
import Snackbar from 'components/common/Snackbar'
// lib
import zIndex from 'lib/styles/zIndex'
import media from 'lib/styles/media'
// module
import { snackbarContext } from 'modules/contexts/snackbar'
import { deleteSnackbar } from 'modules/actions/snackbar'

const SnackbarWrapper = ()=> {
	const snackbar = useContext(snackbarContext);
	const dispatch = snackbar.dispatch;
	
	const onClick = () => dispatch(deleteSnackbar());

	return (
		<Container>
			{snackbar.state.text !== '' && <Snackbar onClick={onClick} 
																							 text={snackbar.state.text} 
																							 type={snackbar.state.type} />}
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