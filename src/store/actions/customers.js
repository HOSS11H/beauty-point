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
        axios.get(`/customers`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(fetchCustomersSuccess(response.data.data));
        })
        .catch(err => {
            console.log(err)
            dispatch(fetchCustomersFailed(err.message))
        })
    }
}