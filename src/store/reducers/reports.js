import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'


const intialState = {
    reports: {
        tabularReport: {
            content: { data: [ ], },
            fetchingTabularReports: false,
            errorFetchingTabularReports: false,
            filteringTabularReports: false,
            filteringTabularReportsSuccess: false,
            filteringTabularReportsMeassage: null,
        }
    },
}

const reducer = ( state = intialState, action ) => {
    switch ( action.type ) {
        case (actionTypes.FETCH_TABULAR_REPORT_START):
            return updateObject( state, {
                reports : {
                    ...state.reports,
                    tabularReport: {
                        ...state.reports.tabularReport,
                        fetchingTabularReports: true,
                        errorFetchingTabularReports: false,
                    }
                },
            });
        case (actionTypes.FETCH_TABULAR_REPORT_SUCCESS):
            return updateObject( state, {
                reports:{
                    ...state.reports,
                    tabularReport: {
                        ...state.reports.tabularReport,
                        content: action.tabularReport,
                        fetchingTabularReports: false,
                        errorFetchingTabularReports: false,
                    },
                },
            });
        case (actionTypes.FETCH_TABULAR_REPORT_FAILED):
            return updateObject( state, {
                reports : {
                    ...state.reports,
                    tabularReport: {
                        ...state.reports.tabularReport,
                        fetchingTabularReports: false,
                        errorFetchingTabularReports: true,
                    }
                },
            });
        case (actionTypes.FILTER_TABULAR_REPORT_START):
            return updateObject( state, {
                reports : {
                    ...state.reports,
                    tabularReport: {
                        ...state.reports.tabularReport,
                        fetchingTabularReports: true,
                        filteringTabularReports: true,
                        filteringTabularReportsSuccess: false,
                        filteringTabularReportsMeassage: null,
                    }
                },
            });
        case (actionTypes.FILTER_TABULAR_REPORT_SUCCESS):
            return updateObject( state, {
                reports:{
                    ...state.reports,
                    tabularReport: {
                        ...state.reports.tabularReport,
                        content: action.tabularReport,
                        fetchingTabularReports: false,
                        filteringTabularReports: false,
                        filteringTabularReportsSuccess: true,
                    },
                },
            });
        case (actionTypes.FILTER_TABULAR_REPORT_FAILED):
            return updateObject( state, {
                reports : {
                    ...state.reports,
                    tabularReport: {
                        ...state.reports.tabularReport,
                        fetchingTabularReports: false,
                        filteringTabularReports: false,
                        filteringTabularReportsSuccess: false,
                        filteringTabularReportsMeassage: action.error,
                    }
                },
            });
        default:
            return state;
    }
}

export default reducer;