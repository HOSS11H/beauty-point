import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import bookingsReducer from './store/reducers/bookings'
import servicesReducer from './store/reducers/services'
import productsReducer from './store/reducers/products'
import dealsReducer from './store/reducers/deals'
import locationsReducer from './store/reducers/locations'
import categoriesReducer from './store/reducers/categories'
import employeesReducer from './store/reducers/employees'
import couponsReducer from './store/reducers/coupons'
import customersReducer from './store/reducers/customers'
import reportsReducer from './store/reducers/reports'
import expensesReducer from './store/reducers/expenses'
import unitsReducer from './store/reducers/units'
import permissionsReducer from './store/reducers/permissions'

import { BrowserRouter } from 'react-router-dom';

import './i18n';

import { ThemeContextProvider } from './store/theme-context';
import GlobalStyle from './styles/globalStyles';
import { AuthContextProvider } from './store/auth-context';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
