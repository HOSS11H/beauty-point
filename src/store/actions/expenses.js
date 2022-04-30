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
        axios.get(`/vendors/expenses?include[]=category&include[]=customer&include[]=bank&page=${page + 1}&per_page=${perPage}`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchExpensesSuccess( response.data  ) );
            })
            .catch( err => {
                //console.log(err)
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
export const updateExpenseSuccess = (updatedExpenseId) => {
    return {
        type: actionTypes.UPDATE_EXPENSE_SUCCESS,
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
        dispatch(updateExpenseStart())
        axios.postForm(`/vendors/expenses/${data.get('id')}`, data, {headers: {   'Content-Type': 'multipart/form-data'}})
            .then(response => {
                dispatch(updateExpenseSuccess(data.id));
            })
            .catch(err => {
                const errs = err.response.data ? err.response.data.errors : { message : [ err.response.data.message ] };
                for (let key in errs) {
                    dispatch(updateExpenseFailed(errs[key][0]))
                }
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
        axios.get(`/vendors/expenses?term=${word}&page=1&per_page=10&include[]=category&include[]=customer`, {
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
export const createExpenseSuccess = ( createdExpenseData) => {
    return {
        type: actionTypes.CREATE_EXPENSE_SUCCESS,
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
        axios.postForm(`/vendors/expenses`, data, {headers: {   'Content-Type': 'multipart/form-data'}})
            .then(response => {
                dispatch(createExpenseSuccess({ ...data, ...response.data }));
            })
            .catch(err => {
                const errs = err.response.data ? err.response.data.errors : { message : [ err.response.data.message ] };
                for (let key in errs) {
                    dispatch(createExpenseFailed(errs[key][0]))
                }
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
        axios.get(`/vendors/expenses_categories?page=${page + 1}&per_page=${perPage}`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchExpensesCategoriesSuccess( response.data  ) );
            })
            .catch( err => {
                //console.log(err)
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
        axios.delete(`/vendors/expenses_categories/${id}`)
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
export const updateExpenseCategorySuccess = (updatedExpenseCategoryData) => {
    return {
        type: actionTypes.UPDATE_EXPENSE_CATEGORY_SUCCESS,
        expenseCategoryData: updatedExpenseCategoryData,
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
        //console.log(data);
        dispatch(updateExpenseCategoryStart())
        axios.put(`/vendors/expenses_categories/${data.id}`, data)
            .then(response => {
                dispatch(updateExpenseCategorySuccess(data));
            })
            .catch(err => {
                const errs = err.response.data ? err.response.data.errors : { message : [ err.response.data.message ] };
                for (let key in errs) {
                    dispatch(updateExpenseCategoryFailed(errs[key][0]))
                }
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
        axios.get(`/vendors/expenses_categories?term=${word}&page=1&per_page=10`, {
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
export const createExpenseCategorySuccess = (createdExpenseCategoryData) => {
    return {
        type: actionTypes.CREATE_EXPENSE_CATEGORY_SUCCESS,
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
        axios.post(`/vendors/expenses_categories`, data)
            .then(response => {
                dispatch(createExpenseCategorySuccess({ ...response.data }));
            })
            .catch(err => {
                const errs = err.response.data ? err.response.data.errors : { message : [ err.response.data.message ] };
                for (let key in errs) {
                    dispatch(createExpenseCategoryFailed(errs[key][0]))
                }
            })
    }
}

export const fetchExpensesCustomersStart = (  ) => {
    return {
        type: actionTypes.FETCH_EXPENSES_CUSTOMERS_START,
    }
}
export const fetchExpensesCustomersSuccess = ( expensesCustomersData ) => {
    return {
        type: actionTypes.FETCH_EXPENSES_CUSTOMERS_SUCCESS,
        expensesCustomers: expensesCustomersData
    }
}
export const fetchExpensesCustomersFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_EXPENSES_CUSTOMERS_FAILED,
        error: errorMessage,
    }
}
export const fetchExpensesCustomers = ( language, page, perPage) => {
    return dispatch => {
        dispatch( fetchExpensesCustomersStart( ) )
        axios.get(`/vendors/expenses_customers?page=${page + 1}&per_page=${perPage}`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchExpensesCustomersSuccess( response.data  ) );
            })
            .catch( err => {
                //console.log(err)
                dispatch( fetchExpensesCustomersFailed( err.message  ) )
            } )
        }
}

export const deleteExpenseCustomerStart = () => {
    return {
        type: actionTypes.DELETE_EXPENSE_CUSTOMER_START,
    }
}
export const deleteExpenseCustomerSuccess = (message, deletedExpenseCustomerId) => {
    return {
        type: actionTypes.DELETE_EXPENSE_CUSTOMER_SUCCESS,
        message: message,
        expenseCustomerId: deletedExpenseCustomerId,
    }
}
export const deleteExpenseCustomerFailed = (message) => {
    return {
        type: actionTypes.DELETE_EXPENSE_CUSTOMER_FAILED,
        message: message,
    }
}

export const deleteExpenseCustomer = (id) => {
    return dispatch => {
        dispatch(deleteExpenseCustomerStart())
        axios.delete(`/vendors/expenses_customers/${id}`)
            .then(response => {
                dispatch(deleteExpenseCustomerSuccess(response.data, id));
            })
            .catch(err => {
                dispatch(deleteExpenseCustomerFailed(err.message))
            })
    }
}

export const updateExpenseCustomerStart = () => {
    return {
        type: actionTypes.UPDATE_EXPENSE_CUSTOMER_START,
    }
}
export const updateExpenseCustomerSuccess = (updatedExpenseCustomerData) => {
    return {
        type: actionTypes.UPDATE_EXPENSE_CUSTOMER_SUCCESS,
        expenseCustomerData: updatedExpenseCustomerData,
    }
}
export const updateExpenseCustomerFailed = (message) => {
    return {
        type: actionTypes.UPDATE_EXPENSE_CUSTOMER_FAILED,
        message: message,
    }
}
export const updateExpenseCustomer = data => {
    return dispatch => {
        dispatch(updateExpenseCustomerStart())
        axios.put(`/vendors/expenses_customers/${data.id}`, data)
            .then(response => {
                dispatch(updateExpenseCustomerSuccess(data));
            })
            .catch(err => {
                const errs = err.response.data ? err.response.data.errors : { message : [ err.response.data.message ] };
                for (let key in errs) {
                    dispatch(updateExpenseCustomerFailed(errs[key][0]))
                }
            })
    }
}


export const searchExpensesCustomersStart = () => {
    return {
        type: actionTypes.SEARCH_EXPENSES_CUSTOMERS_START,
    }
}
export const searchExpensesCustomersSuccess = (expensesCustomersData) => {
    return {
        type: actionTypes.SEARCH_EXPENSES_CUSTOMERS_SUCCESS,
        expensesCustomers: expensesCustomersData
    }
}
export const searchExpensesCustomersFailed = (errorMessage) => {
    return {
        type: actionTypes.SEARCH_EXPENSES_CUSTOMERS_FAILED,
        error: errorMessage,
    }
}
export const searchExpensesCustomers = (language, word) => {
    return dispatch => {
        dispatch(searchExpensesCustomersStart())
        axios.get(`/vendors/expenses_customers?term=${word}&page=1&per_page=10`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(searchExpensesCustomersSuccess(response.data));
        })
            .catch(err => {
                dispatch(searchExpensesCustomersFailed(err.message))
            })
    }
}
export const createExpenseCustomerStart = () => {
    return {
        type: actionTypes.CREATE_EXPENSE_CUSTOMER_START,
    }
}
export const createExpenseCustomerSuccess = (createdExpenseCustomerData) => {
    return {
        type: actionTypes.CREATE_EXPENSE_CUSTOMER_SUCCESS,
        expenseCustomerData: createdExpenseCustomerData,
    }
}
export const createExpenseCustomerFailed = (message) => {
    return {
        type: actionTypes.CREATE_EXPENSE_CUSTOMER_FAILED,
        message: message,
    }
}

export const createExpenseCustomer = (data) => {
    return dispatch => {
        dispatch(createExpenseCustomerStart())
        axios.post(`/vendors/expenses_customers`, data)
            .then(response => {
                dispatch(createExpenseCustomerSuccess({ ...response.data }));
            })
            .catch(err => {
                const errs = err.response.data ? err.response.data.errors : { message : [ err.response.data.message ] };
                for (let key in errs) {
                    dispatch(createExpenseCustomerFailed(errs[key][0]))
                }
            })
    }
}
export const fetchExpensesBanksStart = (  ) => {
    return {
        type: actionTypes.FETCH_EXPENSES_BANKS_START,
    }
}
export const fetchExpensesBanksSuccess = ( expensesBanksData ) => {
    return {
        type: actionTypes.FETCH_EXPENSES_BANKS_SUCCESS,
        expensesBanks: expensesBanksData
    }
}
export const fetchExpensesBanksFailed = ( errorMessage ) => {
    return {
        type: actionTypes.FETCH_EXPENSES_BANKS_FAILED,
        error: errorMessage,
    }
}
export const fetchExpensesBanks = ( language, page, perPage) => {
    return dispatch => {
        dispatch( fetchExpensesBanksStart( ) )
        axios.get(`/vendors/banks?page=${page + 1}&per_page=${perPage}`, { 
            headers: {
                'Accept-Language': language
            }
        }).then( response => {
                dispatch( fetchExpensesBanksSuccess( response.data  ) );
            })
            .catch( err => {
                //console.log(err)
                dispatch( fetchExpensesBanksFailed( err.message  ) )
            } )
        }
}

export const deleteExpenseBankStart = () => {
    return {
        type: actionTypes.DELETE_EXPENSE_BANK_START,
    }
}
export const deleteExpenseBankSuccess = (message, deletedExpenseBankId) => {
    return {
        type: actionTypes.DELETE_EXPENSE_BANK_SUCCESS,
        message: message,
        expenseBankId: deletedExpenseBankId,
    }
}
export const deleteExpenseBankFailed = (message) => {
    return {
        type: actionTypes.DELETE_EXPENSE_BANK_FAILED,
        message: message,
    }
}

export const deleteExpenseBank = (id) => {
    return dispatch => {
        dispatch(deleteExpenseBankStart())
        axios.delete(`/vendors/banks/${id}`)
            .then(response => {
                dispatch(deleteExpenseBankSuccess(response.data, id));
            })
            .catch(err => {
                dispatch(deleteExpenseBankFailed(err.message))
            })
    }
}

export const updateExpenseBankStart = () => {
    return {
        type: actionTypes.UPDATE_EXPENSE_BANK_START,
    }
}
export const updateExpenseBankSuccess = ( updatedExpenseBankData) => {
    return {
        type: actionTypes.UPDATE_EXPENSE_BANK_SUCCESS,
        expenseBankData: updatedExpenseBankData,
    }
}
export const updateExpenseBankFailed = (message) => {
    return {
        type: actionTypes.UPDATE_EXPENSE_BANK_FAILED,
        message: message,
    }
}
export const updateExpenseBank = data => {
    return dispatch => {
        dispatch(updateExpenseBankStart())
        axios.put(`/vendors/banks/${data.id}`, data)
            .then(response => {
                dispatch(updateExpenseBankSuccess(data));
            })
            .catch(err => {
                const errs = err.response.data ? err.response.data.errors : { message : [ err.response.data.message ] };
                for (let key in errs) {
                    dispatch(updateExpenseBankFailed(errs[key][0]))
                }
            })
    }
}


export const searchExpensesBanksStart = () => {
    return {
        type: actionTypes.SEARCH_EXPENSES_BANKS_START,
    }
}
export const searchExpensesBanksSuccess = (expensesBanksData) => {
    return {
        type: actionTypes.SEARCH_EXPENSES_BANKS_SUCCESS,
        expensesBanks: expensesBanksData
    }
}
export const searchExpensesBanksFailed = (errorMessage) => {
    return {
        type: actionTypes.SEARCH_EXPENSES_BANKS_FAILED,
        error: errorMessage,
    }
}
export const searchExpensesBanks = (language, word) => {
    return dispatch => {
        dispatch(searchExpensesBanksStart())
        axios.get(`/vendors/banks?term=${word}&page=1&per_page=10`, {
            headers: {
                'Accept-Language': language
            }
        }).then(response => {
            dispatch(searchExpensesBanksSuccess(response.data));
        })
            .catch(err => {
                dispatch(searchExpensesBanksFailed(err.message))
            })
    }
}
export const createExpenseBankStart = () => {
    return {
        type: actionTypes.CREATE_EXPENSE_BANK_START,
    }
}
export const createExpenseBankSuccess = (createdExpenseBankData) => {
    return {
        type: actionTypes.CREATE_EXPENSE_BANK_SUCCESS,
        expenseBankData: createdExpenseBankData,
    }
}
export const createExpenseBankFailed = (message) => {
    return {
        type: actionTypes.CREATE_EXPENSE_BANK_FAILED,
        message: message,
    }
}

export const createExpenseBank = (data) => {
    return dispatch => {
        dispatch(createExpenseBankStart())
        axios.post(`/vendors/banks`, data)
            .then(response => {
                dispatch(createExpenseBankSuccess({ ...response.data }));
            })
            .catch(err => {
                const errs = err.response.data ? err.response.data.errors : { message : [ err.response.data.message ] };
                for (let key in errs) {
                    dispatch(createExpenseBankFailed(errs[key][0]))
                }
            })
    }
}