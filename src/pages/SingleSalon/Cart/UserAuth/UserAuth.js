import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TabPanel from "../../../../components/UI/TabPanel/TabPanel";
import useForm from "../../../../hooks/useForm";
import { a11yProps } from "../../../../shared/utility";
import { registerForm, loginForm } from "../../../../utils/formConfig";
import styled from "styled-components";
import { CustomButton } from "../../../../components/UI/Button/Button";

const ErrorMessage = styled.p`
    font-size: 18px;
    line-height: 1.4;
    margin: 0 0 20px;
    text-align: center;
    text-transform: capitalize;
    color: #DF1338;
`

const UserAuth = props => {

    const { t } = useTranslation();

    const [value, setValue] = useState(0);

    const [ errorMessage , setErrorMessage ] = useState(null);

    const { renderFormInputs: registerInputs, isFormValid: isRegisterDataValid, form: registerData } = useForm(registerForm);

    const { renderFormInputs: loginInputs, isFormValid: isLoginDataValid, form: loginData } = useForm(loginForm);

    let authIsValid;

    if (value === 0) {
        authIsValid = isRegisterDataValid()
    } else {
        authIsValid = isLoginDataValid()
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const submitHandler = () => {
        if (value === 0) {
            props.register(registerData)
        } else {
            props.login(loginData)
        }
    }

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={t('new registeration')} {...a11yProps(0)} />
                    <Tab label={t('have an account ?')} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {registerInputs()}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {loginInputs()}
            </TabPanel>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <CustomButton onClick={submitHandler} disabled={!authIsValid} >{value === 0 ? t('register') : t('log in')}</CustomButton>
        </>
    )
}
export default UserAuth;