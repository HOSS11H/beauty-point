import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-instance';


export const fetchExpensesStart = (  ) => {
    return {
        type: actionTypes.FETCH_EXPENSES_START,
    }
}
export const fetchExpensesSuccess = ( expensesData ) => {
    return {
        type: actionTypes.FETCH_EXPENSES_SUCCESS,
        expenses: expensesData
    }
}
export const fetchExpensesFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_EXPENSES_FAILED,
        error: errorMessage,
    }
}
export const fetchExpenses = ( language, page, perPage) => {
    return dispatch => {
        dispatch( fetchExpensesStart( ) )
        axios.get(`/vendors/expenses?include[]=category&include[]=customer&page=${page + 1}&per_page=${perPage}`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchExpensesSuccess( response.data  ) );
            })
            .catch( err => {
                console.log(err)
                dispatch( fetchExpensesFailed( err.message  ) )
            } )
        }
}

export const deleteExpenseStart = () => {
    return {
        type: actionTypes.DELETE_EXPENSE_START,
    }
}
export const deleteExpenseSuccess = (message, deletedExpenseId) => {
    return {
        type: actionTypes.DELETE_EXPENSE_SUCCESS,
        message: message,
        expenseId: deletedExpenseId,
    }
}
export const deleteExpenseFailed = (message) => {
    return {
        type: actionTypes.DELETE_EXPENSE_FAILED,
        message: message,
    }
}

export const deleteExpense = (id) => {
    return dispatch => {
        dispatch(deleteExpenseStart())
        axios.delete(`/vendors/expenses/${id}`)
            .then(response => {
                dispatch(deleteExpenseSuccess(response.data, id));
            })
            .catch(err => {
                dispatch(deleteExpenseFailed(err.message))
            })
    }
}