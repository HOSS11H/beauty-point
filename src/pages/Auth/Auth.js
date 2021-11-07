import { useContext, useState } from 'react';
import axios from 'axios';
import useForm from '../../hooks/useForm';
import { loginForm, signupForm } from '../../utils/formConfig';
import styled  from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { Container, Grid } from '@mui/material';

const AuthContainer = styled.div`
    min-height: 100vh;
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
`
const ErrorMessage = styled.p`
    font-size: 18px;
    line-height: 1.4;
    margin: 0 0 20px;
    text-align: center;
    text-transform: capitalize;
    color: #DF1338;
`
const Button = styled.button`
    font-size:17px;
    padding:15px 30px;
    display: flex;
    align-items:center;
    justify-content: center;
    height: 50px;
    margin-bottom: 10px;
    width:100%;
    background: linear-gradient(90deg, #034694 0%, #0170C1 100%);
    color: #fff;
    border:0;
    outline: none;
    cursor: pointer;
    text-transform: capitalize;
    transition: 0.3s ease-in-out;
    box-shadow: 0px 8px 12px rgba(3, 72, 150, 0.15);
    &:disabled {
        background: #eee;
        color: #999;
        box-shadow: none;
    }
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

    console.log(authCtx.isLoggedIn);

    const navigate = useNavigate();

    const [ isLogin , setIsLogin ] = useState(true);

    const [ errorMessage , setErrorMessage ] = useState(null);


    const { renderFormInputs: loginInputs, isFormValid: isLoginDataValid, form: loginData } = useForm(loginForm);
    const { renderFormInputs: signupInputs, isFormValid: isSignupDataValid, form: signupData } = useForm(signupForm);

    let authIsValid;

    if (isLogin) {
        authIsValid = isLoginDataValid();
    } else {
        authIsValid = isSignupDataValid()
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
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDteusGiWoNp_qFEn36zfPtJPSwRS8hpyg`
            authData = {
                email: loginData.email.value,
                password: loginData.password.value,
                returnSecureToken: true,
            }
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDteusGiWoNp_qFEn36zfPtJPSwRS8hpyg`;
            authData = {
                email: signupData.email.value,
                password: signupData.password.value,
                returnSecureToken: true,
            }
        }
        setErrorMessage(null);
        axios.post(url, authData)
            .then(res => {
                console.log('success', res.data)
                navigate('/', { replace: true });
                authCtx.login(res.data.idToken);
            })
            .catch(err => {
                console.log(err.response);
                setErrorMessage(err.response.data.error.message.split('_').join(' ').toLowerCase())
            })
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
                                { isLogin && 'تسجيل الدخول' }
                                { !isLogin&& 'الاشتراك كمقدم خدمة' }
                            </FormHeading>
                            { isLogin ? loginInputs() : signupInputs() }
                            { isLogin && (
                                <FormLink>
                                    نسيت كلمة المرور؟   
                                    <span >
                                        استعادة
                                    </span>
                                </FormLink>
                            )}
                            { errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                            <Button onClick={submitHandler} disabled={!authIsValid} >{isLogin ? 'Login' : 'Create Account'}</Button>
                            { isLogin && (
                                <FormLink>
                                    اذا لم يكن لديك حساب ؟
                                    <span onClick={switchAuthModeHandler}>
                                        اشتراك
                                    </span>
                                </FormLink>
                            )}
                            { !isLogin && (
                                <FormLink>
                                    هل لديك حساب ؟
                                    <span onClick={switchAuthModeHandler}>
                                        تسجيل الدخول
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