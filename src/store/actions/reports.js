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
export const fetchTabularReport = ( language) => {
    return dispatch => {
        dispatch( fetchTabularReportStart( ) )
        v1.get(`/vendors/reports/tabular-table`, { 
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
export const filterTabularReportStart = (  ) => {
    return {
        type: actionTypes.FILTER_TABULAR_REPORT_START,
    }
}
export const filterTabularReportSuccess = ( tabularReportData ) => {
    return {
        type: actionTypes.FILTER_TABULAR_REPORT_SUCCESS,
        tabularReport: tabularReportData
    }
}
export const filterTabularReportFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FILTER_TABULAR_REPORT_FAILED,
        error: errorMessage,
    }
}

export const filterTabularReport = ( searchParams ) => {
    return dispatch => {
        const notEmptySearchParams = {};
        for ( let key in searchParams ) {
            if ( searchParams[key] !== ''  ) {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        dispatch( filterTabularReportStart( ) )
        v1.get(`/vendors/reports/tabular-table`, { params: { ...notEmptySearchParams } } )
            .then( response => {
                dispatch( filterTabularReportSuccess( response.data  ) );
            })
            .catch( err => {
                console.log(err)
                dispatch( filterTabularReportFailed( err.message  ) )
            } )
        }
}