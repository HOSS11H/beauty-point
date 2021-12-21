import { Fragment, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { searchExpensesCategories , createExpenseCategory} from '../../../../../store/actions/index';
import SearchBar from "../../../../../components/Search/SearchBar/SearchBar";

import ExpensesCategoriesTable from './ExpenseCategoriesTable/ExpenseCategoriesTable';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { CustomButton } from '../../../../../components/UI/Button/Button';
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

function ExpenseCategories(props) {

    const { t } = useTranslation()

    const { searchExpensesCategoriesHandler, addExpenseCategoryHandler } = props;

    const [createModalOpened, setCreateModalOpened] = useState(false);

    // Create Modal
    const createModalOpenHandler = useCallback((id) => {
        setCreateModalOpened(true);
    }, [])
    const createModalCloseHandler = useCallback(() => {
        setCreateModalOpened(false);
    }, [])

    const createModalConfirmHandler = useCallback((data) => {
        setCreateModalOpened(false);
        addExpenseCategoryHandler(data);
    }, [addExpenseCategoryHandler])


    return (
        <Fragment>
            <ActionsWrapper>
                <SearchBar searchHandler={searchExpensesCategoriesHandler}/>
                <CreateBtn onClick={createModalOpenHandler} >{t('add category')}</CreateBtn>
                <CreateModal show={createModalOpened}
                    onClose={createModalCloseHandler} onConfirm={createModalConfirmHandler}
                    heading='add new category' confirmText='add' />
            </ActionsWrapper>
            <ExpensesCategoriesTable />
        </Fragment>
    );
}



const mapDispatchToProps = dispatch => {
    return {
        searchExpensesCategoriesHandler: ( language, word ) => dispatch(searchExpensesCategories( language, word )),
        addExpenseCategoryHandler: (data) => dispatch(createExpenseCategory( data ))
    }
}

export default connect(null, mapDispatchToProps)(ExpenseCategories);