import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'


const intialState = {
    expenses: { data: [], },
    fetchingExpenses: false,
    errorFetchingExpenses: false,
    deletingExpense: false,
    deletingExpenseSuccess: false,
    deletingExpenseMessage: null,
    updatingExpense: false,
    updatingExpenseSuccess: false,
    updatingExpenseFailed: false,
    updatingExpenseMessage: null,
    searchingExpenses: false,
    searchingExpensesSuccess: false,
    creatingExpense: false,
    creatingExpenseSuccess: false,
    creatingExpenseFailed: false,
    creatingExpenseMessage: null,
    expensesCategories: { data: [], },
    fetchingExpensesCategories: false,
    errorFetchingExpensesCategories: false,
    deletingExpenseCategory: false,
    deletingExpenseCategorySuccess: false,
    deletingExpenseCategoryMessage: null,
    updatingExpenseCategory: false,
    updatingExpenseCategorySuccess: false,
    updatingExpenseCategoryFailed: false,
    updatingExpenseCategoryMessage: null,
    searchingExpensesCategories: false,
    searchingExpensesCategoriesSuccess: false,
    creatingExpenseCategory: false,
    creatingExpenseCategorySuccess: false,
    creatingExpenseCategoryFailed: false,
    creatingExpenseCategoryMessage: null,
    expensesCustomers: { data: [], },
    fetchingExpensesCustomers: false,
    errorFetchingExpensesCustomers: false,
    deletingExpenseCustomer: false,
    deletingExpenseCustomerSuccess: false,
    deletingExpenseCustomerMessage: null,
    updatingExpenseCustomer: false,
    updatingExpenseCustomerSuccess: false,
    updatingExpenseCustomerFailed: false,
    updatingExpenseCustomerMessage: null,
    searchingExpensesCustomers: false,
    searchingExpensesCustomersSuccess: false,
    creatingExpenseCustomer: false,
    creatingExpenseCustomerSuccess: false,
    creatingExpenseCustomerFailed: false,
    creatingExpenseCustomerMessage: null,
    expensesBanks: { data: [], },
    fetchingExpensesBanks: false,
    errorFetchingExpensesBanks: false,
    deletingExpenseBank: false,
    deletingExpenseBankSuccess: false,
    deletingExpenseBankMessage: null,
    updatingExpenseBank: false,
    updatingExpenseBankSuccess: false,
    updatingExpenseBankFailed: false,
    updatingExpenseBankMessage: null,
    searchingExpensesBanks: false,
    searchingExpensesBanksSuccess: false,
    creatingExpenseBank: false,
    creatingExpenseBankSuccess: false,
    creatingExpenseBankFailed: false,
    creatingExpenseBankMessage: null,
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case (actionTypes.FETCH_EXPENSES_START):
            return updateObject(state, {
                fetchingExpenses: true,
                errorFetchingExpenses: false,
            });
        case (actionTypes.FETCH_EXPENSES_SUCCESS):
            return updateObject(state, {
                expenses: action.expenses,
                fetchingExpenses: false,
                errorFetchingExpenses: false,
            });
        case (actionTypes.FETCH_EXPENSES_FAILED):
            return updateObject(state, {
                fetchingExpenses: false,
                errorFetchingExpenses: true,
            });
        case (actionTypes.DELETE_EXPENSE_START):
            return updateObject(state, {
                deletingExpense: true,
                deletingExpenseSuccess: false,
                deletingExpenseMessage: null,
            })
        case (actionTypes.DELETE_EXPENSE_SUCCESS):
            const updatedExpenses = state.expenses.data.filter(expense => expense.id !== action.expenseId);
            return updateObject(state, {
                expenses: {
                    ...state.expenses,
                    data: updatedExpenses,
                    total: state.expenses.total - 1,
                },
                deletingExpense: false,
                deletingExpenseSuccess: true,
                deletingExpenseMessage: action.message,
            })
        case (actionTypes.DELETE_EXPENSE_FAILED):
            return updateObject(state, {
                deletingExpense: false,
                deletingExpenseSuccess: false,
                deletingExpenseMessage: action.message,
            })
        case (actionTypes.UPDATE_EXPENSE_START):
            return updateObject(state, {
                updatingExpense: true,
                updatingExpenseSuccess: false,
                updatingExpenseFailed: false,
                updatingExpenseMessage: null,
            })
        case (actionTypes.UPDATE_EXPENSE_SUCCESS):
            return updateObject(state, {
                updatingExpense: false,
                updatingExpenseSuccess: true,
            })
        case (actionTypes.UPDATE_EXPENSE_FAILED):
            return updateObject(state, {
                updatingExpense: false,
                updatingExpenseFailed: true,
                updatingExpenseMessage: action.message,
            })
        case (actionTypes.SEARCH_EXPENSES_START):
            return updateObject(state, {
                fetchingExpenses: true,
                errorFetchingExpenses: false,
                searchingExpenses: true,
                searchingExpensesSuccess: false,
            })
        case (actionTypes.SEARCH_EXPENSES_SUCCESS):
            return updateObject(state, {
                fetchingExpenses: false,
                expenses: action.expenses,
                searchingExpenses: false,
                searchingExpensesSuccess: true,
            })
        case (actionTypes.SEARCH_EXPENSES_FAILED):
            return updateObject(state, {
                fetchingExpenses: false,
                errorFetchingExpenses: true,
                searchingExpenses: false,
                searchingExpensesSuccess: false,
            })
        case (actionTypes.CREATE_EXPENSE_START):
            return updateObject(state, {
                creatingExpense: true,
                creatingExpenseSuccess: false,
                creatingExpenseFailed: false,
                creatingExpenseMessage: null,
            })
        case (actionTypes.CREATE_EXPENSE_SUCCESS):
            return updateObject(state, {
                creatingExpense: false,
                creatingExpenseSuccess: true,
            })
        case (actionTypes.CREATE_EXPENSE_FAILED):
            return updateObject(state, {
                creatingExpense: false,
                creatingExpenseFailed: true,
                creatingExpenseMessage: action.message,
            })
        case (actionTypes.FETCH_EXPENSES_CATEGORIES_START):
            return updateObject(state, {
                fetchingExpensesCategories: true,
                errorFetchingExpensesCategories: false,
            });
        case (actionTypes.FETCH_EXPENSES_CATEGORIES_SUCCESS):
            return updateObject(state, {
                expensesCategories: action.expensesCategories,
                fetchingExpensesCategories: false,
                errorFetchingExpensesCategories: false,
            });
        case (actionTypes.FETCH_EXPENSES_CATEGORIES_FAILED):
            return updateObject(state, {
                fetchingExpensesCategories: false,
                errorFetchingExpensesCategories: true,
            });
        case (actionTypes.DELETE_EXPENSE_CATEGORY_START):
            return updateObject(state, {
                deletingExpenseCategory: true,
                deletingExpenseCategorySuccess: false,
                deletingExpenseCategoryMessage: null,
            })
        case (actionTypes.DELETE_EXPENSE_CATEGORY_SUCCESS):
            const updatedExpensesCategories = state.expensesCategories.data.filter(expenseCategory => expenseCategory.id !== action.expenseCategoryId);
            return updateObject(state, {
                expensesCategories: {
                    ...state.expensesCategories,
                    data: updatedExpensesCategories,
                    meta : {
                        ...state.expensesCategories.meta,
                        total: state.expensesCategories.meta.total - 1,
                    }
                },
                deletingExpenseCategory: false,
                deletingExpenseCategorySuccess: true,
                deletingExpenseCategoryMessage: action.message,
            })
        case (actionTypes.DELETE_EXPENSE_CATEGORY_FAILED):
            return updateObject(state, {
                deletingExpenseCategory: false,
                deletingExpenseCategorySuccess: false,
                deletingExpenseCategoryMessage: action.message,
            })
        case (actionTypes.UPDATE_EXPENSE_CATEGORY_START):
            return updateObject(state, {
                updatingExpenseCategory: true,
                updatingExpenseCategorySuccess: false,
                updatingExpenseCategoryFailed: false,
                updatingExpenseCategoryMessage: null,
            })
        case (actionTypes.UPDATE_EXPENSE_CATEGORY_SUCCESS):
            const editedExpenseCategoryIndex = state.expensesCategories.data.findIndex(category => category.id === action.expenseCategoryData.id);
            let editedExpenseCategory = { ...state.expensesCategories.data[editedExpenseCategoryIndex] }
            const updatedEditedExpenseCategory = updateObject(editedExpenseCategory, {
                ...action.expenseCategoryData,
            });
            const modifiedExpensesCategories = [ ...state.expensesCategories.data ];
            modifiedExpensesCategories[editedExpenseCategoryIndex] = updatedEditedExpenseCategory;
            return updateObject(state, {
                expensesCategories: {
                    ...state.expensesCategories,
                    data: modifiedExpensesCategories,
                },
                updatingExpenseCategory: false,
                updatingExpenseCategorySuccess: true,
            })
        case (actionTypes.UPDATE_EXPENSE_CATEGORY_FAILED):
            return updateObject(state, {
                updatingExpenseCategory: false,
                updatingExpenseCategoryFailed: true,
                updatingExpenseCategoryMessage: action.message,
            })
        case (actionTypes.SEARCH_EXPENSES_CATEGORIES_START):
            return updateObject(state, {
                fetchingExpensesCategories: true,
                errorFetchingExpensesCategories: false,
                searchingExpensesCategories: true,
                searchingExpensesCategoriesSuccess: false,
            })
        case (actionTypes.SEARCH_EXPENSES_CATEGORIES_SUCCESS):
            return updateObject(state, {
                fetchingExpensesCategories: false,
                expensesCategories: action.expensesCategories,
                searchingExpensesCategories: false,
                searchingExpensesCategoriesSuccess: true,
            })
        case (actionTypes.SEARCH_EXPENSES_CATEGORIES_FAILED):
            return updateObject(state, {
                fetchingExpensesCategories: false,
                errorFetchingExpensesCategories: true,
                searchingExpensesCategories: false,
                searchingExpensesCategoriesSuccess: false,
            })
        case (actionTypes.CREATE_EXPENSE_CATEGORY_START):
            return updateObject(state, {
                creatingExpenseCategory: true,
                creatingExpenseCategorySuccess: false,
                creatingExpenseCategoryFailed: false,
                creatingExpenseCategoryMessage: null,
            })
        case (actionTypes.CREATE_EXPENSE_CATEGORY_SUCCESS):
            const updatedExpenseCategories = [ ...state.expensesCategories.data ];
            updatedExpenseCategories.push(action.expenseCategoryData);
            return updateObject(state, {
                expensesCategories: {
                    ...state.expensesCategories,
                    data: updatedExpenseCategories,
                    meta : {
                        ...state.expensesCategories.meta,
                        total: state.expensesCategories.meta.total + 1,
                    }
                },
                creatingExpenseCategory: false,
                creatingExpenseCategorySuccess: true,
            })
        case (actionTypes.CREATE_EXPENSE_CATEGORY_FAILED):
            return updateObject(state, {
                creatingExpenseCategory: false,
                creatingExpenseCategoryFailed: true,
                creatingExpenseCategoryMessage: action.message,
            })
        case (actionTypes.FETCH_EXPENSES_CUSTOMERS_START):
            return updateObject(state, {
                fetchingExpensesCustomers: true,
                errorFetchingExpensesCustomers: false,
            });
        case (actionTypes.FETCH_EXPENSES_CUSTOMERS_SUCCESS):
            return updateObject(state, {
                expensesCustomers: action.expensesCustomers,
                fetchingExpensesCustomers: false,
                errorFetchingExpensesCustomers: false,
            });
        case (actionTypes.FETCH_EXPENSES_CUSTOMERS_FAILED):
            return updateObject(state, {
                fetchingExpensesCustomers: false,
                errorFetchingExpensesCustomers: true,
            });
        case (actionTypes.DELETE_EXPENSE_CUSTOMER_START):
            return updateObject(state, {
                deletingExpenseCustomer: true,
                deletingExpenseCustomerSuccess: false,
                deletingExpenseCustomerMessage: null,
            })
        case (actionTypes.DELETE_EXPENSE_CUSTOMER_SUCCESS):
            const updatedExpensesCustomers = state.expensesCustomers.data.filter(expenseCustomer => expenseCustomer.id !== action.expenseCustomerId);
            return updateObject(state, {
                expensesCustomers: {
                    ...state.expensesCustomers,
                    data: updatedExpensesCustomers,
                    meta : {
                        ...state.expensesCustomers.meta,
                        total: state.expensesCustomers.meta.total - 1,
                    }
                },
                deletingExpenseCustomer: false,
                deletingExpenseCustomerSuccess: true,
                deletingExpenseCustomerMessage: action.message,
            })
        case (actionTypes.DELETE_EXPENSE_CUSTOMER_FAILED):
            return updateObject(state, {
                deletingExpenseCustomer: false,
                deletingExpenseCustomerSuccess: false,
                deletingExpenseCustomerMessage: action.message,
            })
        case (actionTypes.UPDATE_EXPENSE_CUSTOMER_START):
            return updateObject(state, {
                updatingExpenseCustomer: true,
                updatingExpenseCustomerSuccess: false,
                updatingExpenseCustomerFailed: false,
                updatingExpenseCustomerMessage: null,
            })
        case (actionTypes.UPDATE_EXPENSE_CUSTOMER_SUCCESS):
            const editedExpenseCustomerIndex = state.expensesCustomers.data.findIndex(customer => customer.id === action.expenseCustomerData.id);
            let editedExpenseCustomer = { ...state.expensesCustomers.data[editedExpenseCustomerIndex] }
            const updatedEditedExpenseCustomer = updateObject(editedExpenseCustomer, {
                ...action.expenseCustomerData,
            });
            const modifiedExpensesCustomers = [ ...state.expensesCustomers.data ];
            modifiedExpensesCustomers[editedExpenseCustomerIndex] = updatedEditedExpenseCustomer;
            return updateObject(state, {
                expensesCustomers: {
                    ...state.expensesCustomers,
                    data: modifiedExpensesCustomers,
                },
                updatingExpenseCustomer: false,
                updatingExpenseCustomerSuccess: true,
            })
        case (actionTypes.UPDATE_EXPENSE_CUSTOMER_FAILED):
            return updateObject(state, {
                updatingExpenseCustomer: false,
                updatingExpenseCustomerFailed: true,
                updatingExpenseCustomerMessage: action.message,
            })
        case (actionTypes.SEARCH_EXPENSES_CUSTOMERS_START):
            return updateObject(state, {
                fetchingExpensesCustomers: true,
                errorFetchingExpensesCustomers: false,
                searchingExpensesCustomers: true,
                searchingExpensesCustomersSuccess: false,
            })
        case (actionTypes.SEARCH_EXPENSES_CUSTOMERS_SUCCESS):
            return updateObject(state, {
                fetchingExpensesCustomers: false,
                expensesCustomers: action.expensesCustomers,
                searchingExpensesCustomers: false,
                searchingExpensesCustomersSuccess: true,
            })
        case (actionTypes.SEARCH_EXPENSES_CUSTOMERS_FAILED):
            return updateObject(state, {
                fetchingExpensesCustomers: false,
                errorFetchingExpensesCustomers: true,
                searchingExpensesCustomers: false,
                searchingExpensesCustomersSuccess: false,
            })
        case (actionTypes.CREATE_EXPENSE_CUSTOMER_START):
            return updateObject(state, {
                creatingExpenseCustomer: true,
                creatingExpenseCustomerSuccess: false,
                creatingExpenseCustomerFailed: false,
                creatingExpenseCustomerMessage: null,
            })
        case (actionTypes.CREATE_EXPENSE_CUSTOMER_SUCCESS):
            const updatedExpenseCustomers = [ ...state.expensesCustomers.data ];
            updatedExpenseCustomers.push(action.expenseCustomerData);
            return updateObject(state, {
                expensesCustomers: {
                    ...state.expensesCustomers,
                    data: updatedExpenseCustomers,
                    meta : {
                        ...state.expensesCustomers.meta,
                        total: state.expensesCustomers.meta.total + 1,
                    }
                },
                creatingExpenseCustomer: false,
                creatingExpenseCustomerSuccess: true,
            })
        case (actionTypes.CREATE_EXPENSE_CUSTOMER_FAILED):
            return updateObject(state, {
                creatingExpenseCustomer: false,
                creatingExpenseCustomerFailed: true,
                creatingExpenseCustomerMessage: action.message,
            })
        case (actionTypes.FETCH_EXPENSES_BANKS_START):
            return updateObject(state, {
                fetchingExpensesBanks: true,
                errorFetchingExpensesBanks: false,
            });
        case (actionTypes.FETCH_EXPENSES_BANKS_SUCCESS):
            return updateObject(state, {
                expensesBanks: action.expensesBanks,
                fetchingExpensesBanks: false,
                errorFetchingExpensesBanks: false,
            });
        case (actionTypes.FETCH_EXPENSES_BANKS_FAILED):
            return updateObject(state, {
                fetchingExpensesBanks: false,
                errorFetchingExpensesBanks: true,
            });
        case (actionTypes.DELETE_EXPENSE_BANK_START):
            return updateObject(state, {
                deletingExpenseBank: true,
                deletingExpenseBankSuccess: false,
                deletingExpenseBankMessage: null,
            })
        case (actionTypes.DELETE_EXPENSE_BANK_SUCCESS):
            const updatedExpensesBanks = state.expensesBanks.data.filter(expenseBank => expenseBank.id !== action.expenseBankId);
            return updateObject(state, {
                expensesBanks: {
                    ...state.expensesBanks,
                    data: updatedExpensesBanks,
                    meta : {
                        ...state.expensesBanks.meta,
                        total: state.expensesBanks.meta.total - 1,
                    }
                },
                deletingExpenseBank: false,
                deletingExpenseBankSuccess: true,
                deletingExpenseBankMessage: action.message,
            })
        case (actionTypes.DELETE_EXPENSE_BANK_FAILED):
            return updateObject(state, {
                deletingExpenseBank: false,
                deletingExpenseBankSuccess: false,
                deletingExpenseBankMessage: action.message,
            })
        case (actionTypes.UPDATE_EXPENSE_BANK_START):
            return updateObject(state, {
                updatingExpenseBank: true,
                updatingExpenseBankSuccess: false,
                updatingExpenseBankFailed: false,
                updatingExpenseBankMessage: null,
            })
        case (actionTypes.UPDATE_EXPENSE_BANK_SUCCESS):
            const editedExpenseBankIndex = state.expensesBanks.data.findIndex(bank => bank.id === action.expenseBankData.id);
            let editedExpenseBank = { ...state.expensesBanks.data[editedExpenseBankIndex] }
            const updatedEditedExpenseBank = updateObject(editedExpenseBank, {
                ...action.expenseBankData,
            });
            const modifiedExpensesBanks = [ ...state.expensesBanks.data ];
            modifiedExpensesBanks[editedExpenseBankIndex] = updatedEditedExpenseBank;
            return updateObject(state, {
                expensesBanks: {
                    ...state.expensesBanks,
                    data: modifiedExpensesBanks,
                },
                updatingExpenseBank: false,
                updatingExpenseBankSuccess: true,
            })
        case (actionTypes.UPDATE_EXPENSE_BANK_FAILED):
            return updateObject(state, {
                updatingExpenseBank: false,
                updatingExpenseBankFailed: true,
                updatingExpenseBankMessage: action.message,
            })
        case (actionTypes.SEARCH_EXPENSES_BANKS_START):
            return updateObject(state, {
                fetchingExpensesBanks: true,
                errorFetchingExpensesBanks: false,
                searchingExpensesBanks: true,
                searchingExpensesBanksSuccess: false,
            })
        case (actionTypes.SEARCH_EXPENSES_BANKS_SUCCESS):
            return updateObject(state, {
                fetchingExpensesBanks: false,
                expensesBanks: action.expensesBanks,
                searchingExpensesBanks: false,
                searchingExpensesBanksSuccess: true,
            })
        case (actionTypes.SEARCH_EXPENSES_BANKS_FAILED):
            return updateObject(state, {
                fetchingExpensesBanks: false,
                errorFetchingExpensesBanks: true,
                searchingExpensesBanks: false,
                searchingExpensesBanksSuccess: false,
            })
        case (actionTypes.CREATE_EXPENSE_BANK_START):
            return updateObject(state, {
                creatingExpenseBank: true,
                creatingExpenseBankSuccess: false,
                creatingExpenseBankFailed: false,
                creatingExpenseBankMessage: null,
            })
        case (actionTypes.CREATE_EXPENSE_BANK_SUCCESS):
            const updatedExpenseBanks = [ ...state.expensesBanks.data ];
            updatedExpenseBanks.push(action.expenseBankData);
            return updateObject(state, {
                expensesBanks: {
                    ...state.expensesBanks,
                    data: updatedExpenseBanks,
                    meta : {
                        ...state.expensesBanks.meta,
                        total: state.expensesBanks.meta.total + 1,
                    }
                },
                creatingExpenseBank: false,
                creatingExpenseBankSuccess: true,
            })
        case (actionTypes.CREATE_EXPENSE_BANK_FAILED):
            return updateObject(state, {
                creatingExpenseBank: false,
                creatingExpenseBankFailed: true,
                creatingExpenseBankMessage: action.message,
            })
        default:
            return state;
    }
}

export default reducer;