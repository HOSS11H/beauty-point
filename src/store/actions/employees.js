import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';


export const fetchEmployeesStart = (  ) => {
    return {
        type: actionTypes.FETCH_EMPLOYEES_START,
    }
}
export const fetchEmployeesSuccess = ( emplyeesData ) => {
    return {
        type: actionTypes.FETCH_EMPLOYEES_SUCCESS,
        employees: emplyeesData.data
    }
}
export const fetchEmployeesFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_EMPLOYEES_FAILED,
        error: errorMessage,
    }
}
export const fetchEmployees = language => {
    return dispatch => {
        dispatch(fetchEmployeesStart());
        axios.get(`vendors/employees?`,{
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
                console.log(response.data);
                dispatch(fetchEmployeesSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchEmployeesFailed(error.message));
            });
    }

}