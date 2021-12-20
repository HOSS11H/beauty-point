import { Fragment, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { searchExpenses } from '../../../../store/actions/index';
import SearchBar from "../../../../components/Search/SearchBar/SearchBar";

import ExpensesTable from './ExpensesTable/ExpensesTable';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { CustomButton } from '../../../../components/UI/Button/Button';
/* import CreateModal from "./CreateModal/CreateModal"; */
import CustomizedSnackbars from "../../../../components/UI/SnackBar/SnackBar";
import CreateModal from "./CreateModal/CreateModal";


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

function Expenses(props) {

    const { t } = useTranslation()

    const { searchExpensesHandler, addEmployeeHandler, addingEmployeeSuccess } = props;

    const [createModalOpened, setCreateModalOpened] = useState(false);

    const [ messageShown, setMessageShown ] = useState(addingEmployeeSuccess);

    useEffect(() => {
        setMessageShown(addingEmployeeSuccess )
    }, [addingEmployeeSuccess])
    const closeMessageHandler = useCallback(( ) => {
        setMessageShown(false)
    }, [])

    // Create Modal
    const createModalOpenHandler = useCallback((id) => {
        setCreateModalOpened(true);
    }, [])
    const createModalCloseHandler = useCallback(() => {
        setCreateModalOpened(false);
    }, [])

    const createModalConfirmHandler = useCallback((data) => {
        setCreateModalOpened(false);
        addEmployeeHandler(data);
    }, [addEmployeeHandler])


    return (
        <Fragment>
            <ActionsWrapper>
                <SearchBar searchHandler={searchExpensesHandler}/>
                <CreateBtn onClick={createModalOpenHandler} >{t('add expense')}</CreateBtn>
                <CreateModal show={createModalOpened}
                    onClose={createModalCloseHandler} onConfirm={createModalConfirmHandler}
                    heading='add new expense' confirmText='add' />
            </ActionsWrapper>
            <ExpensesTable />
            <CustomizedSnackbars show={messageShown} message={t('Employee Added')} type='success' onClose={closeMessageHandler} />
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        addingEmployeeSuccess: state.employees.employeesData.addingEmployeeSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchExpensesHandler: ( language, word ) => dispatch(searchExpenses( language, word )),
        /* addEmployeeHandler: (data) => dispatch(addEmployeeData( data )) */
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);