import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import store from './app/store/index';
import theme from './styles/Theme';

// eslint-disable-next-line import/no-named-as-default-member
const root = ReactDOM.createRoot(
	// eslint-disable-next-line no-undef
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>
);
