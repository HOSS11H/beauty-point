import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import MoneyIcon from '@mui/icons-material/Money';
import CloseIcon from '@mui/icons-material/Close';
import { formatCurrency } from '../../../../../shared/utility';
import { CustomButton } from '../../../../../components/UI/Button/Button';
import PrintIcon from '@mui/icons-material/Print';
import Invoice from './Invoice/Invoice';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import v2 from '../../../../../utils/axios-instance';
import { useCallback } from 'react';
import Loader from '../../../../../components/UI/Loader/Loader';

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

const BookingDataInfo = styled.p`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-bottom: 0px;
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
const ItemInfo = styled.div`
    display: flex;
    align-items: center;
`
const ItemType = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    padding: 0 10px;
    border-radius: 6px;
    font-size: 12px;
    text-transform: capitalize;
    font-weight: 500;
    margin-left: 10px;
    color: ${({ theme }) => theme.palette.common.white};
    &.service {
        background-color: ${({ theme }) => theme.palette.info.main};
    }
    &.product {
        background-color: ${({ theme }) => theme.palette.secondary.main};
    }
    &.deal {
        background-color: ${({ theme }) => theme.palette.success.main};
    }
`
const ServiceEmployee = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    padding: 0 10px;
    border-radius: 6px;
    font-size: 12px;
    text-transform: capitalize;
    font-weight: 500;
    margin-left: 10px;
    color: ${({ theme }) => theme.palette.common.white};
    background-color: ${({ theme }) => theme.palette.warning.dark};
`
const BookingActions = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`
const ActionButton = styled(CustomButton)`
    &.MuiButton-root {
        margin-right: 20px;
        margin-bottom: 15px;
        width: auto;
        padding: 0 10px;
        height: 30px;
        flex-shrink: 0;
        background: ${({ theme }) => theme.palette.success.main};
        font-size: 14px;
        &:last-child {
            margin-bottom: 15px;
        }
        svg {
            width: 14px;
            height: 14px;
            margin-right: 10px;
        }
    }
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


const ViewModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, id, onDelete, userData } = props;

    const { t } = useTranslation();

    const [ bookingData, setBookingData ] = useState(null);
    const [loading, setLoading] = useState(false);

    const [qrCode, setQrCode] = useState(null);

    const fetchData = useCallback(() => {
        setLoading(true);
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const bookingDataEndpoint = `${v2.defaults.baseURL}/vendors/bookings/${id}?include[]=user&include[]=items`;
        const qrCodeEndpoint = `${v2.defaults.baseURL}/vendors/bookings/${id}/qr`;

        const getUserData = axios.get(bookingDataEndpoint, headers);
        const getQrCode = axios.get(qrCodeEndpoint, headers);

        axios.all([getUserData, getQrCode])
            .then(axios.spread((...responses) => {
                setBookingData(responses[0].data);
                setQrCode(responses[1].data.data);
                setLoading(false);
            }))
            .catch(error => {
                setLoading(false);
            });
    }, [id])
    
    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [fetchData, id]);

    const invoiceRef = useRef();

    const printBookingHandler = useReactToPrint({
        content: () => invoiceRef.current,
    });

    let content;

    if (loading) {
        content = (
            <Loader  height='50vh' />
        )
    }

    if (bookingData) {
        content = (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ClientDetails>
                        <ClientImg >
                            <PersonIcon />
                        </ClientImg>
                        <ClientName>{bookingData.user.name}</ClientName>
                    </ClientDetails>
                </Grid>
                {bookingData.user.email && (
                    <Grid item xs={12} md={6}>
                        <BookingData>
                            <BookingDataHeading>{t('email')}</BookingDataHeading>
                            <BookingList>
                                <li><MailIcon sx={{ mr: 1 }} />{bookingData.user.email}</li>
                            </BookingList>
                        </BookingData>
                    </Grid>
                )}
                <Grid item xs={12} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('phone')}</BookingDataHeading>
                        <BookingList>
                            <li><PhoneAndroidIcon sx={{ mr: 1 }} />{bookingData.user.mobile}</li>
                        </BookingList>
                    </BookingData>
                </Grid>
                <Grid item xs={12} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('booking date')}</BookingDataHeading>
                        <BookingList>
                            <li><EventNoteIcon sx={{ mr: 1 }} />{bookingData.date}</li>
                        </BookingList>
                    </BookingData>
                </Grid>
                <Grid item xs={12} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('booking time')}</BookingDataHeading>
                        <BookingList>
                            <li><WatchLaterIcon sx={{ mr: 1 }} />{bookingData.time}</li>
                        </BookingList>
                    </BookingData>
                </Grid>
                {
                    (bookingData.items.length > 0) && (
                        <Grid item xs={12}>
                            <BookingData>
                                <BookingDataHeading>{t('booking items')}</BookingDataHeading>
                                <TableContainer component={Paper} sx={{ my: 2 }}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">{t('item')}</TableCell>
                                                <TableCell align="center">{t('employee')}</TableCell>
                                                <TableCell align="center">{t('price')}</TableCell>
                                                <TableCell align="center">{t('quantity')}</TableCell>
                                                <TableCell align="center">{t('total')}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {bookingData.items.map((item) => (
                                                <TableRow
                                                    key={item.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        <ItemInfo>
                                                            {item.item.name}
                                                            <ItemType className={item.item.type}>{t(item.item.type)}</ItemType>
                                                        </ItemInfo>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {
                                                            item.employee && (
                                                                    <ServiceEmployee>
                                                                        <span>{item.employee.name}</span>
                                                                    </ServiceEmployee>
                                                            )
                                                        }
                                                    </TableCell>
                                                    <TableCell align="center">{item.price}</TableCell>
                                                    <TableCell align="center">{item.quantity}</TableCell>
                                                    <TableCell align="center">{item.amount}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </BookingData>
                        </Grid>
                    )
                }
                <Grid item xs={12} sm={6} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('payment method')}</BookingDataHeading>
                        <BookingList>
                            <li><MoneyIcon sx={{ mr: 1 }} />{t(bookingData.payment_gateway)}</li>
                        </BookingList>
                    </BookingData>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('booking status')}</BookingDataHeading>
                        <BookingList>
                            <li>{t(bookingData.status)}</li>
                        </BookingList>
                    </BookingData>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('payment status')}</BookingDataHeading>
                        <BookingList>
                            <li>
                                {bookingData.payment_status === 'completed' && <CheckCircleIcon sx={{ mr: 1, color: '#568d00' }} /> } 
                                {bookingData.payment_status === 'pending' && <CloseIcon sx={{ mr: 1, color: 'rgb(187 163 46)' }} />}
                                {bookingData.payment_status === 'refunded' && <CloseIcon sx={{ mr: 1, color: '#f00' }} />}
                                {t(bookingData.payment_status)}
                            </li>
                        </BookingList>
                    </BookingData>
                </Grid>
                {bookingData.remaining_amount > 0 && (
                    <Grid item xs={12} sm={6} md={6}>
                        <BookingData>
                            <BookingDataHeading>{t('remaining amount')}</BookingDataHeading>
                            <BookingDataInfo>{formatCurrency(bookingData.remaining_amount)}</BookingDataInfo>
                        </BookingData>
                    </Grid>
                )}
                <Grid item xs={12} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('taxes ( 15% )')}</BookingDataHeading>
                        <BookingDataInfo>{formatCurrency(bookingData.vat)}</BookingDataInfo>
                    </BookingData>
                </Grid>
                <Grid item xs={12} md={6}>
                    <BookingData>
                        <BookingDataHeading>{t('total')}</BookingDataHeading>
                        <BookingDataInfo>{formatCurrency(bookingData.price)}</BookingDataInfo>
                    </BookingData>
                </Grid>
                <Grid item xs={12}>
                    <BookingActions>
                        <ActionButton onClick={() => qrCode && printBookingHandler()}  ><PrintIcon />{t('print')}</ActionButton>
                        {bookingData.payment_status === 'refunded' && <ActionButton onClick={() => qrCode && printBookingHandler()}  ><PrintIcon />{t('print refunded invoice')}</ActionButton> }
                    </BookingActions>
                </Grid>
                {qrCode && <Invoice userData={userData} ref={invoiceRef} bookingData={bookingData} qrCode={qrCode} />}
                <Grid item xs={12}>
                    {/* <BookingActions>
                        <DeleteButton onClick={(id) => onDelete(bookingData.id)} >{t('Delete')}</DeleteButton>
                    </BookingActions> */}
                </Grid>
            </Grid>
        )
    }

    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={onConfirm} onClose={onClose} >
            {content}
        </CustomModal>
    )
}

export default ViewModal;
