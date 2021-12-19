import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';
import v1 from '../../utils/axios-instance-v1'


export const fetchEmployeesStart = (  ) => {
    return {
        type: actionTypes.FETCH_EMPLOYEES_START,
    }
}
export const fetchEmployeesSuccess = ( employeesData ) => {
    return {
        type: actionTypes.FETCH_EMPLOYEES_SUCCESS,
        employees: employeesData.data
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
        axios.get(`vendors/employees`,{
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
                dispatch(fetchEmployeesSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchEmployeesFailed(error.message));
            });
    }
}

export const fetchEmployeesDataStart = () => {
    return {
        type: actionTypes.FETCH_EMPLOYEES_DATA_START,
    }
}
export const fetchEmployeesDataSuccess = (employeesData) => {
    return {
        type: actionTypes.FETCH_EMPLOYEES_DATA_SUCCESS,
        employees: employeesData
    }
}
export const fetchEmployeesDataFailed = (errorMessage) => {
    return {
        type: actionTypes.FETCH_EMPLOYEES_DATA_FAILED,
        error: errorMessage,
    }
}
export const fetchEmployeesData = (language, page, perPage, orderBy, orderDir) => {
    return dispatch => {
        dispatch(fetchEmployeesDataStart())
        axios.get(`/vendors/employees?page=${page + 1}&per_page=${perPage}&order_by=${orderBy}&order_dir=${orderDir}&include[]= roles&include[]=employeeGroup`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(fetchEmployeesDataSuccess(response.data));
        })
            .catch(err => {
                console.log(err)
                dispatch(fetchEmployeesDataFailed(err.message))
            })
    }
}

export const deleteEmployeeDataStart = () => {
    return {
        type: actionTypes.DELETE_EMPLOYEE_DATA_START,
    }
}
export const deleteEmployeeDataSuccess = (message, deletedEmployeeDataId) => {
    return {
        type: actionTypes.DELETE_EMPLOYEE_DATA_SUCCESS,
        message: message,
        employeeId: deletedEmployeeDataId,
    }
}
export const deleteEmployeeDataFailed = (message) => {
    return {
        type: actionTypes.DELETE_EMPLOYEE_DATA_FAILED,
        message: message,
    }
}

export const deleteEmployeeData = ( id ) => {
    return dispatch => {
        dispatch(deleteEmployeeDataStart())
        axios.delete(`/vendors/employees/${id}`)
            .then(response => {
                dispatch(deleteEmployeeDataSuccess(response.data, id));
            })
            .catch(err => {
                dispatch(deleteEmployeeDataFailed(err.message))
            })
    }
}

export const updateEmployeeDataStart = () => {
    return {
        type: actionTypes.UPDATE_EMPLOYEE_DATA_START,
    }
}
export const updateEmployeeDataSuccess = (message, updatedEmployeeData) => {
    return {
        type: actionTypes.UPDATE_EMPLOYEE_DATA_SUCCESS,
        message: message,
        employeeData: updatedEmployeeData,
    }
}
export const updateEmployeeDataFailed = (message) => {
    return {
        type: actionTypes.UPDATE_EMPLOYEE_DATA_FAILED,
        message: message,
    }
}

export const updateEmployeeData = (data) => {
    return dispatch => {
        dispatch(updateEmployeeDataStart())
        axios.put(`/vendors/employees/${data.id}`, data)
            .then(response => {
                dispatch(updateEmployeeDataSuccess(response.data, data));
            })
            .catch(err => {
                dispatch(updateEmployeeDataFailed(err.message))
            })
    }
}
export const addEmployeeDataStart = () => {
    return {
        type: actionTypes.ADD_EMPLOYEE_DATA_START,
    }
}
export const addEmployeeDataSuccess = (message, createdEmployeeData) => {
    return {
        type: actionTypes.ADD_EMPLOYEE_DATA_SUCCESS,
        message: message,
        employeeData: createdEmployeeData,
    }
}
export const addEmployeeDataFailed = (message) => {
    return {
        type: actionTypes.ADD_EMPLOYEE_DATA_FAILED,
        message: message,
    }
}

export const addEmployeeData = (data) => {
    return dispatch => {
        dispatch(addEmployeeDataStart())
        axios.post(`/vendors/employees`, data)
            .then(response => {
                dispatch(addEmployeeDataSuccess(null, {...response.data }));
            })
            .catch(err => {
                dispatch(addEmployeeDataFailed(err.message))
            })
    }
}

export const searchEmployeesDataStart = () => {
    return {
        type: actionTypes.SEARCH_EMPLOYEES_DATA_START,
    }
}
export const searchEmployeesDataSuccess = (employeesData) => {
    return {
        type: actionTypes.SEARCH_EMPLOYEES_DATA_SUCCESS,
        employees: employeesData
    }
}
export const searchEmployeesDataFailed = (errorMessage) => {
    return {
        type: actionTypes.SEARCH_EMPLOYEES_DATA_FAILED,
        error: errorMessage,
    }
}
export const searchEmployeesData = (language, word) => {
    return dispatch => {
        dispatch(searchEmployeesDataStart())
        axios.get(`/vendors/employees?term=${word}&page=1&per_page=10&include[]= roles&include[]=employeeGroup`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(searchEmployeesDataSuccess(response.data));
        })
            .catch(err => {
                dispatch(searchEmployeesDataFailed(err.message))
            })
    }
}
export const fetchRolesStart = (  ) => {
    return {
        type: actionTypes.FETCH_ROLES_START,
    }
}
export const fetchRolesSuccess = ( rolesData ) => {
    return {
        type: actionTypes.FETCH_ROLES_SUCCESS,
        roles: rolesData
    }
}
export const fetchRolesFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_ROLES_FAILED,
        error: errorMessage,
    }
}
export const fetchRoles = ( language ) => {
    return dispatch => {
        dispatch( fetchRolesStart( ) )
        v1.get(`/vendors/settings/roles`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchRolesSuccess( response.data  ) );
            })
            .catch( err => {
                console.log(err)
                dispatch( fetchRolesFailed( err.message  ) )
            } )
        }
}