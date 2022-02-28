import { Fragment, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { searchExpensesCustomers , createExpenseCustomer} from '../../../../../store/actions/index';
import SearchBar from "../../../../../components/Search/SearchBar/SearchBar";

import ExpensesCustomersTable from './ExpenseCustomersTable/ExpenseCustomersTable';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { CustomButton } from '../../../../../components/UI/Button/Button';
import CreateModal from "./CreateModal/CreateModal";
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

function ExpenseCustomers(props) {

    const { t } = useTranslation()

    const { searchExpensesCustomersHandler, addExpenseCustomerHandler, creatingExpenseCustomerSuccess, creatingExpenseCustomerFailed, creatingExpenseCustomerMessage } = props;

    const [createModalOpened, setCreateModalOpened] = useState(false);

    useEffect(() => {
        if ( creatingExpenseCustomerSuccess ) {
            setCreateModalOpened(false)
            toast.success(t('Agent Added'), {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [creatingExpenseCustomerSuccess, t])

    useEffect(() => {
        if ( creatingExpenseCustomerFailed && creatingExpenseCustomerMessage ) {
            toast.error(creatingExpenseCustomerMessage, {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [creatingExpenseCustomerFailed, creatingExpenseCustomerMessage, t])

    // Create Modal
    const createModalOpenHandler = useCallback((id) => {
        setCreateModalOpened(true);
    }, [])
    const createModalCloseHandler = useCallback(() => {
        setCreateModalOpened(false);
    }, [])

    const createModalConfirmHandler = useCallback((data) => {
        addExpenseCustomerHandler(data);
    }, [addExpenseCustomerHandler])


    return (
        <Fragment>
            <ActionsWrapper>
                <SearchBar searchHandler={searchExpensesCustomersHandler}/>
                <CreateBtn onClick={createModalOpenHandler} >{t('add agent')}</CreateBtn>
                <CreateModal show={createModalOpened}
                    onClose={createModalCloseHandler} onConfirm={createModalConfirmHandler}
                    heading='add new agent' confirmText='add' />
            </ActionsWrapper>
            <ExpensesCustomersTable />
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        creatingExpenseCustomerSuccess: state.expenses.creatingExpenseCustomerSuccess,
        creatingExpenseCustomerFailed: state.expenses.creatingExpenseCustomerFailed,
        creatingExpenseCustomerMessage: state.expenses.creatingExpenseCustomerMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchExpensesCustomersHandler: ( language, word ) => dispatch(searchExpensesCustomers( language, word )),
        addExpenseCustomerHandler: (data) => dispatch(createExpenseCustomer( data ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCustomers);