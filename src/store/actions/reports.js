import * as actionTypes from './actionTypes';
import v1 from '../../utils/axios-instance-v1'


export const fetchTabularReportStart = (  ) => {
    return {
        type: actionTypes.FETCH_TABULAR_REPORT_START,
    }
}
export const fetchTabularReportSuccess = ( tabularReportData ) => {
    return {
        type: actionTypes.FETCH_TABULAR_REPORT_SUCCESS,
        tabularReport: tabularReportData
    }
}
export const fetchTabularReportFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_TABULAR_REPORT_FAILED,
        error: errorMessage,
    }
}
export const fetchTabularReport = ( language, page, perPage, orderBy, orderDir ) => {
    return dispatch => {
        dispatch( fetchTabularReportStart( ) )
        v1.get(`/vendors/reports/tabular-table?page=${page + 1}&per_page=${perPage}&order_by=${orderBy}&order_dir=${orderDir}`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchTabularReportSuccess( response.data  ) );
            })
            .catch( err => {
                console.log(err)
                dispatch( fetchTabularReportFailed( err.message  ) )
            } )
        }
}