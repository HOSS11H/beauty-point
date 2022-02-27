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
        updatingEmployeeFailed: false,
        updatingEmployeeMessage: null,
        searchingEmployees: false,
        searchingEmployeesSuccess: false,
        addingEmployee: false,
        addingEmployeeSuccess: false,
        addingEmployeeFailed: false,
        addingEmployeeMessage: null,
    },
    roles: [],
    fetchingRoles: false,
    errorFetchingRoles: false,
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
            case (actionTypes.SEARCH_EMPLOYEES_DATA_START) :
                return updateObject( state, {
                    employeesData: {
                        ...state.employeesData,
                        fetchingEmployees: true,
                        errorFetchingEmployees: false,
                        searchingEmployees: true,
                        searchingEmployeesSuccess: false,
                    },
                });
            case (actionTypes.SEARCH_EMPLOYEES_DATA_SUCCESS) :
                return updateObject( state, {
                    employeesData: {
                        ...state.employeesData,
                        employees: action.employees,
                        fetchingEmployees: false,
                        searchingEmployees: false,
                        searchingEmployeesSuccess: true,
                    }
                });
            case (actionTypes.SEARCH_EMPLOYEES_DATA_FAILED) :
                return updateObject( state, {
                    employeesData: {
                        ...state.employeesData,
                        fetchingEmployees: false,
                        errorFetchingEmployees: true,
                        searchingEmployees: false,
                        searchingEmployeesSuccess: false,
                    }
                });
        case(actionTypes.DELETE_EMPLOYEE_DATA_START) :
            return updateObject( state, {
                employeesData: {
                    ...state.employeesData,
                    deletingEmployee: true,
                    deletingEmployeeSuccess: false,
                    deletingEmployeeMessage: null,
                }
            });
        case(actionTypes.DELETE_EMPLOYEE_DATA_SUCCESS) :
            const updatedEmployees = state.employeesData.employees.data.filter(employee => employee.id !== action.employeeId);
            return updateObject( state, {
                employeesData: {
                    ...state.employeesData,
                    employees: {
                        ...state.employeesData.employees,
                        data: updatedEmployees,
                        meta: {
                            ...state.employeesData.employees.meta,
                            total: state.employeesData.employees.meta.total - 1,
                        }
                    },
                    deletingEmployee: false,
                    deletingEmployeeSuccess: true,
                    deletingEmployeeMessage: action.message,
                }
            });
        case (actionTypes.FETCH_ROLES_START) :
            return updateObject( state, {
                fetchingRoles: true,
                errorFetchingRoles: false,
            });
        case ( actionTypes.ADD_EMPLOYEE_DATA_START ) :
            return updateObject( state, {
                employeesData: {
                    ...state.employeesData,
                    addingEmployee: true,
                    addingEmployeeSuccess: false,
                    addingEmployeeFailed: false,
                    addingEmployeeMessage: null,
                }
            });
        case ( actionTypes.ADD_EMPLOYEE_DATA_SUCCESS ) :
            return updateObject( state, {
                employeesData: {
                    ...state.employeesData,
                    addingEmployee: false,
                    addingEmployeeSuccess: true,
                },
            });
        case ( actionTypes.ADD_EMPLOYEE_DATA_FAILED ) :
            return updateObject( state, {
                employeesData: {
                    ...state.employeesData,
                    addingEmployee: false,
                    addingEmployeeFailed: true,
                    addingEmployeeMessage: action.message,
                }
            });
        case ( actionTypes.UPDATE_EMPLOYEE_DATA_START) :
            return updateObject( state, {
                employeesData: {
                    ...state.employeesData,
                    updatingEmployee: true,
                    updatingEmployeeSuccess: false,
                    updatingEmployeeMessage: null,
                }
            });
        case (actionTypes.UPDATE_EMPLOYEE_DATA_SUCCESS) :
            const updatedEmployeesInfos = [...state.employeesData.employees.data];
            const updatedEmployeeIndex = updatedEmployeesInfos.findIndex(employee => employee.id === action.employeeData.id);
            updatedEmployeesInfos[updatedEmployeeIndex] = action.employeeData;
            return updateObject( state, {       
                employeesData: {
                    ...state.employeesData,
                    employees: {
                        ...state.employeesData.employees,
                        data: updatedEmployeesInfos,
                    },
                    updatingEmployee: false,
                    updatingEmployeeSuccess: true,
                    updatingEmployeeMessage: action.message,
                }
            });
        case (actionTypes.UPDATE_EMPLOYEE_DATA_FAILED) :
            return updateObject( state, {
                employeesData: {
                    ...state.employeesData,
                    updatingEmployee: false,
                    updatingEmployeeSuccess: false,
                    updatingEmployeeMessage: action.message,
                }
            });
        case (actionTypes.FETCH_ROLES_SUCCESS) :
            return updateObject( state, {
                roles: action.roles,
                fetchingRoles: false,
            });
        case (actionTypes.FETCH_ROLES_FAILED) :
            return updateObject( state, {
                fetchingRoles: false,
                errorFetchingRoles: true,
            });
        default:
            return state;
    }
}

export default reducer;