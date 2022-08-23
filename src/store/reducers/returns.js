import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const intialState = {
    returns: { data: [] },
    totalReturns: [],
    fetchingReturns: false,
    errorFetchingReturns: false,
    fetchingTotalReturns: false,
    errorFetchingTotalReturns: false,
    deletingReturn: false,
    deletingReturnSuccess: false,
    deletingReturnMessage: null,
    updatingReturn: false,
    updatingReturnSuccess: false,
    updatingReturnFailed: false,
    updatingReturnMessage: null,
    creatingReturn: false,
    returnCreated: false,
    creatingReturnFailed: false,
    creatingReturnMessage: null,
    filteringReturns: false,
    filteringReturnsSuccess: false,
    filteringReturnsmessage: null,
};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case (actionTypes.FETCH_RETURNS_START):
            return updateObject(state, {
                fetchingReturns: true,
                errorFetchingReturns: false,
            })
        case (actionTypes.FETCH_RETURNS_SUCCESS):
            return updateObject(state, {
                fetchingReturns: false,
                returns: action.returns,
            })
        case (actionTypes.FETCH_RETURNS_FAILED):
            return updateObject(state, {
                fetchingReturns: false,
                errorFetchingReturns: action.error,
            })
        case (actionTypes.DELETE_RETURN_START):
            return updateObject(state, {
                deletingReturn: true,
                deletingReturnSuccess: false,
                deletingReturnMessage: null,
            })
        case (actionTypes.DELETE_RETURN_SUCCESS):
            const updatedReturns = state.returns.data.filter( (returned) => returned.id !== action.returnId);
            return updateObject(state, {
                returns: {
                    ...state.returns,
                    data: updatedReturns,
                },
                deletingReturn: false,
                deletingReturnSuccess: true,
                deletingReturnMessage: action.message,
            })
        case (actionTypes.DELETE_RETURN_FAILED):
            return updateObject(state, {
                deletingReturn: false,
                deletingReturnSuccess: false,
                deletingReturnMessage: action.message,
            })
        case (actionTypes.UPDATE_RETURN_START):
            return updateObject(state, {
                updatingReturn: true,
                updatingReturnSuccess: false,
                updatingReturnFailed: false,
                updatingReturnMessage: null,
            })
        case (actionTypes.UPDATE_RETURN_SUCCESS):
            const editedReturnIndex = state.returns.data.findIndex(returned => returned.id === action.returnData.id);
            let editedReturn = { ...state.returns.data[editedReturnIndex] }
            const updatedEditedReturn = updateObject(editedReturn, {
                ...action.returnData,
            })
            const editedReturns = [...state.returns.data]
            editedReturns[editedReturnIndex] = updatedEditedReturn
            return updateObject(state, {
                returns: {
                    ...state.returns,
                    data: editedReturns,
                },
                updatingReturn: false,
                updatingReturnSuccess: true,
            })
        case (actionTypes.RESET_UPDATE_RETURN_SUCCESS):
            return updateObject(state, {
                updatingReturnSuccess: false,
            })
        case (actionTypes.UPDATE_RETURN_FAILED):
            return updateObject(state, {
                updatingReturn: false,
                updatingReturnFailed: true,
                updatingReturnMessage: action.message,
            })
        case (actionTypes.CREATE_RETURN_START):
            return updateObject(state, {
                creatingReturn: true,
                returnCreated: false,
                creatingReturnFailed: false,
                creatingReturnMessage: null,
            })
        case (actionTypes.CREATE_RETURN_SUCCESS):
            return updateObject(state, {
                creatingReturn: false,
                returnCreated: true,
            })
        case (actionTypes.RESET_CREATE_RETURN_SUCCESS):
            return updateObject(state, {
                creatingReturn: false,
                returnCreated: false,
            })
            case (actionTypes.CREATE_RETURN_FAILED):
                return updateObject(state, {
                    creatingReturn: false,
                    creatingReturnFailed: true,
                    creatingReturnMessage: action.message,
            })
        case (actionTypes.FILTER_RETURNS_START):
            return updateObject(state, {
                filteringReturns: true,
                filteringReturnsSuccess: false,
                filteringReturnsmessage: null,
            })
        case (actionTypes.FILTER_RETURNS_SUCCESS):
            return updateObject(state, {
                filteringReturns: false,
                filteringReturnsSuccess: true,
                filteringReturnsmessage: action.message,
                returns: action.returns,
            })
        case (actionTypes.FILTER_RETURNS_FAILED):
            return updateObject(state, {
                filteringReturns: false,
                filteringReturnsSuccess: false,
                filteringReturnsmessage: action.error,
            })
        default:
            return state
    }
};
export default reducer;