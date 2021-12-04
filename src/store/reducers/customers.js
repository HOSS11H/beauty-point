import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'


const intialState = {
    customers: [],
    fetchingCustomers: false,
    errorFetchingCustomers: false,
    addingCustomer: false,
    addingCustomerSuccess: false,
    addingCustomerMessage: null,
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case (actionTypes.FETCH_CUSTOMERS_START):
            return updateObject(state, {
                fetchingCustomers: true,
                errorFetchingCustomers: false,
            });
        case (actionTypes.FETCH_CUSTOMERS_SUCCESS):
            return updateObject(state, {
                customers: action.customers,
                fetchingCustomers: false,
            });
        case (actionTypes.FETCH_CUSTOMERS_FAILED):
            return updateObject(state, {
                fetchingCustomers: false,
                errorFetchingCustomers: true,
            });
        case (actionTypes.ADD_CUSTOMER_START):
            return updateObject(state, {
                addingCustomer: true,
                addingCustomerSuccess: false,
                addingCustomerMessage: null,
            })
        case (actionTypes.ADD_CUSTOMER_SUCCESS):
            const upgradedCustomers = [...state.customers]
            upgradedCustomers.push(action.customerData);
            return updateObject(state, {
                customers: upgradedCustomers,
                addingCustomer: false,
                addingCustomerSuccess: true,
                addingCustomerMessage: action.message,
            })
        case (actionTypes.ADD_CUSTOMER_FAILED):
            return updateObject(state, {
                addingCustomer: false,
                addingCustomerSuccess: false,
                addingCustomerMessage: action.message,
            })
        default:
            return state;
    }
}

export default reducer;