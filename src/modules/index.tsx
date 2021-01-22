// Providers
import ModalProvider from 'modules/contexts/modal'
import SnackbarProvider from 'modules/contexts/snackbar'

/*
	Combine Providers
*/
type IProviderOrWithValue<T = any> =
	| React.ComponentType<T>
	| [React.ComponentType<T>, T];

export const combineProvider = (providers: Array<IProviderOrWithValue>) => {
	return ({ children }: React.PropsWithChildren<{ value?: any[] }>) => {
		return providers.reduce<React.ReactElement<React.ProviderProps<any>>>(
			(tree, ProviderOrWithValue) => {
				if (Array.isArray(ProviderOrWithValue)) {
					const [Provider, value] = ProviderOrWithValue;
					return <Provider {...value}>{tree}</Provider>;
				} else {
					return <ProviderOrWithValue>{tree}</ProviderOrWithValue>;
				}
			},
			children as React.ReactElement
		);
	};
};


/*
	Create Provider
*/
const AppProvider = ({ children }) => {
	const CombinedProvider = combineProvider([
		ModalProvider, 
		SnackbarProvider
	])

	return (
		<CombinedProvider>
			{children}
		</CombinedProvider>
	);
}

export default AppProvider