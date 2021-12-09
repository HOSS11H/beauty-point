import { Fragment, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { searchProducts, createProduct } from '../../../../store/actions/index';
import SearchBar from "../../../../components/Search/SearchBar/SearchBar";

import ProductsTable from './ProductsTable/ProductsTable';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { CustomButton } from '../../../../components/UI/Button/Button';
import CreateModal from "./CreateModal/CreateModal";
import CustomizedSnackbars from "../../../../components/UI/SnackBar/SnackBar";


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

function Products(props) {

    const { t } = useTranslation()

    const { searchProductsHandler, createProductHandler, creatingProductSuccess } = props;

    const [createModalOpened, setCreateModalOpened] = useState(false);

    const [ messageShown, setMessageShown ] = useState(creatingProductSuccess);

    useEffect(() => {
        setMessageShown(creatingProductSuccess )
    }, [creatingProductSuccess])
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
        createProductHandler(data);
    }, [createProductHandler])


    return (
        <Fragment>
            <ActionsWrapper>
                <SearchBar searchHandler={searchProductsHandler}/>
                <CreateBtn onClick={createModalOpenHandler} >{t('Create Product')}</CreateBtn>
                <CreateModal show={createModalOpened}
                    onClose={createModalCloseHandler} onConfirm={createModalConfirmHandler}
                    heading='create new product' confirmText='create' />
            </ActionsWrapper>
            <ProductsTable />
            <CustomizedSnackbars show={messageShown} message={t('Product Added')} type='success' onClose={closeMessageHandler} />
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        creatingProductSuccess: state.products.creatingProductSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchProductsHandler: ( language, word ) => dispatch(searchProducts( language, word )),
        createProductHandler: (data) => dispatch(createProduct( data ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);