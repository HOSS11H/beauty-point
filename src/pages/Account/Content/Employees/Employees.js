import { Fragment, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { searchEmployeesData, addEmployeeData } from '../../../../store/actions/index';
import SearchBar from "../../../../components/Search/SearchBar/SearchBar";

import EmployeesTable from './EmployeesTable/EmployeesTable';

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

function Employees(props) {

    const { t } = useTranslation()

    const { searchEmployeesHandler, addEmployeeHandler, addingEmployeeSuccess, addingEmployeeFailed, addingEmployeeMessage } = props;

    const [createModalOpened, setCreateModalOpened] = useState(false);

    useEffect(() => {
        if ( addingEmployeeSuccess ) {
            setCreateModalOpened(false);
            toast.success(t('Empolyee Added'), {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [addingEmployeeSuccess, t])

    useEffect(() => {
        if (addingEmployeeFailed && addingEmployeeMessage) {
            toast.error(addingEmployeeMessage, {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
        }
    }, [addingEmployeeFailed, addingEmployeeMessage])


    // Create Modal
    const createModalOpenHandler = useCallback((id) => {
        setCreateModalOpened(true);
    }, [])
    const createModalCloseHandler = useCallback(() => {
        setCreateModalOpened(false);
    }, [])

    const createModalConfirmHandler = useCallback((data) => {
        addEmployeeHandler(data);
    }, [addEmployeeHandler])


    return (
        <Fragment>
            <ActionsWrapper>
                <SearchBar searchHandler={searchEmployeesHandler}/>
                <CreateBtn onClick={createModalOpenHandler} >{t('add employee')}</CreateBtn>
                <CreateModal show={createModalOpened}
                    onClose={createModalCloseHandler} onConfirm={createModalConfirmHandler}
                    heading='add new employee' confirmText='add' />
            </ActionsWrapper>
            <EmployeesTable />
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        addingEmployeeSuccess: state.employees.employeesData.addingEmployeeSuccess,
        addingEmployeeFailed: state.employees.employeesData.addingEmployeeFailed,
        addingEmployeeMessage: state.employees.employeesData.addingEmployeeMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchEmployeesHandler: ( language, word ) => dispatch(searchEmployeesData( language, word )),
        addEmployeeHandler: (data) => dispatch(addEmployeeData( data ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employees);