import { Box } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import styled from "styled-components";
import { CustomButton } from "../../../../../UI/Button/Button";
import Loader from "../../../../../UI/Loader/Loader";
import useForm from "../../../../../../hooks/useForm";
import AuthContext from "../../../../../../store/auth-context";
import v1 from '../../../../../../utils/axios-instance-v1';
import { onlineLoginForm, onlineNameForm, onlineOTPForm } from "../../../../../../utils/formConfig";

const ErrorMessage = styled.p`
    font-size: 18px;
    line-height: 1.4;
    margin: 0 0 20px;
    text-align: center;
    text-transform: capitalize;
    color: #DF1338;
`

const UserAuth = props => {

    const { handleNext, storeUserData } = props;

    const authCtx = useContext(AuthContext);

    const [step, setStep] = useState(0)

    const [nameRequired, setNameRequired] = useState(false)

    const { t } = useTranslation();

    const [errorMessage, setErrorMessage] = useState(null);

    const { renderFormInputs: loginInputs, isFormValid: isLoginDataValid, form: loginData } = useForm(onlineLoginForm);
    const { renderFormInputs: OTPInputs, isFormValid: OTPDataValid, form: OTPData } = useForm(onlineOTPForm);
    const { renderFormInputs: nameInputs, isFormValid: nameDataValid, form: nameData } = useForm(onlineNameForm);

    const submitFirstStepHandler = () => {
        let url;
        let authData;
        url = `/auth/send-otp`;
        authData = {
            mobile: loginData.mobile.value,
        }
        setErrorMessage(null);
        v1.post(url, authData)
            .then(res => {
                setStep(1);
                if (!res.data.registered) {
                    setNameRequired(true);
                }
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setErrorMessage(t('serverError'));
                } else {
                    setErrorMessage(t(err.response.data.message))
                }
            })
    }
    const submitOTPStepHandler = () => {
        let url;
        let authData;
        url = `/auth/sign-in-otp`;
        authData = {
            mobile: loginData.mobile.value,
            otp: OTPData.otp.value,
            fcm_token: 'asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231',
            device_name: 'Y621312',
        }
        setErrorMessage(null);
        v1.post(url, authData)
            .then(res => {
                storeUserData(res.data);
                // if user already registered
                if (res.data.user.roles[0].name === 'customer') {
                    authCtx.login(res.data.token, res.data.user.roles[0].name);
                } else {
                    authCtx.login(res.data.token, res.data.user.roles[0].id);
                }
                if (!nameRequired) {
                    handleNext();
                } else if ( nameRequired) {
                    setStep(2);
                }
            })
            .catch(err => {
                if ( err.response.data.errors ) {
                    const errs = err.response.data.errors;
                    for (let key in errs) {
                        toast.error(errs[key][0])
                    }

                } else {
                    setErrorMessage(t(err.response.data.message))
                    toast.error(err.response.data.message)
                }
            })
    }
    const submitNameStepHandler = () => {
        let url;
        let authData;
        url = `/auth/update-name`;
        authData = {
            name: nameData.name.value,
        }
        setErrorMessage(null);
        v1.post(url, authData)
            .then(res => {
                if ( res.status === 204 ) {
                    handleNext();
                }
            })
            .catch(err => {
                if ( err.response.data.errors ) {
                    const errs = err.response.data.errors;
                    for (let key in errs) {
                        toast.error(errs[key][0])
                    }

                } else {
                    setErrorMessage(t(err.response.data.message))
                    toast.error(err.response.data.message)
                }
            })
    }

    let content = (
        <Loader height='300px' />
    )
    if (step === 0) {
        content = (
            <Fragment>
                <Box sx={{ padding: '15px 10px' }} >
                    {loginInputs()}
                </Box>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <CustomButton onClick={submitFirstStepHandler} disabled={!isLoginDataValid()} >{t('log in')}</CustomButton>
            </Fragment>
        )
    }
    if (step === 1) {
        content = (
            <Fragment>
                <Box sx={{ padding: '15px 10px' }} >
                    {OTPInputs()}
                </Box>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <CustomButton onClick={submitOTPStepHandler} disabled={!OTPDataValid()} >{t('confirm')}</CustomButton>
            </Fragment>
        )
    }
    if (step === 2) {
        content = (
            <Fragment>
                <Box sx={{ padding: '15px 10px' }} >
                    {nameInputs()}
                </Box>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <CustomButton onClick={submitNameStepHandler} disabled={!nameDataValid()} >{t('confirm')}</CustomButton>
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