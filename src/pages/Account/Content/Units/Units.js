import { Fragment, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { searchUnits, addUnit } from '../../../../store/actions/index';
import SearchBar from "../../../../components/Search/SearchBar/SearchBar";

import UnitsTable from './UnitsTable/UnitsTable';

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

function Units(props) {

    const { t } = useTranslation()

    const { searchUnitsHandler, addUnitHandler, addingUnitSuccess, addingUnitFailed, addingUnitMessage } = props;

    const [createModalOpened, setCreateModalOpened] = useState(false);


    useEffect( () => {
        if( addingUnitSuccess ) {
            setCreateModalOpened(false);
            toast.success(t('Unit Added'), {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [addingUnitSuccess, t])
    
    useEffect(() => {
        if (addingUnitFailed && addingUnitMessage) {
            toast.error(addingUnitMessage, {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [addingUnitFailed, addingUnitMessage])

    // Create Modal
    const createModalOpenHandler = useCallback((id) => {
        setCreateModalOpened(true);
    }, [])
    const createModalCloseHandler = useCallback(() => {
        setCreateModalOpened(false);
    }, [])

    const createModalConfirmHandler = useCallback((data) => {
        addUnitHandler(data);
    }, [addUnitHandler])


    return (
        <Fragment>
            <ActionsWrapper>
                <SearchBar searchHandler={searchUnitsHandler}/>
                <CreateBtn onClick={createModalOpenHandler} >{t('add unit')}</CreateBtn>
                <CreateModal show={createModalOpened}
                    onClose={createModalCloseHandler} onConfirm={createModalConfirmHandler}
                    heading='add new unit' confirmText='add' />
            </ActionsWrapper>
            <UnitsTable />
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        addingUnitSuccess: state.units.units.addingUnitSuccess,
        addingUnitFailed: state.units.units.addingUnitFailed,
        addingUnitMessage: state.units.units.addingUnitMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchUnitsHandler: ( language, word ) => dispatch(searchUnits( language, word )),
        addUnitHandler: (data) => dispatch(addUnit( data ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Units);