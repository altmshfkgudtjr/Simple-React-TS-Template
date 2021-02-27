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
	const { 
		state: snackbarState, 
		dispatch: snackbarDispatch 
	} = useContext(snackbarContext);
	
	const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		snackbarDispatch(deleteSnackbar());
	}

	return (
		<Container>
			{snackbarState.text !== '' && <Snackbar onClick={onClick} 
																							text={snackbarState.text} 
																							type={snackbarState.type} />}
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