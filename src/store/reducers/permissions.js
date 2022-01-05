import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'


const intialState = {
    permissions: [],
    fetchingPermissions: false,
    errorFetchingPermissions: false,
}

const reudcer = (state = intialState, action) => {
    switch (action.type) {
        case (actionTypes.FETCH_PERMISSIONS_START):
            return updateObject(state, {
                fetchingPermissions: true,
                errorFetchingPermissions: false,
            });
        case (actionTypes.FETCH_PERMISSIONS_SUCCESS):
            return updateObject(state, {
                permissions: action.permissions,
                fetchingPermissions: false,
            });
        case (actionTypes.FETCH_PERMISSIONS_FAILED):
            return updateObject(state, {
                fetchingPermissions: false,
                errorFetchingPermissions: true,
            });
        default:
            return state;
    }
}
export default reudcer;