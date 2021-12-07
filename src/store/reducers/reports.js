import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'


const intialState = {
    reports: {
        tabularReport: [],
    },
    fetchingReports: false,
    errorFetchingReports: false,
}

const reducer = ( state = intialState, action ) => {
    switch ( action.type ) {
        case (actionTypes.FETCH_TABULAR_REPORT_START):
            return updateObject( state, {
                fetchingReports: true,
                errorFetchingReports: false,
            });
        case (actionTypes.FETCH_TABULAR_REPORT_SUCCESS):
            return updateObject( state, {
                reports:{
                    ...state.reports,
                    tabularReport: action.tabularReport,
                },
                fetchingReports: false,
            });
        case (actionTypes.FETCH_TABULAR_REPORT_FAILED):
            return updateObject( state, {
                fetchingReports: false,
                errorFetchingReports: true,
            });
        default:
            return state;
    }
}

export default reducer;