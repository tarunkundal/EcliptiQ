import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import AuthContexProvider from './store/auth/AuthContextProvider';
import theme from './styles/Theme';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<AuthContexProvider>
					<App />
				</AuthContexProvider>
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>
);
