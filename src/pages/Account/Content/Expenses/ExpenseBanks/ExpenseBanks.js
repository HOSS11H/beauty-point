import { Fragment, useCallback, useState } from "react";
import { connect } from "react-redux";
import { searchExpensesBanks , createExpenseBank} from '../../../../../store/actions/index';
import SearchBar from "../../../../../components/Search/SearchBar/SearchBar";

import ExpensesBanksTable from './ExpenseBanksTable/ExpenseBanksTable';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { CustomButton } from '../../../../../components/UI/Button/Button';
import CreateModal from "./CreateModal/CreateModal";
import { toast } from "react-toastify";
import { useEffect } from "react";


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

function ExpenseBanks(props) {

    const { t } = useTranslation()

    const { searchExpensesBanksHandler, addExpenseBankHandler, creatingExpenseBankSuccess, creatingExpenseBankFailed, creatingExpenseBankMessage } = props;

    const [createModalOpened, setCreateModalOpened] = useState(false);


    useEffect(() => {
        if ( creatingExpenseBankSuccess ) {
            setCreateModalOpened(false)
            toast.success(t('Bank Added'), {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [creatingExpenseBankSuccess, t])

    useEffect(() => {
        if ( creatingExpenseBankFailed && creatingExpenseBankMessage ) {
            toast.error(creatingExpenseBankMessage, {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [creatingExpenseBankFailed, creatingExpenseBankMessage, t])

    // Create Modal
    const createModalOpenHandler = useCallback((id) => {
        setCreateModalOpened(true);
    }, [])
    const createModalCloseHandler = useCallback(() => {
        setCreateModalOpened(false);
    }, [])

    const createModalConfirmHandler = useCallback((data) => {
        addExpenseBankHandler(data);
    }, [addExpenseBankHandler])


    return (
        <Fragment>
            <ActionsWrapper>
                <SearchBar searchHandler={searchExpensesBanksHandler}/>
                <CreateBtn onClick={createModalOpenHandler} >{t('add bank')}</CreateBtn>
                <CreateModal show={createModalOpened}
                    onClose={createModalCloseHandler} onConfirm={createModalConfirmHandler}
                    heading='add new bank' confirmText='add' />
            </ActionsWrapper>
            <ExpensesBanksTable />
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        creatingExpenseBankSuccess: state.expenses.creatingExpenseBankSuccess,
        creatingExpenseBankFailed: state.expenses.creatingExpenseBankFailed,
        creatingExpenseBankMessage: state.expenses.creatingExpenseBankMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchExpensesBanksHandler: ( language, word ) => dispatch(searchExpensesBanks( language, word )),
        addExpenseBankHandler: (data) => dispatch(createExpenseBank( data ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseBanks);