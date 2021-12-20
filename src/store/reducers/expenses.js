import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'


const intialState = {
    expenses: { data: [], },
    fetchingExpenses: false,
    errorFetchingExpenses: false,
    deletingExpense: false,
    deletingExpenseSuccess: false,
    deletingExpenseMessage: null,
    searchingExpenses: false,
    searchingExpensesSuccess: false,
    creatingExpense: false,
    creatingExpenseSuccess: false,
    creatingExpenseMessage: null,
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
        case ( actionTypes.CREATE_EXPENSE_FAILED ):
            return updateObject(state, {
                creatingExpense: false,
                creatingExpenseSuccess: false,
                creatingExpenseMessage: action.message,
            })
        default:
            return state;
    }
}

export default reducer;