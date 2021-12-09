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

import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import LockIcon from '@mui/icons-material/Lock';


const CustomTextField = styled(TextField)`
    width: 100%;
`

const CreateModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, fetchedRoles, fetchRolesHandler, creatingEmployeeSuccess } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [employeeName, setEmployeeName] = useState('');
    const [employeeNameError, setEmployeeNameError] = useState(false);

    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeeEmailError, setEmployeeEmailError] = useState(false);

    const [employeePassword, setEmployeePassword] = useState('');
    const [employeePasswordError, setEmployeePasswordError] = useState(false);

    const [employeeNumber, setEmployeeNumber] = useState('');
    const [employeeNumberError, setEmployeeNumberError] = useState(false);

    const [employeeRole, setEmployeeRole] = useState('');
    const [employeeRoleError, setEmployeeRoleError] = useState(false);

    useEffect(() => {
        fetchRolesHandler(lang);
    }, [fetchRolesHandler, lang])


    const employeeNameChangeHandler = (event) => {
        setEmployeeName(event.target.value);
        setEmployeeNameError(false);
    }

    const employeeEmailChangeHandler = (event) => {
        setEmployeeEmail(event.target.value);
        setEmployeeEmailError(false);
    }
    const employeePasswordChangeHandler = (event) => {
        setEmployeePassword(event.target.value);
        setEmployeePasswordError(false);
    }

    const employeeNumberChangeHandler = (event) => {
        setEmployeeNumber(event.target.value);
        setEmployeeNumberError(false);
    }
    const handleEmployeeRoleChange = (event) => {
        setEmployeeRole(event.target.value);
        setEmployeeRoleError(false);
    };
    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose])

    const resetModalData = useCallback(() => {
        setEmployeeName('');
        setEmployeeNameError(false);
        setEmployeeNumber(0);
        setEmployeeNumberError(false);
        setEmployeeEmail('');
        setEmployeeEmailError(false);
        setEmployeePassword('');
        setEmployeePasswordError(false);
        setEmployeeRole('');
        setEmployeeRoleError(false);
    }, [])

    useEffect(() => {
        creatingEmployeeSuccess && resetModalData();
    }, [creatingEmployeeSuccess, resetModalData])

    const confirmCreateHandler = useCallback(() => {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (employeeName.trim().length === 0) {
            setEmployeeNameError(true);
            return;
        }
        if (pattern.test(employeeEmail) === false) {
            setEmployeeEmailError(true);
            return;
        }
        if (employeePassword.trim().length === 0) {
            setEmployeePasswordError(true);
            return;
        }
        if (employeeRole === '') {
            setEmployeeRoleError(true);
            return;
        }   
        if (employeeNumber.trim().length === 0) {
            setEmployeeNumberError(true);
            return;
        }
        const data = {
            name: employeeName,
            email: employeeEmail,
            mobile: employeeNumber,
            role_id: employeeRole,
            calling_code: '5555',
        }
        onConfirm(data);
    }, [employeeEmail, employeeName, employeeNumber, employeePassword, employeeRole, onConfirm])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="employee-name" label={t('name')} variant="outlined" value={employeeName} onChange={employeeNameChangeHandler} />
                {employeeNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="employee-email" label={t('email')} variant="outlined" value={employeeEmail} onChange={employeeEmailChangeHandler} />
                {employeeEmailError && <ValidationMessage notExist>{t(`Please add email`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField id='employee-password' placeholder='******' variant="outlined" fullWidth
                    type='password' name='employee-password' value={employeePassword} onChange={employeePasswordChangeHandler}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                {employeePasswordError && <ValidationMessage notExist>{t(`Please add password`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id="item-role">{t('role')}</InputLabel>
                    <Select
                        labelId="item-role"
                        id="item-role-select"
                        value={employeeRole}
                        label={t("Role")}
                        onChange={handleEmployeeRoleChange}
                    >
                        {
                            fetchedRoles.map(role => {
                                return <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                {employeeRoleError && <ValidationMessage notExist>{t(`Please add a role`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="employee-number" label={t('number')} variant="outlined" value={employeeNumber} onChange={employeeNumberChangeHandler} />
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
        fetchedRoles: state.employees.roles,
        creatingEmployeeSuccess: state.employees.creatingEmployeeSuccess,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRolesHandler: (lang) => dispatch(fetchRoles(lang)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);