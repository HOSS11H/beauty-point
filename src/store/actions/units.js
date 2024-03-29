import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';

export const fetchUnitsStart = () => {
    return {
        type: actionTypes.FETCH_UNITS_START,
    }
}
export const fetchUnitsSuccess = (units) => {
    return {
        type: actionTypes.FETCH_UNITS_SUCCESS,
        units: units
    }
}
export const fetchUnitsFailed = (errorMessage) => {
    return {
        type: actionTypes.FETCH_UNITS_FAILED,
        error: errorMessage,
    }
}
export const fetchUnits = (language, page, perPage, orderBy, orderDir) => {
    return dispatch => {
        dispatch(fetchUnitsStart())
        axios.get(`/vendors/units?page=${page + 1}&per_page=${perPage}&order_by=${orderBy}&order_dir=${orderDir}&include[]=parent`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(fetchUnitsSuccess(response.data));
        })
            .catch(err => {
                //console.log(err)
                dispatch(fetchUnitsFailed(err.message))
            })
    }
}

export const deleteUnitStart = () => {
    return {
        type: actionTypes.DELETE_UNIT_START,
    }
}
export const deleteUnitSuccess = (message, deletedUnitId) => {
    return {
        type: actionTypes.DELETE_UNIT_SUCCESS,
        message: message,
        unitId: deletedUnitId,
    }
}
export const deleteUnitFailed = (message) => {
    return {
        type: actionTypes.DELETE_UNIT_FAILED,
        message: message,
    }
}

export const deleteUnit = ( id ) => {
    return dispatch => {
        dispatch(deleteUnitStart())
        axios.delete(`/vendors/units/${id}`)
            .then(response => {
                dispatch(deleteUnitSuccess(response.data, id));
            })
            .catch(err => {
                dispatch(deleteUnitFailed(err.message))
            })
    }
}

export const updateUnitStart = () => {
    return {
        type: actionTypes.UPDATE_UNIT_START,
    }
}
export const updateUnitSuccess = (updatedUnit) => {
    return {
        type: actionTypes.UPDATE_UNIT_SUCCESS,
        unitData: updatedUnit,
    }
}
export const resetUpdateUnitSuccess = () => {
    return {
        type: actionTypes.RESET_UPDATE_UNIT_SUCCESS,
    }
}
export const updateUnitFailed = (message) => {
    return {
        type: actionTypes.UPDATE_UNIT_FAILED,
        message: message,
    }
}

export const updateUnit = (data) => {
    return dispatch => {
        dispatch(updateUnitStart())
        axios.put(`/vendors/units/${data.id}`, data)
        .then(response => {
                dispatch(updateUnitSuccess({...data}));
                setTimeout(() => {
                    dispatch(resetUpdateUnitSuccess());
                }, 2000);
            })
            .catch(err => {
                const errs = err.response.data ? err.response.data.errors : { message : [ err.response.data.message ] };
                for (let key in errs) {
                    dispatch(updateUnitFailed(errs[key][0]))
                }
            })
    }
}
export const addUnitStart = () => {
    return {
        type: actionTypes.ADD_UNIT_START,
    }
}
export const addUnitSuccess = (createdUnit) => {
    return {
        type: actionTypes.ADD_UNIT_SUCCESS,
        unitData: createdUnit,
    }
}
export const resetAddUnitSuccess = () => {
    return {
        type: actionTypes.RESET_ADD_UNIT_SUCCESS,
    }
}
export const addUnitFailed = (message) => {
    return {
        type: actionTypes.ADD_UNIT_FAILED,
        message: message,
    }
}

export const addUnit = (data) => {
    return dispatch => {
        dispatch(addUnitStart())
        axios.post(`/vendors/units`, data)
            .then(response => {
                dispatch(addUnitSuccess({...response.data, ...data }));
                setTimeout(() =>{
                    dispatch(resetAddUnitSuccess());
                }, 2000)
            })
            .catch(err => {
                const errs = err.response.data ? err.response.data.errors : { message : [ err.response.data.message ] };
                for (let key in errs) {
                    dispatch(addUnitFailed(errs[key][0]))
                }
            })
    }
}

export const searchUnitsStart = () => {
    return {
        type: actionTypes.SEARCH_UNITS_START,
    }
}
export const searchUnitsSuccess = (units) => {
    return {
        type: actionTypes.SEARCH_UNITS_SUCCESS,
        units: units
    }
}
export const searchUnitsFailed = (errorMessage) => {
    return {
        type: actionTypes.SEARCH_UNITS_FAILED,
        error: errorMessage,
    }
}
export const searchUnits = (language, word) => {
    return dispatch => {
        dispatch(searchUnitsStart())
        axios.get(`/vendors/units?term=${word}&page=1&per_page=10&include[]=parent`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(searchUnitsSuccess(response.data));
        })
            .catch(err => {
                dispatch(searchUnitsFailed(err.message))
            })
    }
}
