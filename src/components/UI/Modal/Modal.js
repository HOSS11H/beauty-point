import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ButtonText, ButtonConfirm } from '../Button/Button';
import { Grid } from '@mui/material';

const CustomContainer = styled(Grid)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    outline: none;
`

export const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        margin: auto;
        overflow: hidden;
        box-shadow: none;
        border-radius:20px;
        background-color: ${({ theme }) => theme.palette.background.default};
        margin-bottom:0;
    }
`
export const CardHeading = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: ${({ theme }) => `1px solid ${theme.palette.divider}`};
    h4 {
        font-size: 20px;
        line-height:1.5;
        text-transform: uppercase;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
    }
`
export const CardBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-direction: column;
`
export const CardContent = styled.div`
    width: 100%;
    max-height: 60vh;
    overflow-y: auto;
    padding: 20px;
    // Scroll //
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
        height: 7px;
        width: 8px;
        background-color: ${({ theme }) => theme.palette.divider};
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        margin-left: 2px;
        background: ${({ theme }) => theme.vars.primary};
        border-radius: 10px;
        cursor: pointer;
    }
`
export const CardActions = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px;
    button {
        margin-right: 20px;
        &:last-child {
            margin-right: 0;
        }
    }
`


export function CustomModal(props) {

    const { show, heading, confirmText, onConfirm, onClose } = props;

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
                <CustomContainer container>
                    <Grid item xs={12} sm={2} md={3} />
                    <Grid item xs={12} sm={8} md={6}>
                        <CustomCardMui>
                            <CardHeading>
                                <h4>{t(heading)}</h4>
                            </CardHeading>
                            <CardBody>
                                <CardContent>
                                    {props.children}
                                </CardContent>
                                <CardActions>
                                    <ButtonText variant='text' onClick={onClose}>{t('close')}</ButtonText>
                                    {confirmText && <ButtonConfirm variant='contained' onClick={onConfirm}>{t(confirmText)}</ButtonConfirm>}
                                </CardActions>
                            </CardBody>
                        </CustomCardMui>
                    </Grid>
                </CustomContainer>
            </Fade>
        </Modal>
    );
}
