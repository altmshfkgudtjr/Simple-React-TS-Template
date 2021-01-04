import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from "react-helmet-async"
// Store
import store from 'modules'

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<HelmetProvider>
					<App />
				</HelmetProvider>
			</Provider>
		</BrowserRouter>
	</StrictMode>, 
	document.getElementById('root')
);

serviceWorker.unregister();