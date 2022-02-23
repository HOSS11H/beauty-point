import { Fragment, useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { searchServices, createService } from '../../../../store/actions/index';
import SearchBar from "../../../../components/Search/SearchBar/SearchBar";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import ServicesTable from './ServicesTable/ServicesTable';
import { CustomButton } from '../../../../components/UI/Button/Button';
import CreateModal from "./CreateModal/CreateModal";
import SendingRequestIndicator from "../../../../components/UI/SendingRequestIndicator/SendingRequestIndicator";
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

function Services(props) {

    const { t } = useTranslation()

    const { searchServicesHandler, createServiceHandler, creatingServiceSuccess, creatingService, creatingServiceFailed, creatingServiceMessage } = props;

    const [createModalOpened, setCreateModalOpened] = useState(false);

    useEffect(() => {
        if ( creatingServiceSuccess ) {
            setCreateModalOpened(false)
            toast.success(t('Service Added'), {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [creatingServiceSuccess, t])

    useEffect(() => {
        if ( creatingServiceFailed && creatingServiceMessage ) {
            setCreateModalOpened(false)
            toast.error(creatingServiceMessage, {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [creatingServiceFailed, creatingServiceMessage, creatingServiceSuccess, t])


    // Create Modal
    const createModalOpenHandler = useCallback((id) => {
        setCreateModalOpened(true);
    }, [])
    const createModalCloseHandler = useCallback(() => {
        setCreateModalOpened(false);
    }, [])

    const createModalConfirmHandler = useCallback((data) => {
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
            <SendingRequestIndicator open={creatingService} />
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        creatingServiceSuccess: state.services.creatingServiceSuccess,
        creatingServiceFailed: state.services.creatingServiceFailed,
        creatingServiceMessage: state.services.creatingServiceMessage,
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