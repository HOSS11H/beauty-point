import { Fragment, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { searchExpenses , createExpense} from '../../../../store/actions/index';
import SearchBar from "../../../../components/Search/SearchBar/SearchBar";

import ExpensesTable from './ExpensesTable/ExpensesTable';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { CustomButton } from '../../../../components/UI/Button/Button';
import CreateModal from "./CreateModal/CreateModal";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";


const ActionsWrapper = styled.div`
    display: flex;
`
const CreateBtn = styled(CustomButton)`
    &.MuiButton-root {
        margin-left: 20px;
        width: auto;
        padding: 0 20px;
        height: 64px;
        flex-shrink: 0;
        box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
        @media screen and (max-width: 600px) {
            height: 50px;
        }
    }
`

const ActionButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 15px;
    a {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
        width: auto;
        padding: 0 10px;
        height: 30px;
        flex-shrink: 0;
        color: ${ ( { theme } ) => theme.palette.common.white};
        border-radius: 10px;
        background: ${({ theme }) => theme.palette.success.main};
        font-size: 14px;
        &:last-child {
            margin-right: 0px;
        }
        svg {
            width: 14px;
            height: 14px;
            margin-right: 10px;
        }
    }
`

function Expenses(props) {

    const { t } = useTranslation()

    const { searchExpensesHandler, addExpenseHandler, creatingExpenseSuccess, creatingExpenseFailed, creatingExpenseMessage } = props;

    const [createModalOpened, setCreateModalOpened] = useState(false);

    useEffect(() => {
        if ( creatingExpenseSuccess ) {
            setCreateModalOpened(false)
            toast.success(t('Expense Added'), {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [creatingExpenseSuccess, t])

    useEffect(() => {
        if ( creatingExpenseFailed && creatingExpenseMessage ) {
            toast.error(creatingExpenseMessage, {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [creatingExpenseFailed, creatingExpenseMessage, t])

    // Create Modal
    const createModalOpenHandler = useCallback((id) => {
        setCreateModalOpened(true);
    }, [])
    const createModalCloseHandler = useCallback(() => {
        setCreateModalOpened(false);
    }, [])

    const createModalConfirmHandler = useCallback((data) => {
        addExpenseHandler(data);
    }, [addExpenseHandler])


    return (
        <Fragment>
            <ActionsWrapper>
                <SearchBar searchHandler={searchExpensesHandler}/>
                <CreateBtn onClick={createModalOpenHandler} >{t('add expense')}</CreateBtn>
                <CreateModal show={createModalOpened}
                    onClose={createModalCloseHandler} onConfirm={createModalConfirmHandler}
                    heading='add new expense' confirmText='add' />
            </ActionsWrapper>
            <ActionButtons>
                <NavLink to='categories'>{t('categories')}</NavLink>
                <NavLink to='../users/agents'>{t('agents')}</NavLink>
                <NavLink to='banks'>{t('banks')}</NavLink>
            </ActionButtons>
            <ExpensesTable />
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        creatingExpenseSuccess: state.expenses.creatingExpenseSuccess,
        creatingExpenseFailed: state.expenses.creatingExpenseFailed,
        creatingExpenseMessage: state.expenses.creatingExpenseMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchExpensesHandler: ( language, word ) => dispatch(searchExpenses( language, word )),
        addExpenseHandler: (data) => dispatch(createExpense( data ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);