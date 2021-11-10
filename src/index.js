import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import bookingsReducer from './store/reducers/bookings'

import { BrowserRouter } from 'react-router-dom';

import './i18n';

import { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";

import { ThemeContextProvider } from './store/theme-context';
import GlobalStyle from './styles/globalStyles';

const rootReducer = combineReducers({
	bookings: bookingsReducer,
});


const logger = store => {
	return next => {
		return action => {
			//console.log('[Middleware] Dispatching', action);
			const result = next(action);
			//console.log('[Middleware] next state', store.getState());
			return result;
		}
	}
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));


const app = (
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<ThemeContextProvider>
					<GlobalStyle />
					<App />
					{/* <StyleSheetManager stylisPlugins={[rtlPlugin]}>
						</StyleSheetManager> */}
				</ThemeContextProvider>
			</BrowserRouter>
		</Provider >
	</React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
