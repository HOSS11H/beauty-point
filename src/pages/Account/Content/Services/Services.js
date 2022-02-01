import { Fragment, useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { searchServices, createService } from '../../../../store/actions/index';
import SearchBar from "../../../../components/Search/SearchBar/SearchBar";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import ServicesTable from './ServicesTable/ServicesTable';
import { CustomButton } from '../../../../components/UI/Button/Button';
import CreateModal from "./CreateModal/CreateModal";
import CustomizedSnackbars from "../../../../components/UI/SnackBar/SnackBar";
import SendingRequestIndicator from "../../../../components/UI/SendingRequestIndicator/SendingRequestIndicator";

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

function Services(props) {

    const { t } = useTranslation()

    const { searchServicesHandler, createServiceHandler, creatingServiceSuccess, creatingService, creatingServiceFailed } = props;

    const [createModalOpened, setCreateModalOpened] = useState(false);

    const [ successMessageShown, setSuccessMessageShown ] = useState(false);
    const [ failedMessageShown, setFailedMessageShown ] = useState(false);

    useEffect(() => {
        setSuccessMessageShown(creatingServiceSuccess)
    }, [creatingServiceSuccess])

    const closeSuccessMessageHandler = useCallback(( ) => {
        setSuccessMessageShown(false)
    }, [])

    useEffect(() => {
        setFailedMessageShown(creatingServiceFailed)
    }, [creatingServiceFailed])

    const closeFailedMessageHandler = useCallback(( ) => {
        setFailedMessageShown(false)
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
        createServiceHandler(data);
    }, [createServiceHandler])

    return (
        <Fragment>
            <ActionsWrapper>
                <SearchBar searchHandler={searchServicesHandler}/>
                <CreateBtn onClick={createModalOpenHandler} >{t('Create Service')}</CreateBtn>
                <CreateModal show={createModalOpened}
                    onClose={createModalCloseHandler} onConfirm={createModalConfirmHandler}
                    heading='create new service' confirmText='create' />
            </ActionsWrapper>
            <ServicesTable />
            <CustomizedSnackbars show={successMessageShown} message={t('Service Added')} type='success' onClose={closeSuccessMessageHandler} />
            <CustomizedSnackbars show={failedMessageShown} message={t('error adding service')} type='error' onClose={closeFailedMessageHandler} />
            <SendingRequestIndicator open={creatingService} />
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        creatingServiceSuccess: state.services.creatingServiceSuccess,
        creatingServiceFailed: state.services.creatingServiceFailed,
        creatingService: state.services.creatingService,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchServicesHandler: (language, word) => dispatch(searchServices(language, word)),
        createServiceHandler: (data) => dispatch(createService( data ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Services);