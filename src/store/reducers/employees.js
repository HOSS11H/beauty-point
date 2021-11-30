import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'


const intialState = {
    employees: [],
    fetchingEmployees: false,
    errorFetchingEmployees: false,
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
        default:
            return state;
    }
}

export default reducer;