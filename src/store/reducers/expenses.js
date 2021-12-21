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
    updatingExpenseMessage: null,
    searchingExpenses: false,
    searchingExpensesSuccess: false,
    creatingExpense: false,
    creatingExpenseSuccess: false,
    creatingExpenseMessage: null,
    expensesCategories: { data: [], },
    fetchingExpensesCategories: false,
    errorFetchingExpensesCategories: false,
    deletingExpenseCategory: false,
    deletingExpenseCategorySuccess: false,
    deletingExpenseCategoryMessage: null,
    updatingExpenseCategory: false,
    updatingExpenseCategorySuccess: false,
    updatingExpenseCategoryMessage: null,
    searchingExpensesCategories: false,
    searchingExpensesCategoriesSuccess: false,
    creatingExpenseCategory: false,
    creatingExpenseCategorySuccess: false,
    creatingExpenseCategoryMessage: null,
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
                updatingExpenseMessage: null,
            })
        case (actionTypes.UPDATE_EXPENSE_SUCCESS):
            return updateObject(state, {
                updatingExpense: false,
                updatingExpenseSuccess: true,
                updatingExpenseMessage: action.message,
            })
        case (actionTypes.UPDATE_EXPENSE_FAILED):
            return updateObject(state, {
                updatingExpense: false,
                updatingExpenseSuccess: false,
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
                creatingExpenseMessage: null,
            })
        case (actionTypes.CREATE_EXPENSE_SUCCESS):
            return updateObject(state, {
                creatingExpense: false,
                creatingExpenseSuccess: true,
                creatingExpenseMessage: action.message,
            })
        case (actionTypes.CREATE_EXPENSE_FAILED):
            return updateObject(state, {
                creatingExpense: false,
                creatingExpenseSuccess: false,
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
                updatingExpenseCategoryMessage: null,
            })
        case (actionTypes.UPDATE_EXPENSE_CATEGORY_SUCCESS):
            return updateObject(state, {
                updatingExpenseCategory: false,
                updatingExpenseCategorySuccess: true,
                updatingExpenseCategoryMessage: action.message,
            })
        case (actionTypes.UPDATE_EXPENSE_CATEGORY_FAILED):
            return updateObject(state, {
                updatingExpenseCategory: false,
                updatingExpenseCategorySuccess: false,
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
                creatingExpenseCategoryMessage: action.message,
            })
        case (actionTypes.CREATE_EXPENSE_CATEGORY_FAILED):
            return updateObject(state, {
                creatingExpenseCategory: false,
                creatingExpenseCategorySuccess: false,
                creatingExpenseCategoryMessage: action.message,
            })
        default:
            return state;
    }
}

export default reducer;