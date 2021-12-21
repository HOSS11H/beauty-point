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

export const updateExpenseStart = () => {
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
        dispatch(updateExpenseStart())
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

export const fetchExpensesCategoriesStart = (  ) => {
    return {
        type: actionTypes.FETCH_EXPENSES_CATEGORIES_START,
    }
}
export const fetchExpensesCategoriesSuccess = ( expensesCategoriesData ) => {
    return {
        type: actionTypes.FETCH_EXPENSES_CATEGORIES_SUCCESS,
        expensesCategories: expensesCategoriesData
    }
}
export const fetchExpensesCategoriesFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_EXPENSES_CATEGORIES_FAILED,
        error: errorMessage,
    }
}
export const fetchExpensesCategories = ( language, page, perPage) => {
    return dispatch => {
        dispatch( fetchExpensesCategoriesStart( ) )
        axios.get(`/vendors/expenses?include[]=category&include[]=customer&page=${page + 1}&per_page=${perPage}`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchExpensesCategoriesSuccess( response.data  ) );
            })
            .catch( err => {
                console.log(err)
                dispatch( fetchExpensesCategoriesFailed( err.message  ) )
            } )
        }
}

export const deleteExpenseCategoryStart = () => {
    return {
        type: actionTypes.DELETE_EXPENSE_CATEGORY_START,
    }
}
export const deleteExpenseCategorySuccess = (message, deletedExpenseCategoryId) => {
    return {
        type: actionTypes.DELETE_EXPENSE_CATEGORY_SUCCESS,
        message: message,
        expenseCategoryId: deletedExpenseCategoryId,
    }
}
export const deleteExpenseCategoryFailed = (message) => {
    return {
        type: actionTypes.DELETE_EXPENSE_CATEGORY_FAILED,
        message: message,
    }
}

export const deleteExpenseCategory = (id) => {
    return dispatch => {
        dispatch(deleteExpenseCategoryStart())
        axios.delete(`/vendors/expenses/${id}`)
            .then(response => {
                dispatch(deleteExpenseCategorySuccess(response.data, id));
            })
            .catch(err => {
                dispatch(deleteExpenseCategoryFailed(err.message))
            })
    }
}

export const updateExpenseCategoryStart = () => {
    return {
        type: actionTypes.UPDATE_EXPENSE_CATEGORY_START,
    }
}
export const updateExpenseCategorySuccess = (message, updatedExpenseCategoryId) => {
    return {
        type: actionTypes.UPDATE_EXPENSE_CATEGORY_SUCCESS,
        message: message,
        expenseCategoryId: updatedExpenseCategoryId,
    }
}
export const updateExpenseCategoryFailed = (message) => {
    return {
        type: actionTypes.UPDATE_EXPENSE_CATEGORY_FAILED,
        message: message,
    }
}
export const updateExpenseCategory = data => {
    return dispatch => {
        console.log(data);
        dispatch(updateExpenseCategoryStart())
        axios.put(`/vendors/expenses/${data.id}`, data)
            .then(response => {
                dispatch(updateExpenseCategorySuccess(response.data, data.id));
            })
            .catch(err => {
                dispatch(updateExpenseCategoryFailed(err.message))
            })
    }
}


export const searchExpensesCategoriesStart = () => {
    return {
        type: actionTypes.SEARCH_EXPENSES_CATEGORIES_START,
    }
}
export const searchExpensesCategoriesSuccess = (expensesCategoriesData) => {
    return {
        type: actionTypes.SEARCH_EXPENSES_CATEGORIES_SUCCESS,
        expensesCategories: expensesCategoriesData
    }
}
export const searchExpensesCategoriesFailed = (errorMessage) => {
    return {
        type: actionTypes.SEARCH_EXPENSES_CATEGORIES_FAILED,
        error: errorMessage,
    }
}
export const searchExpensesCategories = (language, word) => {
    return dispatch => {
        dispatch(searchExpensesCategoriesStart())
        axios.get(`/vendors/expenses?term=${word}&page=1&per_page=15&include[]=category&include[]=customer`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(searchExpensesCategoriesSuccess(response.data));
        })
            .catch(err => {
                dispatch(searchExpensesCategoriesFailed(err.message))
            })
    }
}
export const createExpenseCategoryStart = () => {
    return {
        type: actionTypes.CREATE_EXPENSE_CATEGORY_START,
    }
}
export const createExpenseCategorySuccess = (message, createdExpenseCategoryData) => {
    return {
        type: actionTypes.CREATE_EXPENSE_CATEGORY_SUCCESS,
        message: message,
        expenseCategoryData: createdExpenseCategoryData,
    }
}
export const createExpenseCategoryFailed = (message) => {
    return {
        type: actionTypes.CREATE_EXPENSE_CATEGORY_FAILED,
        message: message,
    }
}

export const createExpenseCategory = (data) => {
    return dispatch => {
        dispatch(createExpenseCategoryStart())
        axios.post(`/vendors/expenses`, data)
            .then(response => {
                dispatch(createExpenseCategorySuccess(null, { ...data, ...response.data }));
            })
            .catch(err => {
                dispatch(createExpenseCategoryFailed(err.message))
            })
    }
}