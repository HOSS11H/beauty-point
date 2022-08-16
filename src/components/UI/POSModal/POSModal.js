import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        margin: auto;
        overflow: hidden;
        box-shadow: none;
        background-color: ${({ theme }) => theme.palette.background.default};
        margin-bottom:0;
        padding: 20px;
        @media screen and ( min-width: ${({ theme }) =>  theme.breakpoints.values.md}px  ) {
            height: auto;
            width: 500px;
        }
    }
`
export const CardHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: ${({ theme }) => `1px solid ${theme.palette.divider}`};
    h4 {
        font-size: 17px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
        flex-grow: 1;
        text-align: center;
    }
    span {
        display: inline-block;
        width: 40px;
    }
`
export const CardBody = styled.div`
`
export const CardContent = styled.div`
    width: 100%;
    //max-height: 60vh;
    overflow-y: auto;
    padding-top: 10px;
    min-height: 0;
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


export function POSModal(props) {

    const { open, handleClose, heading, children } = props;

    const { t } = useTranslation();


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <CustomCardMui>
                    <CardHeading>
                        <span />
                        <h4>{t(heading)}</h4>
                        <IconButton onClick={handleClose} >
                            <CloseIcon />
                        </IconButton>
                    </CardHeading>
                    <CardBody>
                        <CardContent>
                            {children}
                        </CardContent>
                    </CardBody>
                </CustomCardMui>
            </Fade>
        </Modal>
    );
}
