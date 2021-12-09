import { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../../../store/theme-context'

import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';

import { connect } from 'react-redux';
import { fetchRoles } from '../../../../../store/actions/index';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';


const CustomTextField = styled(TextField)`
    width: 100%;
`

const CreateModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, fetchedRoles, fetchRolesHandler,  creatingEmployeeSuccess} = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [employeeName, setEmployeeName] = useState('');
    const [employeeNameError, setEmployeeNameError] = useState(false);

    const [employeeNumber, setEmployeeNumber] = useState(0);
    const [employeeNumberError, setEmployeeNumberError] = useState(false);

    useEffect(() => {
        fetchRolesHandler(lang);
    }, [fetchRolesHandler, lang])


    const employeeNameChangeHandler = (event) => {
        setEmployeeName(event.target.value);
        setEmployeeNameError(false);
    }

    const employeeNumberChangeHandler = (event) => {
        setEmployeeNumber(event.target.value);
        setEmployeeNumberError(false);
    }
    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose])

    const resetModalData = useCallback(() => {
        setEmployeeName('');
        setEmployeeNameError(false);
        setEmployeeNumber(0);
        setEmployeeNumberError(false);
    }, [])

    useEffect(() => {
        creatingEmployeeSuccess && resetModalData();
    }, [creatingEmployeeSuccess, resetModalData])

    const confirmCreateHandler = useCallback(() => {
        if ( employeeName.trim().length === 0 ) {
            setEmployeeNameError(true);
            return;
        }
        if (employeeNumber.trim().length === 0) { 
            setEmployeeNumberError(true);
            return; 
        }

        const data = {
            name: employeeName,
            quantity: +employeeNumber,
        }
        onConfirm(data);
    }, [employeeName, employeeNumber, onConfirm])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="employee-name" label={t('name')} variant="outlined" value={employeeName} onChange={employeeNameChangeHandler} />
                {employeeNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="employee-number" type='number' label={t('number')} variant="outlined" value={employeeNumber} onChange={employeeNumberChangeHandler} />
                {employeeNumberError && <ValidationMessage notExist>{t(`Please add Number`)}</ValidationMessage>}
            </Grid>
        </Grid>
    )
    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmCreateHandler} onClose={closeModalHandler} >
            {content}
        </CustomModal>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedRoles: state.locations.locations,
        creatingEmployeeSuccess: state.employees.creatingEmployeeSuccess,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRolesHandler: (lang) => dispatch(fetchRoles(lang)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);