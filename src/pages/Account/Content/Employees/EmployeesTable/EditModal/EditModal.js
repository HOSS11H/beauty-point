import { Grid, InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import ValidationMessage from '../../../../../../components/UI/ValidationMessage/ValidationMessage';
import { fetchRoles } from '../../../../../../store/actions/index';
import ThemeContext from '../../../../../../store/theme-context';
import PercentIcon from '@mui/icons-material/Percent';




const CustomTextField = styled(TextField)`
    width: 100%;
`

const CreateModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, id, fetchedRoles, fetchRolesHandler, fetchedEmployees } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const selectedEmployeeIndex = fetchedEmployees.data.findIndex(employee => employee.id === id);

    let employeeData = fetchedEmployees.data[selectedEmployeeIndex];

    const { name, mobile, email, roles, commission } = employeeData;

    const [employeeName, setEmployeeName] = useState(name);
    const [employeeNameError, setEmployeeNameError] = useState(false);

    const [employeeEmail, setEmployeeEmail] = useState(email);

    const [employeeNumber, setEmployeeNumber] = useState(mobile);
    const [employeeNumberError, setEmployeeNumberError] = useState(false);

    const [employeeCommission, setEmployeeCommission] = useState(commission);

    const [employeeRole, setEmployeeRole] = useState(roles[0].id);
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
    }
    const employeeNumberChangeHandler = (event) => {
        setEmployeeNumber(event.target.value);
        setEmployeeNumberError(false);
    }
    const employeeCommissionChangeHandler = (event) => {
        setEmployeeCommission(event.target.value);
    }
    const handleEmployeeRoleChange = (event) => {
        setEmployeeRole(event.target.value);
        setEmployeeRoleError(false);
    };
    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose])

    const confirmCreateHandler = useCallback(() => {
        if (employeeName.trim().length === 0) {
            setEmployeeNameError(true);
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
            id: id,
            name: employeeName,
            mobile: employeeNumber,
            role_id: employeeRole,
            commission: employeeCommission,
            calling_code: '5555',
        }
        if (employeeEmail !== '') {
            data.email = employeeEmail;
        }
        onConfirm(data);
    }, [employeeCommission, employeeEmail, employeeName, employeeNumber, employeeRole, id, onConfirm])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="employee-name" label={t('name')} variant="outlined" value={employeeName} onChange={employeeNameChangeHandler} />
                {employeeNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="employee-email" label={t('email')} variant="outlined" value={employeeEmail} onChange={employeeEmailChangeHandler} />
                <ValidationMessage exist>{t(`The Password is 132456`)}</ValidationMessage>
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
                                return <MenuItem key={role.id} value={role.id}>{t(role.name)}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                {employeeRoleError && <ValidationMessage notExist>{t(`Please add a role`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="employee-number" label={t('mobile number')} variant="outlined" value={employeeNumber} onChange={employeeNumberChangeHandler} />
                {employeeNumberError && <ValidationMessage notExist>{t(`Please add Number`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="employee-comission" label={t('employee comission')}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><PercentIcon /></InputAdornment>,
                    }}
                    variant="outlined" type='number' value={employeeCommission} onChange={employeeCommissionChangeHandler} />
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRolesHandler: (lang) => dispatch(fetchRoles(lang)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);