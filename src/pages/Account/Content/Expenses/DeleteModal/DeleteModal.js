import { CustomModal } from '../../../../../components/UI/Modal/Modal';

import styled from 'styled-components';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTranslation } from 'react-i18next';

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    svg {
        width: 120px;
        height: 120px;
        color: ${({ theme }) => theme.vars.primary};
        margin-bottom: 20px;
    }
    h4 {
        font-size: 17px;
        line-height:1.5;
        text-transform: uppercase;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
        margin-bottom: 0;
    }
`

const DeleteModal = ( props ) => {

    const { show, heading, confirmText, onConfirm, onClose } = props;

    const { t } = useTranslation();

    return (
        <CustomModal show={show} heading={heading}  confirmText={confirmText} onConfirm={onConfirm} onClose={onClose} >
            <Content>
                <ErrorOutlineIcon />
                <h4>{t('You will not be able to recover the deleted record!')}</h4>
            </Content>
        </CustomModal>
    )
}

export default DeleteModal;