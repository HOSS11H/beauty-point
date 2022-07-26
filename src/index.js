import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';



import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import bookingsReducer from './store/reducers/bookings';
import categoriesReducer from './store/reducers/categories';
import couponsReducer from './store/reducers/coupons';
import customersReducer from './store/reducers/customers';
import dealsReducer from './store/reducers/deals';
import employeesReducer from './store/reducers/employees';
import expensesReducer from './store/reducers/expenses';
import locationsReducer from './store/reducers/locations';
import permissionsReducer from './store/reducers/permissions';
import productsReducer from './store/reducers/products';
import reportsReducer from './store/reducers/reports';
import servicesReducer from './store/reducers/services';
import unitsReducer from './store/reducers/units';
import cartReducer from './store/reducers/cart';

import { BrowserRouter } from 'react-router-dom';

import './i18n';

import { AuthContextProvider } from './store/auth-context';
import { ThemeContextProvider } from './store/theme-context';
import GlobalStyle from './styles/globalStyles';

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const rootReducer = combineReducers({
	bookings: bookingsReducer,
	services: servicesReducer,
	products: productsReducer,
	deals: dealsReducer,
	locations: locationsReducer,
	categories: categoriesReducer,
	employees: employeesReducer,
	coupons: couponsReducer,
	customers: customersReducer,
	reports: reportsReducer,
	expenses: expensesReducer,
	units: unitsReducer,
	permissions: permissionsReducer,
	cart: cartReducer,
});


const logger = store => {
	return next => {
		return action => {
			////console.log('[Middleware] Dispatching', action);
			const result = next(action);
			////console.log('[Middleware] next state', store.getState());
			return result;
		}
	}
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

Sentry.init({
	dsn: "https://fb555ff874f94eca8cbb35e05f8d3064@o1160438.ingest.sentry.io/6244915",
	integrations: [new BrowserTracing()],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
});


const app = (
	<React.StrictMode>
		<Provider store={store}>
			<AuthContextProvider>
				<BrowserRouter>
					<ThemeContextProvider>
						<GlobalStyle />
						<App />
					</ThemeContextProvider>
				</BrowserRouter>
			</AuthContextProvider>
		</Provider >
	</React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
