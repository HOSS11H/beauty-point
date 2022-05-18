import { useCallback, useContext, useEffect, useState } from 'react';
import v1 from '../../utils/axios-instance-v1';
import useForm from '../../hooks/useForm';
import { loginForm, subscribeForm } from '../../utils/formConfig';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import ThemeContext from '../../store/theme-context';
import styled from 'styled-components';
import { Container, Grid, Card, Button } from '@mui/material';
import { CustomButton } from '../../components/UI/Button/Button';
import Logo from '../../images/logo/logo_mobile.png'
import AuthBgSrc from '../../images/avatars/auth-bg.png'
import Map from './Map/Map';
import { useTranslation } from 'react-i18next';
import Terms from './Terms/Terms';
import { toast } from 'react-toastify';
import RegisterMap from './RegisterMap/RegisterMap';

const AuthContainer = styled.div`
    min-height: 100vh;
    padding: 100px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.palette.background.default};
`;

const CustomizedCard = styled(Card)`
    padding: 40px 20px;
    border-radius: 12px;
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
`

const FormWrapper = styled.form`
    text-align: left;;
`
const FormHeading = styled.h1`
    font-size: 26px;
    line-height: 1.4;
    font-weight: 600;
    margin: 0 0 20px;
    text-align: center;
    text-transform: capitalize;
    color: ${({ theme }) => theme.palette.text.primary};
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
        color: ${({ theme }) => theme.vars.primary};
        font-weight: 600;
        margin-left: 5px;
        cursor: pointer;
    }
`

const TextButton = styled(Button)`
    &.MuiButton-root {
        padding: 0;
        transform: translateY(-20px);
        margin-top: -20px;
    }
`

const LogoImg = styled.img`
    width: 90px;
    height: 90px;
    object-fit: cover;
    display: flex;
    justify-content: center;
    margin: 0 auto;
`

const AuthImg = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 899.98px) {
        display: none;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`


const Auth = props => {

    const authCtx = useContext(AuthContext);

    const themeCtx = useContext(ThemeContext)
    const { t } = useTranslation()

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const navedTo = searchParams.get('page');
    const packageId = searchParams.get('package');

    const [isLogin, setIsLogin] = useState(navedTo === 'join-us' ? false : true);

    const [errorMessage, setErrorMessage] = useState(null);

    const { isLoggedIn } = authCtx;

    const { renderFormInputs: loginInputs, isFormValid: isLoginDataValid, form: loginData } = useForm(loginForm);
    const { renderFormInputs: subscribeInputs, isFormValid: isSubscribeDataValid, form: subscribeData } = useForm(subscribeForm);

    const [marker, setMarker] = useState({})

    const [ termsModalOpened, setTermsModalOpened ] = useState(false)

    let authIsValid;

    if (isLogin) {
        authIsValid = isLoginDataValid();
    } else {
        authIsValid = isSubscribeDataValid()
    }

    useEffect(() => {
        isLoggedIn && isLogin && navigate('/account/dashboard', { replace: true })
        isLoggedIn && !isLogin && navigate('/account/settings?welcome=true', { replace: true })
    }, [isLoggedIn, isLogin, navigate])

    const switchAuthModeHandler = () => {
        setIsLogin(prevState => !prevState);
        setErrorMessage(null)
    }
    const assignCoords = (lat, lng) => {
        setMarker({
            lat: lat,
            lng: lng,
            defaultAnimation: 2,
        })
    }
    const submitHandler = () => {
        let url;
        let authData;
        if (isLogin) {
            url = `/auth/sign-in`;
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        } else {
            url = `/auth/sign-up-as-vendor`;
            authData = {
                name: subscribeData.name.value,
                business_name: subscribeData.sallonName.value,
                email: subscribeData.email.value,
                contact: subscribeData.phoneNum.value,
                mobile: subscribeData.phoneNum.value,
                address: subscribeData.address.value,
                password: subscribeData.password.value,
                address_latitude: marker.lat,
                address_longitude: marker.lng,
                calling_code: '+91',
                fcm_token: 'asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231',
            }
            if (packageId) {
                authData.package_id = packageId
            }
        }
        setErrorMessage(null);
        v1.post(url, authData)
            .then(res => {
                if (res.data.user.roles[0].name === 'customer') {
                    authCtx.login(res.data.token, res.data.user.roles[0].name, res.data.user.roles[0].display_name[0], res.data.user.id, res.data.user.roles[0].name);
                } else {
                    authCtx.login(res.data.token, res.data.user.roles[0].id, res.data.user.name[0], res.data.user.id, res.data.user.roles[0].name);
                }
            })
            .catch(err => {
                if ( err.response.data.errors ) {
                    const errs = err.response.data.errors;
                    for (let key in errs) {
                        toast.error(errs[key][0])
                    }

                } else {
                    toast.error(err.response.data.message)
                }
            })
    }

    const termsModalCloseHandler = useCallback(() => {
        setTermsModalOpened(false)
    }, [])
    const termsModaOpenHandler = useCallback(() => {
        setTermsModalOpened(true)
    }, [])

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

    if (themeCtx.direction === 'rtl') {
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
            <Container maxWidth="xl">
                <Grid container spacing={3}  >
                    <Grid item xs={12} md={7} lg={7} >
                        <CustomizedCard>
                            <FormWrapper>
                                <LogoImg src={Logo} alt="logo" />
                                <FormHeading>
                                    {isLogin && loginFormText.heading}
                                    {!isLogin && subscribeFormText.heading}
                                </FormHeading>
                                {isLogin ? loginInputs() : subscribeInputs()}
                                {!isLogin && <TextButton variant='text' onClick={termsModaOpenHandler} >{t('terms & conditions')}</TextButton> }
                                {!isLogin && <Map assignCoords={assignCoords} marker={marker} /> }
                                {!isLogin && <RegisterMap /> }
                                {isLogin && (
                                    <FormLink>
                                        {loginFormText.passwordRestoreMessage}
                                        <span >
                                            {loginFormText.passwordMessageLink}
                                        </span>
                                    </FormLink>
                                )}
                                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                <CustomButton onClick={submitHandler} disabled={!authIsValid} >{isLogin ? loginFormText.button : subscribeFormText.button}</CustomButton>
                                {isLogin && (
                                    <FormLink>
                                        {loginFormText.formSwitchText}
                                        <span onClick={switchAuthModeHandler}>
                                            {loginFormText.formSwitchLink}
                                        </span>
                                    </FormLink>
                                )}
                                {isLogin && (
                                    <FormLink>
                                        {t('or subscribe as artist')}
                                        <span onClick={() => navigate('/register-artist')}>
                                            {t('subscribe')}
                                        </span>
                                    </FormLink>
                                )}
                                {!isLogin && (
                                    <FormLink>
                                        {subscribeFormText.formSwitchText}
                                        <span onClick={switchAuthModeHandler}>
                                            {subscribeFormText.formSwitchLink}
                                        </span>
                                    </FormLink>
                                )}
                            </FormWrapper>
                            { !isLogin && termsModalOpened && <Terms open={termsModalOpened} handleClose={termsModalCloseHandler} /> }
                        </CustomizedCard>
                    </Grid>
                    <Grid item xs={12} md={5} lg={5} >
                        <AuthImg>
                            <img src={AuthBgSrc} alt="auth Background" />
                        </AuthImg>
                    </Grid>
                </Grid>
            </Container>
        </AuthContainer>
    )

}
export default Auth;
