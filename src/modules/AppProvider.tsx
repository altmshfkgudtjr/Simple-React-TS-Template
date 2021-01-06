// contexts
import ModalProvider from 'modules/contexts/modal'
import SnackbarProvider from 'modules/contexts/snackbar'

/*
	Combine Reducers
*/
const CombinedProvider = ({ contexts, children }) => contexts.reduce(
	(Parent, Child) => <Parent>
		<Child>{children}</Child>
	</Parent>
);


/*
	Create Provider
*/
const AppProvider = ({ children }) => {
	return (
		<CombinedProvider contexts={[
			ModalProvider, 
			SnackbarProvider
		]}>
			{children}
		</CombinedProvider>
	);
}

export default AppProvider