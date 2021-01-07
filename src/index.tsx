import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from "react-helmet-async"
// provider
import AppProvider from 'modules'

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<AppProvider>
				<HelmetProvider>
					<App />
				</HelmetProvider>
			</AppProvider>
		</BrowserRouter>
	</StrictMode>, 
	document.getElementById('root')
);

serviceWorker.unregister();