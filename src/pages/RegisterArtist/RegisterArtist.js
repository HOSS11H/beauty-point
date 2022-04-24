import { Button, Card, Container, Grid } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react';
//import Map from './Auth/Map/Map';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { CustomButton } from '../../components/UI/Button/Button';
import useForm from '../../hooks/useForm';
import AuthBgSrc from '../../images/avatars/auth-bg.png';
import Logo from '../../images/logo/logo_mobile.png';
import AuthContext from '../../store/auth-context';
import ThemeContext from '../../store/theme-context';
import v1 from '../../utils/axios-instance-v1';
import { registerArtistForm } from '../../utils/formConfig';
import Map from '../Auth/Map/Map';
import Terms from '../Auth/Terms/Terms';


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


const RegisterArtist = props => {

    const authCtx = useContext(AuthContext);

    const themeCtx = useContext(ThemeContext)
    const { t } = useTranslation()

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const packageId = searchParams.get('package');

    const [isLogin, setIsLogin] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    const { isLoggedIn } = authCtx;

    const { renderFormInputs: subscribeInputs, isFormValid: isSubscribeDataValid, form: subscribeData } = useForm(registerArtistForm);

    const [marker, setMarker] = useState({})

    const [ termsModalOpened, setTermsModalOpened ] = useState(false)

    let authIsValid =  isSubscribeDataValid()

    useEffect(() => {
        isLoggedIn && navigate('/account/settings?welcome=true', { replace: true })
    }, [isLoggedIn, isLogin, navigate])

    const assignCoords = (lat, lng) => {
        setMarker({
            lat: lat,
            lng: lng,
            defaultAnimation: 2,
        })
    }
    const submitHandler = () => {
        let url = `/auth/sign-up-as-artist`;
        let authData = {
            name: subscribeData.name.value,
            email: subscribeData.email.value,
            password: subscribeData.password.value,
            business_name: subscribeData.businessName.value,
            mobile: subscribeData.phoneNum.value,
            contact: subscribeData.phoneNum.value,
            address: subscribeData.address.value,
            address_latitude: marker.lat,
            address_longitude: marker.lng,
            calling_code: '+91',
            fcm_token: 'asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231asdasd1231',
        }
        setErrorMessage(null);
        v1.post(url, authData)
            .then(res => {
                if (res.data.user.roles[0].name === 'customer') {
                    authCtx.login(res.data.token, res.data.user.roles[0].name, res.data.user.roles[0].display_name[0], res.data.user.id, res.data.user.roles[0].name);
                } else {
                    authCtx.login(res.data.token, res.data.user.roles[0].id, res.data.user.name[0], res.data.user.id, res.data.user.roles[0].name);
                }
                navigate('/account/settings?welcome=true', { replace: true })
            })
            .catch(err => {
                setErrorMessage('Something went wrong. Please try again.');
            })
    }

    const termsModalCloseHandler = useCallback(() => {
        setTermsModalOpened(false)
    }, [])
    const termsModaOpenHandler = useCallback(() => {
        setTermsModalOpened(true)
    }, [])

    let subscribeFormText = {
        heading: 'be a service provider',
        button: 'subscribe',
        formSwitchText: `have an account ?`,
        formSwitchLink: `login`,
    }

    if (themeCtx.direction === 'rtl') {
        subscribeFormText = {
            heading: 'الاشتراك كارتست ',
            button: 'اشتراك',
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
                                    {!isLogin && subscribeFormText.heading}
                                </FormHeading>
                                { subscribeInputs()}
                                {!isLogin && <TextButton variant='text' onClick={termsModaOpenHandler} >{t('terms & conditions')}</TextButton> }
                                {!isLogin && <Map assignCoords={assignCoords} marker={marker} /> }
                                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                <CustomButton onClick={submitHandler} disabled={!authIsValid} >{subscribeFormText.button}</CustomButton>
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
export default RegisterArtist;
