import { useContext, useEffect, useState } from 'react';
import axios from '../../utils/axios-instance-v1';
import useForm from '../../hooks/useForm';
import { loginForm, subscribeForm } from '../../utils/formConfig';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import ThemeContext from '../../store/theme-context';
import styled  from 'styled-components';
import { Container, Grid } from '@mui/material';
import { CustomButton } from '../../components/UI/Button/Button';
import Logo from '../../images/logo/logo_mobile.png'

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
    text-align: center;
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
    span,a {
        color: ${ (  { theme } ) => theme.vars.primary };
        font-weight: 600;
        margin-left: 5px;
        cursor: pointer;
    }
`

const LogoImg = styled.img`
    width: 90px;
    height: 90px;
    object-fit: cover;
    display: inline-flex;
    justify-content: center;
`


const Auth = props => {

    const authCtx = useContext(AuthContext);

    const themeCtx = useContext(ThemeContext)

    const navigate = useNavigate();

    const [ isLogin , setIsLogin ] = useState(true);

    const [ errorMessage , setErrorMessage ] = useState(null);

    const { isLoggedIn } = authCtx;

    const { renderFormInputs: loginInputs, isFormValid: isLoginDataValid, form: loginData } = useForm(loginForm);
    const { renderFormInputs: subscribeInputs, isFormValid: isSubscribeDataValid, form: subscribeData } = useForm(subscribeForm);

    let authIsValid;

    if (isLogin) {
        authIsValid = isLoginDataValid();
    } else {
        authIsValid = isSubscribeDataValid()
    }

    useEffect(() => {
        isLoggedIn && navigate('/account/dashboard', { replace: true })
    }, [isLoggedIn, navigate])

    const switchAuthModeHandler = ( ) => {
        setIsLogin(prevState => !prevState);
        setErrorMessage(null)
    }
    const submitHandler = async ( e ) => {
        e.preventDefault();
        let url ;
        let authData;
        if (isLogin) {
            url = `/auth/sign-in`;
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ( pattern.test(loginData.email.value) ) {
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
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDteusGiWoNp_qFEn36zfPtJPSwRS8hpyg`;
            authData = {
                email: subscribeData.email.value,
                password: subscribeData.password.value,
            }
        }
        setErrorMessage(null);
        axios.post(url, authData)
            .then(res => {
                authCtx.login(res.data.token);
            })
            .catch( err => {
                setErrorMessage(err.message.split('_').join(' ').toLowerCase())
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
                            <LogoImg src={Logo} alt="logo" />
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
                                    <a href='https://beautypoint.sa/register'>
                                        {loginFormText.formSwitchLink}
                                    </a>
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
