import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

const ServiceImg = styled.div`
    width: 100%;
    height: 200px;
    border-radius: 10px;
    flex-shrink: 0;
    cursor: pointer;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
`
const ServiceData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
`
const ServiceDataHeading = styled.p`
    font-size: 15px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
    margin-bottom: 5px;
`

const ServiceDataInfo = styled.p`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-bottom: 0px;
`
const ServiceDesc = styled.div`
    p {
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
    }
`



const EditModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, id, fetchedProducts } = props;

    const { t } = useTranslation();

    const serviceIndex = fetchedProducts.data.findIndex(service => service.id === id);

    const serviceData = fetchedProducts.data[serviceIndex];

    console.log(serviceData);
    
    let content;

    if (serviceData) {
        content = (
            <Grid container  spacing={2}>
                
            </Grid>
        )
    }

    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={onConfirm} onClose={onClose} >
            {content}
        </CustomModal>
    )
}

export default EditModal;