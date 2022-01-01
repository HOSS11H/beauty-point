import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';


export const fetchCustomersStart = () => {
    return {
        type: actionTypes.FETCH_CUSTOMERS_START,
    }
}
export const fetchCustomersSuccess = (customersData) => {
    return {
        type: actionTypes.FETCH_CUSTOMERS_SUCCESS,
        customers: customersData
    }
}
export const fetchCustomersFailed = (errorMessage) => {
    return {
        type: actionTypes.FETCH_CUSTOMERS_FAILED,
        error: errorMessage,
    }
}
export const fetchCustomers = (language) => {
    return dispatch => {
        dispatch(fetchCustomersStart())
        axios.get(`vendors/customers`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            console.log(response.data.data)
            dispatch(fetchCustomersSuccess(response.data.data));
        })
            .catch(err => {
                console.log(err)
                dispatch(fetchCustomersFailed(err.message))
            })
    }
}
export const searchCustomersStart = () => {
    return {
        type: actionTypes.SEARCH_CUSTOMERS_START,
    }
}
export const searchCustomersSuccess = (customersData) => {
    return {
        type: actionTypes.SEARCH_CUSTOMERS_SUCCESS,
        customers: customersData
    }
}
export const searchCustomersFailed = (errorMessage) => {
    return {
        type: actionTypes.SEARCH_CUSTOMERS_FAILED,
        error: errorMessage,
    }
}
export const searchCustomers = (language, word) => {
    return dispatch => {
        dispatch(searchCustomersStart())
        axios.get(`vendors/customers?term=${word}`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(searchCustomersSuccess(response.data.data));
        })
            .catch(err => {
                console.log(err)
                dispatch(searchCustomersFailed(err.message))
            })
    }
}

export const addCustomerStart = () => {
    return {
        type: actionTypes.ADD_CUSTOMER_START,
    }
}
export const addCustomerSuccess = (message, addedCustomerData) => {
    return {
        type: actionTypes.ADD_CUSTOMER_SUCCESS,
        message: message,
        customerData: addedCustomerData,
    }
}
export const resetAddCustomerSuccess = () => {
    return {
        type: actionTypes.RESET_ADD_CUSTOMER_SUCCESS,
    }
}
export const addCustomerFailed = (message) => {
    return {
        type: actionTypes.ADD_CUSTOMER_FAILED,
        message: message,
    }
}

export const addCustomer = (data) => {
    return dispatch => {
        dispatch(addCustomerStart())
        console.log(data)
        axios.post(`/vendors/customers`, data)
            .then(response => {
                console.log(response)
                dispatch(addCustomerSuccess(null, { ...data, ...response.data }));
                setTimeout(() => {
                    dispatch(resetAddCustomerSuccess());
                }, 2000);
            })
            .catch(err => {
                dispatch(addCustomerFailed(err.message))
            })
    }
}

