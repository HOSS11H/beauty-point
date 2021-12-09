import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'


const intialState = {
    employees: [],
    fetchingEmployees: false,
    errorFetchingEmployees: false,
    employeesData: {
        employees: { data: [], meta: {} },
        fetchingEmployees: false,
        errorFetchingEmployees: false,
        deletingEmployee: false,
        deletingEmployeeSuccess: false,
        deletingEmployeeMessage: null,
        updatingEmployee: false,
        updatingEmployeeSuccess: false,
        updatingEmployeeMessage: null,
        searchingEmployees: false,
        searchingEmployeesSuccess: false,
        addingEmployee: false,
        addingEmployeeSuccess: false,
        addingEmployeeMessage: null,
    }
}

const reducer = ( state = intialState, action ) => {
    switch ( action.type ) {
        case (actionTypes.FETCH_EMPLOYEES_START):
            return updateObject( state, {
                fetchingEmployees: true,
                errorFetchingEmployees: false,
            });
        case (actionTypes.FETCH_EMPLOYEES_SUCCESS):
            return updateObject( state, {
                employees: action.employees,
                fetchingEmployees: false,
            });
        case (actionTypes.FETCH_EMPLOYEES_FAILED):
            return updateObject( state, {
                fetchingEmployees: false,
                errorFetchingEmployees: true,
            });
        case (actionTypes.FETCH_EMPLOYEES_DATA_START) :
            return updateObject( state, {
                employeesData: {
                    ...state.employeesData,
                    fetchingEmployees: true,
                    errorFetchingEmployees: false,
                },
            });
        case (actionTypes.FETCH_EMPLOYEES_DATA_SUCCESS) :
            return updateObject( state, {
                employeesData: {
                    ...state.employeesData,
                    employees: action.employees,
                    fetchingEmployees: false,
                }
            });
        case (actionTypes.FETCH_EMPLOYEES_DATA_FAILED) :
            return updateObject( state, {
                employeesData: {
                    ...state.employeesData,
                    fetchingEmployees: false,
                    errorFetchingEmployees: true,
                }
            });
        default:
            return state;
    }
}

export default reducer;