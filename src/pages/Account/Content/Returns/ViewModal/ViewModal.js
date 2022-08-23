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
import { useReactToPrint } from 'react-to-print';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import v2 from '../../../../../utils/axios-instance';
import { useCallback } from 'react';
import Loader from '../../../../../components/UI/Loader/Loader';
import AddPaymentModal from './AddPaymentModal/AddPaymentModal';
import moment from 'moment';
import { format } from 'date-fns';
import Invoice from '../../../../../components/Invoice/Invoice';
import AuthContext from '../../../../../store/auth-context';

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

const ReturnData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
`
const ReturnDataHeading = styled.p`
    font-size: 15px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
    margin-bottom: 5px;
`

const ReturnDataInfo = styled.p`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-bottom: 0px;
`
const ReturnList = styled.ul`
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
const ReturnActions = styled.div`
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
/* const DeleteButton = styled(CustomButton)`
    &.MuiButton-root {
        width: auto;
        padding: 0 20px;
        height: 40px;
        flex-shrink: 0;
        background: ${({ theme }) => theme.palette.error.main};
        font-size: 16px;
    }
` */


const ViewModal = (props) => {

    const { show, heading, onClose, id, userData } = props;

    const { t } = useTranslation();

    const authCtx = useContext(AuthContext)
    const { roleName } = authCtx;

    const [loading, setLoading] = useState(false);
    const [retrunData, setReturnData] = useState(null);

    const [qrCode, setQrCode] = useState(null);

    const [paymentModalOpened, setPaymentModalOpened] = useState(false);


    const fetchData = useCallback(() => {
        setLoading(true);
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const retrunDataEndpoint = `${v2.defaults.baseURL}/vendors/returns/${id}?include[]=user&include[]=items&include[]=payments`;
        const qrCodeEndpoint = `${v2.defaults.baseURL}/vendors/returns/${id}/qr`;

        const getReturnData = axios.get(retrunDataEndpoint, headers);
        const getQrCode = axios.get(qrCodeEndpoint, headers);

        axios.all([getReturnData, getQrCode])
            .then(axios.spread((...responses) => {
                setReturnData(responses[0].data);
                setQrCode(responses[1].data.data);
                setLoading(false);
            }))
            .catch(error => {
                setLoading(false);
            });
    }, [ id])

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [fetchData, id]);

    const invoiceRef = useRef();

    const printReturnHandler = useReactToPrint({
        content: () => invoiceRef.current,
    });

    const handlePaymentModalOpen = useCallback(() => {
        setPaymentModalOpened(true);
    }, [])
    const handlePaymentModalClose = useCallback(() => {
        setPaymentModalOpened(false);
    }, [])
    const handlePaymentModalConfirm = useCallback(() => {
        setPaymentModalOpened(false);
        fetchData();
    }, [fetchData])


    let content;
    let viewedItems;

    if (loading) {
        content = (
            <Loader height='50vh' />
        )
    } else if ( !loading && retrunData) {
        viewedItems = (
            <Grid item xs={12}>
                <ReturnData>
                    <ReturnDataHeading>{t('returned items')}</ReturnDataHeading>
                    <TableContainer component={Paper} sx={{ my: 2 }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">{t('item')}</TableCell>
                                    <TableCell align="center">{t('price')}</TableCell>
                                    <TableCell align="center">{t('quantity')}</TableCell>
                                    <TableCell align="center">{t('total')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {retrunData.items.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <ItemInfo>
                                                {item.name}
                                                <ItemType className={item.type}>{t(item.type)}</ItemType>
                                            </ItemInfo>
                                        </TableCell>
                                        <TableCell align="center">{item.price}</TableCell>
                                        <TableCell align="center">{item.quantity}</TableCell>
                                        <TableCell align="center">{formatCurrency(item.amount)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ReturnData>
            </Grid>
        )
    }

    const editReturnDisabled = (roleName === 'artist' ||  roleName === 'customer')

    if (retrunData && !loading) {
        let name = retrunData.user.name
        let email = retrunData.user.email
        let mobile = retrunData.user.mobile

        content = (
            <Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ClientDetails>
                            <ClientImg >
                                <PersonIcon />
                            </ClientImg>
                            <ClientName>{name}</ClientName>
                        </ClientDetails>
                    </Grid>
                    {email && (
                        <Grid item xs={12} md={6}>
                            <ReturnData>
                                <ReturnDataHeading>{t('email')}</ReturnDataHeading>
                                <ReturnList>
                                    <li><MailIcon sx={{ mr: 1 }} />{email}</li>
                                </ReturnList>
                            </ReturnData>
                        </Grid>
                    )}
                    <Grid item xs={12} md={6}>
                        <ReturnData>
                            <ReturnDataHeading>{t('phone')}</ReturnDataHeading>
                            <ReturnList>
                                <li><PhoneAndroidIcon sx={{ mr: 1 }} />{mobile}</li>
                            </ReturnList>
                        </ReturnData>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ReturnData>
                            <ReturnDataHeading>{t('return date')}</ReturnDataHeading>
                            <ReturnList>
                                <li><EventNoteIcon sx={{ mr: 1 }} />{format(new Date(retrunData.date_time), 'Y-MM-dd')}</li>
                            </ReturnList>
                        </ReturnData>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ReturnData>
                            <ReturnDataHeading>{t('return time')}</ReturnDataHeading>
                            <ReturnList>
                                <li><WatchLaterIcon sx={{ mr: 1 }} />{moment.utc(retrunData.date_time).format('hh:mm A')}</li>
                            </ReturnList>
                        </ReturnData>
                    </Grid>
                    {viewedItems}
                    {editReturnDisabled ? null : (
                        <Fragment>
                            <Grid item xs={12} sm={6} md={6}>
                                <ReturnData>
                                    <ReturnDataHeading>{t('payment status')}</ReturnDataHeading>
                                    <ReturnList>
                                        <li>
                                            {retrunData.payment_status === 'completed' && <CheckCircleIcon sx={{ mr: 1, color: '#568d00' }} />}
                                            {retrunData.payment_status === 'pending' && <CloseIcon sx={{ mr: 1, color: 'rgb(187 163 46)' }} />}
                                            {t(retrunData.payment_status)}
                                        </li>
                                    </ReturnList>
                                </ReturnData>
                            </Grid>
                            {retrunData.remaining_amount > 0 && (
                                <Grid item xs={12} sm={6} md={6}>
                                    <ReturnData>
                                        <ReturnDataHeading>{t('remaining amount')}</ReturnDataHeading>
                                        <ReturnDataInfo>{formatCurrency(retrunData.remaining_amount)}</ReturnDataInfo>
                                    </ReturnData>
                                </Grid>
                            )}
                            <Grid item xs={12} md={6}>
                                <ReturnData>
                                    <ReturnDataHeading>{t('taxes ( 15% )')}</ReturnDataHeading>
                                    <ReturnDataInfo>{formatCurrency(retrunData.vat)}</ReturnDataInfo>
                                </ReturnData>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ReturnData>
                                    <ReturnDataHeading>{t('total')}</ReturnDataHeading>
                                    <ReturnDataInfo>{formatCurrency(retrunData.total)}</ReturnDataInfo>
                                </ReturnData>
                            </Grid>
                        </Fragment>
                    )}
                    {retrunData.payment_status === 'pending' && (
                        <Grid item xs={12}>
                            {editReturnDisabled ? null : (
                                <ReturnActions>
                                    <ActionButton onClick={handlePaymentModalOpen}  ><MoneyIcon />{t('add payment')}</ActionButton>
                                </ReturnActions>
                            ) }
                        </Grid>
                    )}
                    {editReturnDisabled ? null : (
                        <Fragment>
                            <Grid item xs={12}>
                                <TableContainer component={Paper} sx={{ my: 2 }}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">{t('date')}</TableCell>
                                                <TableCell align="center">{t('amount')}</TableCell>
                                                <TableCell align="center">{t('payment method')}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {retrunData.payments.map((item) => (
                                                <TableRow
                                                    key={item.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        <ItemInfo>
                                                            {moment(item.paid_on).format('DD/MM/YYYY')}
                                                        </ItemInfo>
                                                    </TableCell>
                                                    <TableCell align="center">{formatCurrency(item.amount)}</TableCell>
                                                    <TableCell align="center">{t(item.gateway)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12}>
                                <ReturnActions>
                                    <ActionButton onClick={printReturnHandler}  ><PrintIcon />{t('print')}</ActionButton>
                                </ReturnActions>
                            </Grid>
                        </Fragment>
                    )}
                    {qrCode && <Invoice userData={userData} ref={invoiceRef} data={retrunData} qrCode={qrCode} refunded />}
                </Grid>
                <AddPaymentModal show={paymentModalOpened} id={id}
                    remainingAmount={retrunData.remaining_amount}
                    onClose={handlePaymentModalClose} onConfirm={handlePaymentModalConfirm}
                    heading='add new payment' confirmText='add' />
            </Fragment>
        )
    }

    return (
        <CustomModal show={show} heading={heading} onClose={onClose} >
            {content}
        </CustomModal>
    )
}

export default ViewModal;