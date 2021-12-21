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

export const updateExpenceStart = () => {
    return {
        type: actionTypes.UPDATE_EXPENSE_START,
    }
}
export const updateExpenseSuccess = (message, updatedExpenseId) => {
    return {
        type: actionTypes.UPDATE_EXPENSE_SUCCESS,
        message: message,
        expenseId: updatedExpenseId,
    }
}
export const updateExpenseFailed = (message) => {
    return {
        type: actionTypes.UPDATE_EXPENSE_FAILED,
        message: message,
    }
}
export const updateExpense = data => {
    return dispatch => {
        console.log(data);
        dispatch(updateExpenceStart())
        axios.put(`/vendors/expenses/${data.id}`, data)
            .then(response => {
                dispatch(updateExpenseSuccess(response.data, data.id));
            })
            .catch(err => {
                dispatch(updateExpenseFailed(err.message))
            })
    }
}


export const searchExpensesStart = () => {
    return {
        type: actionTypes.SEARCH_EXPENSES_START,
    }
}
export const searchExpensesSuccess = (expensesData) => {
    return {
        type: actionTypes.SEARCH_EXPENSES_SUCCESS,
        expenses: expensesData
    }
}
export const searchExpensesFailed = (errorMessage) => {
    return {
        type: actionTypes.SEARCH_EXPENSES_FAILED,
        error: errorMessage,
    }
}
export const searchExpenses = (language, word) => {
    return dispatch => {
        dispatch(searchExpensesStart())
        axios.get(`/vendors/expenses?term=${word}&page=1&per_page=15&include[]=category&include[]=customer`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(searchExpensesSuccess(response.data));
        })
            .catch(err => {
                dispatch(searchExpensesFailed(err.message))
            })
    }
}
export const createExpenseStart = () => {
    return {
        type: actionTypes.CREATE_EXPENSE_START,
    }
}
export const createExpenseSuccess = (message, createdExpenseData) => {
    return {
        type: actionTypes.CREATE_EXPENSE_SUCCESS,
        message: message,
        expenseData: createdExpenseData,
    }
}
export const createExpenseFailed = (message) => {
    return {
        type: actionTypes.CREATE_EXPENSE_FAILED,
        message: message,
    }
}

export const createExpense = (data) => {
    return dispatch => {
        dispatch(createExpenseStart())
        axios.post(`/vendors/expenses`, data)
            .then(response => {
                dispatch(createExpenseSuccess(null, { ...data, ...response.data }));
            })
            .catch(err => {
                dispatch(createExpenseFailed(err.message))
            })
    }
}