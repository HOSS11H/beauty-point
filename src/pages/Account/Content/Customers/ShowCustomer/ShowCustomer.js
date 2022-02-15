import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { CustomButton } from '../../../../../components/UI/Button/Button';
import { Fragment } from 'react';
import ShowBookings from './ShowBookings/ShowBookings';

const ClientDetails = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const ClientImg = styled(Avatar)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-bottom: 10px;
    cursor: pointer;
`
const ClientName = styled.a`
    display: block;
    font-size: 16px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
    cursor: pointer;
`

const BookingData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
`
const BookingDataHeading = styled.p`
    font-size: 15px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
    margin-bottom: 5px;
`


const BookingList = styled.ul`
    margin: 0;
    padding: 0;
    li {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 0px;
        }
        svg {
            width: 20px;
            height: 20px;
        }
    }
`


const BookingActions = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
`

const DeleteButton = styled(CustomButton)`
    &.MuiButton-root {
        width: auto;
        padding: 0 20px;
        height: 40px;
        flex-shrink: 0;
        background: ${({ theme }) => theme.palette.error.main};
        font-size: 16px;
    }
`

const ShowCustomer = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, customer, onDelete } = props;

    const { t } = useTranslation();

    let content;

    if (customer) {
        content = (
            <Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ClientDetails>
                            <ClientImg >
                                <PersonIcon />
                            </ClientImg>
                            <ClientName>{customer.name}</ClientName>
                        </ClientDetails>
                    </Grid>
                    {customer.email && (
                        <Grid item xs={12} md={6}>
                            <BookingData>
                                <BookingDataHeading>{t('email')}</BookingDataHeading>
                                <BookingList>
                                    <li><MailIcon sx={{ mr: 1 }} />{customer.email}</li>
                                </BookingList>
                            </BookingData>
                        </Grid>
                    )}
                    <Grid item xs={12} md={6}>
                        <BookingData>
                            <BookingDataHeading>{t('phone')}</BookingDataHeading>
                            <BookingList>
                                <li><PhoneAndroidIcon sx={{ mr: 1 }} />{customer.mobile}</li>
                            </BookingList>
                        </BookingData>
                    </Grid>
                    <Grid item xs={12}>
                        <BookingActions>
                            <DeleteButton onClick={(id) => onDelete(customer.id)} >{t('Delete')}</DeleteButton>
                        </BookingActions>
                    </Grid>
                </Grid>
                <ShowBookings id={customer.id} />
            </Fragment>
        )
    }

    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={onConfirm} onClose={onClose} >
            {content}
        </CustomModal>
    )
}

export default ShowCustomer;
