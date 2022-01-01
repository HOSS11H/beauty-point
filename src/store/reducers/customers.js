import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'


const intialState = {
    customers: [],
    fetchingCustomers: false,
    errorFetchingCustomers: false,
    addingCustomer: false,
    addingCustomerSuccess: false,
    addingCustomerMessage: null,
    posCustmers: {
        customers: [],
        searchingCustomers: false,
        errorSearchingCustomers: false,
        addedCustomerData: null,
    },
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
        case (actionTypes.SEARCH_CUSTOMERS_START):
            return updateObject(state, {
                posCustmers: {
                    ...state.posCustmers,
                    searchingCustomers: true,
                    errorSearchingCustomers: false,
                }
            });
        case (actionTypes.SEARCH_CUSTOMERS_SUCCESS):
            return updateObject(state, {
                posCustmers: {
                    ...state.posCustmers,
                    customers: action.customers,
                    searchingCustomers: false,
                }
            });
        case (actionTypes.SEARCH_CUSTOMERS_FAILED):
            return updateObject(state, {
                posCustmers: {
                    ...state.posCustmers,
                    searchingCustomers: false,
                    errorSearchingCustomers: true,
                }
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
                posCustmers: {
                    ...state.posCustmers,
                    addedCustomerData: action.customerData,
                }
            })
        case (actionTypes.RESET_ADD_CUSTOMER_SUCCESS):
            return updateObject(state, {
                addingCustomerSuccess: false,
                addingCustomerMessage: null,
                posCustmers: {
                    ...state.posCustmers,
                    addedCustomerData: null,
                }
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