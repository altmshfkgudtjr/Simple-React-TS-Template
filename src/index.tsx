import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from "react-helmet-async"
// provider
import Provider from 'modules/index'

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<Provider>
				<HelmetProvider>
					<App />
				</HelmetProvider>
			</Provider>
		</BrowserRouter>
	</StrictMode>, 
	document.getElementById('root')
);

serviceWorker.unregister();