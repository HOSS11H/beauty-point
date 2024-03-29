import { Fragment, useState, useCallback, useEffect} from "react";
import { connect } from "react-redux";
import { searchDeals, createDeal } from '../../../../store/actions/index';
import SearchBar from "../../../../components/Search/SearchBar/SearchBar";

import DealsTable from './DealsTable/DealsTable';


import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { CustomButton } from '../../../../components/UI/Button/Button';
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

function Deals(props) {
    const { t } = useTranslation()

    const { searchDealsHandler, createDealHandler, creatingDealSuccess, creatingDealFailed, creatingDealMessage } = props

    const [createModalOpened, setCreateModalOpened] = useState(false);

    useEffect(() => {
        if ( creatingDealSuccess ) {
            setCreateModalOpened(false);
            toast.success(t('Deal Created'), {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [creatingDealSuccess, t])

    useEffect(() => {
        if (creatingDealFailed && creatingDealMessage) {
            toast.error(creatingDealMessage, {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [creatingDealFailed, creatingDealMessage])

    // Create Modal
    const createModalOpenHandler = useCallback((id) => {
        setCreateModalOpened(true);
    }, [])
    const createModalCloseHandler = useCallback(() => {
        setCreateModalOpened(false);
    }, [])

    const createModalConfirmHandler = useCallback((data) => {
        createDealHandler(data);
    }, [createDealHandler])

    return (
        <Fragment>
            <ActionsWrapper>
                <SearchBar searchHandler={searchDealsHandler}/>
                <CreateBtn onClick={createModalOpenHandler} >{t('Create Deal')}</CreateBtn>
                <CreateModal show={createModalOpened}
                    onClose={createModalCloseHandler} onConfirm={createModalConfirmHandler}
                    heading='create new deal' confirmText='create' />
            </ActionsWrapper>
            <DealsTable />
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        creatingDealSuccess: state.deals.creatingDealSuccess,
        creatingDealFailed: state.deals.creatingDealFailed,
        creatingDealMessage: state.deals.creatingDealMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchDealsHandler: ( language, word ) => dispatch(searchDeals( language, word )),
        createDealHandler: (data) => dispatch(createDeal( data ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deals);