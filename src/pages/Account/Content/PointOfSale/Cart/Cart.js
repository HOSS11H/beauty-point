import CustomCard from '../../../../../components/UI/Card/Card';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Grid } from '@mui/material';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SharedTableHead from './SharedTableHead/SharedTableHead';
import CartItem from './CartItem/CartItem';

const CustomerCard = styled.div`
    padding: 20px;
    border-radius: 8px;
    border: 1px solid;
    border-color: ${({ theme }) => theme.palette.divider};
`
const CustomerName = styled.h4`
    display: block;
    font-size: 16px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
`
const CustomerInfo = styled.ul`
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
            &.MuiSvgIcon-root  {
                margin:0;
                margin-right: 8px;
            }
        }
    }
`

const CustomMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 70px;
    flex-grow: 1;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid;
    border-color: ${({ theme }) => theme.palette.divider};
    p {
            font-size: 24px;
            line-height:1.5;
            text-transform: capitalize;
            font-weight: 500;
            color: ${({ theme }) => theme.palette.text.disabled};
        }
`

const customers = [
    { id: 0, name: 'ahmed', email: 'mail.com', phone: '0123456789' },
    { id: 1, name: 'ali', email: 'mail.com', phone: '0123456789' },
    { id: 2, name: 'mahmoud', email: 'mail.com', phone: '0123456789' },
]


const Cart = props => {

    const { cartData, removeFromCart, increaseItem } = props;

    const { t } = useTranslation()

    const [customer, setCustomer] = useState('');
    const [customerData, setCustomerData] = useState(null);


    const [dateTime, setDateTime] = useState(new Date());


    const handleDateChange = (newValue) => {
        setDateTime(newValue);
    };

    const handleCustomerChange = (event) => {
        const customerIndex = customers.findIndex(customer => customer.id === event.target.value);
        const updatedCustomerData = customers[customerIndex];
        setCustomer(event.target.value);
        setCustomerData(updatedCustomerData);
    };

    return (
        <CustomCard heading='Add To Cart' >
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <DesktopDatePicker
                                    label="Date desktop"
                                    inputFormat="MM/dd/yyyy"
                                    value={dateTime}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TimePicker
                                    label="Time"
                                    value={dateTime}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField sx={{ width: '100%' }}  {...params} />}
                                />
                            </Grid>
                        </Grid>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="item-customer">{t('Customer')}</InputLabel>
                        <Select
                            labelId="item-customer"
                            id="item-customer-select"
                            value={customer}
                            label="Customer"
                            onChange={handleCustomerChange}
                        >
                            {
                                customers.map(customer => {
                                    return <MenuItem key={customer.id} value={customer.id}>{customer.name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                {
                    customerData && (
                        <Grid item xs={12}>
                            <CustomerCard>
                                <CustomerName>{customerData.name}</CustomerName>
                                <CustomerInfo>
                                    <li><MailIcon sx={{ mr: 1 }} />{customerData.email}</li>
                                    <li><PhoneAndroidIcon sx={{ mr: 1 }} />{customerData.phone}</li>
                                </CustomerInfo>
                            </CustomerCard>
                        </Grid>
                    )
                }
                <Grid item xs={12}>
                    {cartData.services.length === 0 && (
                        <CustomMessage>
                            <p>{t('No Services')}</p>
                        </CustomMessage>
                    )}
                    {cartData.services.length > 0 && (
                        <TableContainer component={Paper} sx={{ my: 2 }}>
                            <Table aria-label="services table">
                                <SharedTableHead />
                                <TableBody>
                                    {cartData.services.map((row) => (
                                        <CartItem type='services' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {cartData.products.length === 0 && (
                        <CustomMessage>
                            <p>{t('No Products')}</p>
                        </CustomMessage>
                    )}
                    {cartData.products.length > 0 && (
                        <TableContainer component={Paper} sx={{ my: 2 }}>
                            <Table aria-label="products table">
                                <SharedTableHead />
                                <TableBody>
                                    {cartData.products.map((row) => (
                                        <CartItem type='products' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {cartData.deals.length === 0 && (
                        <CustomMessage>
                            <p>{t('No Deals')}</p>
                        </CustomMessage>
                    )}
                    {cartData.deals.length > 0 && (
                        <TableContainer component={Paper} sx={{ my: 2 }}>
                            <Table aria-label="deals table">
                                <SharedTableHead />
                                <TableBody>
                                    {cartData.deals.map((row) => (
                                        <CartItem type='deals' key={row.id} row={row} remove={removeFromCart} increase={increaseItem} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Grid>
            </Grid>
        </CustomCard>
    )
}

export default Cart;