import { useContext, useState } from 'react';
import axios from '../../utils/axios-instance';
import useForm from '../../hooks/useForm';
import { loginForm, subscribeForm } from '../../utils/formConfig';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import ThemeContext from '../../store/theme-context';
import styled  from 'styled-components';
import { Container, Grid } from '@mui/material';
import { CustomButton } from '../../components/UI/Button/Button'; 

const AuthContainer = styled.div`
    min-height: 100vh;
    padding: 100px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FormWrapper = styled.form`
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    padding: 40px 20px;
    background-color: ${ ( { theme } ) => theme.palette.background.default };
    border-radius: 12px;
`
const FormHeading = styled.h1`
    font-size: 26px;
    line-height: 1.4;
    font-weight: 600;
    margin: 0 0 20px;
    text-align: center;
    text-transform: capitalize;
    color: ${ ( { theme } ) => theme.palette.text.primary };
`
const ErrorMessage = styled.p`
    font-size: 18px;
    line-height: 1.4;
    margin: 0 0 20px;
    text-align: center;
    text-transform: capitalize;
    color: #DF1338;
`
const FormLink = styled.p`
    font-size: 16px;
    color: #9b9b9b;
    text-align: center;
    text-transform: capitalize;
    display: flex;
    align-items:center;
    justify-content: center;
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
    span {
        color: ${ (  { theme } ) => theme.vars.primary };
        font-weight: 600;
        margin-left: 5px;
        cursor: pointer;
    }
`


const Auth = props => {

    const authCtx = useContext(AuthContext);

    const themeCtx = useContext(ThemeContext)

    const navigate = useNavigate();

    const [ isLogin , setIsLogin ] = useState(false);

    const [ errorMessage , setErrorMessage ] = useState(null);



    const { renderFormInputs: loginInputs, isFormValid: isLoginDataValid, form: loginData } = useForm(loginForm);
    const { renderFormInputs: subscribeInputs, isFormValid: isSubscribeDataValid, form: subscribeData } = useForm(subscribeForm);

    let authIsValid;

    if (isLogin) {
        authIsValid = isLoginDataValid();
    } else {
        authIsValid = isSubscribeDataValid()
    }

    const switchAuthModeHandler = ( ) => {
        setIsLogin(prevState => !prevState);
        setErrorMessage(null)
    }
    const submitHandler = ( event ) => {
        event.preventDefault();
        let url ;
        let authData;
        if (isLogin) {
            url = `/auth/sign-in`
            authData = {
                email: loginData.email.value,
                password: loginData.password.value,
            }
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDteusGiWoNp_qFEn36zfPtJPSwRS8hpyg`;
            authData = {
                email: subscribeData.email.value,
                password: subscribeData.password.value,
            }
        }
        setErrorMessage(null);
        axios.post(url, authData, {
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => {
                console.log('success', res.data)
                navigate('/', { replace: true });
                authCtx.login(res.data.idToken);
                navigate('/account/dashboard', { replace: true });
            })
            .catch(err => {
                console.log(err);
                setErrorMessage(err.response.data.error.message.split('_').join(' ').toLowerCase())
            })
    }

    let loginFormText = {
        heading: 'Login',
        passwordRestoreMessage: 'forget Password ?',
        passwordMessageLink: 'reset',
        button: 'login',
        formSwitchText: `Don't have account ?`,
        formSwitchLink: `subscribe`,
    }
    let subscribeFormText = {
        heading: 'be a service provider',
        button: 'subscribe',
        formSwitchText: `have an account ?`,
        formSwitchLink: `login`,
    }

    if (themeCtx.direction === 'rtl' ) {
        loginFormText = {
            heading: 'تسجيل الدخول',
            passwordRestoreMessage: 'نسيت كلمة المرور؟   ',
            passwordMessageLink: 'استعادة',
            button: 'تسجيل الدخول',
            formSwitchText: `اذا لم يكن لديك حساب ؟`,
            formSwitchLink: `اشتراك`,
        }
        subscribeFormText = {
            heading: 'الاشتراك كمقدم خدمة',
            button: 'اشتراك',
            formSwitchText: `هل لديك حساب ؟`,
            formSwitchLink: `تسجيل الدخول`,
        }
    }


    return (
        <AuthContainer>
            <Container maxWidth="md">
                <Grid container  >
                    <Grid item xs={12} md={3} >
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <FormWrapper>
                            <FormHeading>
                                { isLogin && loginFormText.heading }
                                { !isLogin&& subscribeFormText.heading }
                            </FormHeading>
                            { isLogin ? loginInputs() : subscribeInputs() }
                            { isLogin && (
                                <FormLink>
                                    {loginFormText.passwordRestoreMessage}
                                    <span >
                                        {loginFormText.passwordMessageLink}
                                    </span>
                                </FormLink>
                            )}
                            { errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                            <CustomButton onClick={submitHandler} disabled={!authIsValid} >{isLogin ? loginFormText.button : subscribeFormText.button}</CustomButton>
                            { isLogin && (
                                <FormLink>
                                    {loginFormText.formSwitchText}
                                    <span onClick={switchAuthModeHandler}>
                                        {loginFormText.formSwitchLink}
                                    </span>
                                </FormLink>
                            )}
                            { !isLogin && (
                                <FormLink>
                                    {subscribeFormText.formSwitchText}
                                    <span onClick={switchAuthModeHandler}>
                                        {subscribeFormText.formSwitchLink}
                                    </span>
                                </FormLink>
                            )}
                        </FormWrapper>
                    </Grid>
                </Grid>
            </Container>
        </AuthContainer>
    )

}
export default Auth;