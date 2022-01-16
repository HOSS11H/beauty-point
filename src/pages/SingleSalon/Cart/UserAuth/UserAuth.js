import { Box, Tab, Tabs } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TabPanel from "../../../../components/UI/TabPanel/TabPanel";
import useForm from "../../../../hooks/useForm";
import { a11yProps } from "../../../../shared/utility";
import { registerForm, loginForm } from "../../../../utils/formConfig";
import styled from "styled-components";
import { CustomButton } from "../../../../components/UI/Button/Button";
import { useContext } from "react";
import AuthContext from "../../../../store/auth-context";
import v1 from '../../../../utils/axios-instance-v1';
import Loader from "../../../../components/UI/Loader/Loader";

const ErrorMessage = styled.p`
    font-size: 18px;
    line-height: 1.4;
    margin: 0 0 20px;
    text-align: center;
    text-transform: capitalize;
    color: #DF1338;
`

const UserAuth = props => {

    const { handleNext, id, storeUserData } = props;

    const authCtx = useContext(AuthContext);
    
    const { token } = authCtx;

    const { t } = useTranslation();

    const [value, setValue] = useState(0);

    const [errorMessage, setErrorMessage] = useState(null);

    const { renderFormInputs: registerInputs, isFormValid: isRegisterDataValid, form: registerData } = useForm(registerForm);

    const { renderFormInputs: loginInputs, isFormValid: isLoginDataValid, form: loginData } = useForm(loginForm);

    let authIsValid;

    if (value === 0) {
        authIsValid = isRegisterDataValid()
    } else {
        authIsValid = isLoginDataValid()
    }

    useEffect(() => {
        if (token) {
            handleNext()
        }
    }, [handleNext, token])


    const handleChange = (event, newValue) => {
        setValue(newValue);
        setErrorMessage(null);
    };

    const submitHandler = () => {
        let url;
        let authData;
        if (value === 0) {
            url = '/auth/sign-up';
            authData = {
                company_id: id,
                name: registerData.name.value,
                mobile: registerData.phoneNum.value,
                password: registerData.password.value,
                fcm_token: 'asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231',
                device_name: 'Y621312',
            }
        } else {
            url = `/auth/sign-in`;
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (pattern.test(loginData.email.value)) {
                authData = {
                    email: loginData.email.value,
                    password: loginData.password.value,
                    fcm_token: 'asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231',
                    device_name: 'Y621312',
                }
            } else {
                authData = {
                    mobile: loginData.email.value,
                    password: loginData.password.value,
                    fcm_token: 'asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231',
                    device_name: 'Y621312',
                }
            }
        }
        setErrorMessage(null);
        v1.post(url, authData)
            .then(res => {
                if (res.data.user.roles[0].name === 'customer') {
                    authCtx.login(res.data.token, res.data.user.roles[0].name);
                } else {
                    authCtx.login(res.data.token, res.data.user.roles[0].id);
                }
                storeUserData(res.data);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setErrorMessage(t('serverError'));
                } else {
                    setErrorMessage(t(err.response.data.message))
                }
            })
    }

    let content = (
        <Loader height='300px' />
    )
    if ( !token ) {
        content = (
            <Fragment>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={t('new registeration')} {...a11yProps(0)} />
                        <Tab label={t('have an account ?')} {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0} padding='15px 10px' >
                    {registerInputs()}
                </TabPanel>
                <TabPanel value={value} index={1} padding='15px 10px' >
                    {loginInputs()}
                </TabPanel>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <CustomButton onClick={submitHandler} disabled={!authIsValid} >{value === 0 ? t('register') : t('log in')}</CustomButton>
            </Fragment>
        )
    }

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}
export default UserAuth;