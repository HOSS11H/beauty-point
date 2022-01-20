import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';


export const fetchCouponsStart = () => {
    return {
        type: actionTypes.FETCH_COUPONS_START,
    }
}
export const fetchCouponsSuccess = (couponsData) => {
    return {
        type: actionTypes.FETCH_COUPONS_SUCCESS,
        coupons: couponsData
    }
}
export const fetchCouponsFailed = (errorMessage) => {
    return {
        type: actionTypes.FETCH_COUPONS_FAILED,
        error: errorMessage,
    }
}
export const fetchCoupons = (language) => {
    return dispatch => {
        dispatch(fetchCouponsStart())
        axios.get(`/coupons`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(fetchCouponsSuccess(response.data.data));
        })
        .catch(err => {
            //console.log(err)
            dispatch(fetchCouponsFailed(err.message))
        })
    }
}