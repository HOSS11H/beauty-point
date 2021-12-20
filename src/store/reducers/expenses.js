import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility'


const intialState = {
    expenses: { data: [], },
    fetchingExpenses: false,
    errorFetchingExpenses: false,
    deletingExpense: false,
    deletingExpenseSuccess: false,
    deletingExpenseMessage: null,
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
        default:
            return state;
    }
}

export default reducer;