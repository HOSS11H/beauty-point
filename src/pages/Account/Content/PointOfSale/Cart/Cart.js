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
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { TableData } from '../../../../../components/UI/Dashboard/Table/Table';
import Actions from '../../../../../components/UI/Dashboard/Actions/Actions';

import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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

const customers = [
    { id: 0, name: 'ahmed', email: 'mail.com', phone: '0123456789' },
    { id: 1, name: 'ali', email: 'mail.com', phone: '0123456789' },
    { id: 2, name: 'mahmoud', email: 'mail.com', phone: '0123456789' },
]


const Cart = props => {

    const { t } = useTranslation()

    const [customer, setCustomer] = useState('');
    const [ customerData , setCustomerData ] = useState(null);


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
                    <TableContainer component={Paper} sx={{ my: 2 }}>
                        <Table aria-label="services table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" >services</TableCell>
                                    <TableCell align="right">price</TableCell>
                                    <TableCell align="right">quantity</TableCell>
                                    <TableCell align="right">price including taxes</TableCell>
                                    <TableCell align="right">action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <TableData>{row.name}</TableData>
                                        </TableCell>
                                        <TableCell align="right">
                                            <TableData>{row.calories}</TableData>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <TableData>{row.name}</TableData>
                                        </TableCell>
                                        <TableCell align="right">
                                            <TableData>{row.calories}</TableData>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <TableData>{row.name}</TableData>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Actions remove
                                                removeHandler={deleteModalOpenHandler.bind(null, row.id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ my: 2 }}>
                        <Table aria-label="products table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" >products</TableCell>
                                    <TableCell align="right">price</TableCell>
                                    <TableCell align="right">quantity</TableCell>
                                    <TableCell align="right">price including taxes</TableCell>
                                    <TableCell align="right">action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <TableData>{row.name}</TableData>
                                        </TableCell>
                                        <TableCell align="right">
                                            <TableData>{row.calories}</TableData>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <TableData>{row.name}</TableData>
                                        </TableCell>
                                        <TableCell align="right">
                                            <TableData>{row.calories}</TableData>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <TableData>{row.name}</TableData>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Actions remove
                                                removeHandler={deleteModalOpenHandler.bind(null, row.id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ my: 2 }}>
                        <Table aria-label="deals table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" >deals</TableCell>
                                    <TableCell align="right">price</TableCell>
                                    <TableCell align="right">quantity</TableCell>
                                    <TableCell align="right">price including taxes</TableCell>
                                    <TableCell align="right">action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <TableData>{row.name}</TableData>
                                        </TableCell>
                                        <TableCell align="right">
                                            <TableData>{row.calories}</TableData>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <TableData>{row.name}</TableData>
                                        </TableCell>
                                        <TableCell align="right">
                                            <TableData>{row.calories}</TableData>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <TableData>{row.name}</TableData>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Actions remove
                                                removeHandler={deleteModalOpenHandler.bind(null, row.id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </CustomCard>
    )
}

export default Cart;