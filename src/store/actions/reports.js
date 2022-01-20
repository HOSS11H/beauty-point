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
export const fetchTabularReport = ( language, page, perPage) => {
    return dispatch => {
        dispatch( fetchTabularReportStart( ) )
        //console.log(page, perPage)
        v1.get(`/vendors/reports/tabular-table?page=${page + 1}&per_page=${perPage}`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchTabularReportSuccess( response.data  ) );
            })
            .catch( err => {
                //console.log(err)
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
export const saveTabularReportFilters = ( filters ) => {
    return {
        type: actionTypes.SAVE_TABULAR_REPORT_FILTERS,
        filters: filters
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
        v1.get(`/vendors/reports/tabular-table?page=1`, { params: { ...notEmptySearchParams } } )
            .then( response => {
                dispatch( filterTabularReportSuccess( response.data  ) );
                dispatch( saveTabularReportFilters( notEmptySearchParams ) )
            })
            .catch( err => {
                //console.log(err)
                dispatch( filterTabularReportFailed( err.message  ) )
            } )
        }
}