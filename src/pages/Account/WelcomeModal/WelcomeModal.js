import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ButtonConfirm } from '../../../components/UI/Button/Button';
import Tour from '../Tour/Tour';
import { Fragment, useState } from 'react';
import googleStoreLogo from '../../../images/logo/google-play.png';
import appStoreLogo from '../../../images/logo/app-store.png';

const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 70%;
        margin: auto;
        overflow: auto;
        max-height: 90vh;
        box-shadow: none;
        border-radius:20px;
        background-color: ${({ theme }) => theme.palette.background.default};
        margin-bottom: 0;
        border: 0;
        padding: 40px 25px;
        text-align: center;
        @media screen and (max-width: 899.98px) {
            width: 80%;
        }
        @media screen and (max-width: 599.98px) {
            width: 90%;
        }
    }
`
const CardHeading = styled.h4`
    margin-bottom: 30px;
    font-size: 28px;
    line-height:1.5;
    text-transform: uppercase;
    font-weight: 600;
    color: ${({ theme }) => theme.vars.primary};
`
const CardBody = styled.p`
    font-size: 20px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.text.primary};
    `

const CardActions = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const DownloadApp = styled.div`
    margin-top: 40px;
    h3 {
        font-size: 20px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 600;
        margin-bottom: 30px;
        color: ${({ theme }) => theme.vars.primary};
    }
    div {
        display    : flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
        @media screen and (max-width: 899.98px) {
            justify-content: center;
        }
        @media screen and (max-width: 599.98px) {
            flex-direction: column;
        }
        a {
            background-color: #fff;
            display         : flex;
            align-items     : center;
            justify-content : center;
            border-radius   : 10px;
            font-size       : 19px;
            font-weight     : 400;
            text-transform  : capitalize;
            color           : #fff;
            text-decoration : none;
            height          : 70px;
            width           : 207px;
            transition      : all 0.3s ease;
    
            &:first-child {
                margin-right: 17px;
    
                @media screen and (max-width: 767.98px) {
                    margin-bottom: 20px;
                    margin-right : 0;
                }
            }
            img {
                width     : 90%;
                height    : 100%;
                object-fit: contain;
            }
        }
    }
`

const WelcomeModal = props => {

    const { show, onClose } = props;

    const { t } = useTranslation();

    const [ startTour, setStartTour ] = useState(false);

    const clickHandler = () => {
        setStartTour(true);
        onClose();
    }

    return (
        <Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={show}
                onClose={onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={show}>
                    <CustomCardMui>
                        <CardHeading>
                            {t('welcome to beauty point family')}
                        </CardHeading>
                        <CardBody>
                            {t('as a first step, we need you to add your details and settings, this will help us to serve you better')}
                        </CardBody>
                        <CardActions>
                            <ButtonConfirm variant='text' onClick={clickHandler}>{t('go on tour')}</ButtonConfirm>
                        </CardActions>
                        <DownloadApp>
                            <h3>{t('Download The App')}</h3>
                            <div>
                                <a href='https://play.google.com/store/apps/details?id=com.conpoint.beautypointuser' >
                                    <img src={googleStoreLogo} alt='logo' />
                                </a>
                                <a href='https://apps.apple.com/us/app/beauty-point-%D8%A8%D9%8A%D9%88%D8%AA%D9%8A-%D8%A8%D9%88%D9%8A%D9%86%D8%AA/id1588135043' >
                                    <img src={appStoreLogo} alt='logo' />
                                </a>
                            </div>
                        </DownloadApp>
                    </CustomCardMui>
                </Fade>
            </Modal>
            {startTour && <Tour />}
        </Fragment>
    );
}
export default WelcomeModal;