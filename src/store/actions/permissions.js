import * as actionTypes from './actionTypes';
import v1 from '../../utils/axios-instance-v1';


export const fetchPermissionsStart = (  ) => {
    return {
        type: actionTypes.FETCH_PERMISSIONS_START,
    }
}
export const fetchPermissionsSuccess = ( permissionsData ) => {
    return {
        type: actionTypes.FETCH_PERMISSIONS_SUCCESS,
        permissions: permissionsData
    }
}
export const fetchPermissionsFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_PERMISSIONS_FAILED,
        error: errorMessage,
    }
}
export const fetchPermissions = ( roleId, lang ) => {
    return dispatch => {
        dispatch( fetchPermissionsStart( ) )
        v1.get(`/vendors/settings/roles/${roleId}/permissions`, { 
            headers: {
                'Accept-Language': lang
            }
            }).then( response => {
                    dispatch( fetchPermissionsSuccess( response.data  ) );
                })
            .catch( err => {
                console.log(err)
                dispatch( fetchPermissionsFailed( err.message  ) )
            } )
        }
}