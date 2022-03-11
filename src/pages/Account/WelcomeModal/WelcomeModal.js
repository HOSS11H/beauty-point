import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ButtonConfirm, ButtonText } from '../../../components/UI/Button/Button';

const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 70%;
        margin: auto;
        overflow: hidden;
        box-shadow: none;
        border-radius:20px;
        background-color: ${({ theme }) => theme.palette.background.default};
        margin-bottom: 0;
        border: 0;
        padding: 40px 25px;
        text-align: center;
        @media screen and(max-width: 899.98px) {
            width: 80%;
        }
        @media screen and(max-width: 599.98px) {
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

const WelcomeModal = props => {

    const { show, onClose } = props;

    const { t } = useTranslation();

    return (
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
                        <ButtonConfirm variant='text' onClick={onClose}>{t('go')}</ButtonConfirm>
                    </CardActions>
                </CustomCardMui>
            </Fade>
        </Modal>
    );
}
export default WelcomeModal;