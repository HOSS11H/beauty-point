import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, Card, FormControl, IconButton, MenuItem, Select, TextField, useMediaQuery } from "@mui/material";
import moment from 'moment';
import { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import styled, { css } from "styled-components";
import Loader from "../../../../../../components/UI/Loader/Loader";
import { formatCurrency } from "../../../../../../shared/utility";
import ThemeContext from '../../../../../../store/theme-context';
import axios from '../../../../../../utils/axios-instance';
import v1 from '../../../../../../utils/axios-instance-v1';
import CartItem from "./CartItem/CartItem";
import ChooseCustomer from "./ChooseCustomer/ChooseCustomer";

const Wrapper = styled(Card)`
    &.MuiPaper-root {
        padding: 8px;
        @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md}px ) {
            position: fixed;
            top: 0;
            right: 0;
            left:0;
            botom: 0;
            height: 100vh;
            z-index: ${({ theme }) => theme.zIndex.modal - 2};
            opacity: 0;
            visibility: hidden;
            transform: translateY(-100%);
            transition: 0.3s ease-in-out;
            ${({ $show }) => $show && css`
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            ` }
        }
    }
`

const ItemsWrapper = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
    height: calc(100vh - 488px);
    max-height: calc(100vh - 488px);
    padding-right: 10px;
    overflow-y: auto;
    min-height: 0;
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md}px ) {
        height: calc(100vh - 360px);
        max-height: calc(100vh - 360px);
    }
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

const CartInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content:space-between;
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
    padding-bottom: 5px;
    &:not(:first-child) {
        padding-top: 5px;
    }
    &:last-child {
        border-bottom: 0;
    }
    span {
        font-weight: 700;
    }
`
const rowsPerPage = 20;

const Cart = props => {

    const themeCtx = useContext(ThemeContext)

    const isTablet = useMediaQuery(themeCtx.theme.breakpoints.down('md'), { noSsr: true });

    const { items, bookingData, dateTime, changeDateTime, changeEmployee,status, changeStatus,
        resetCartItems, resetBooking, showCart, hideCart, resetStatus } = props;

    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [hasVat, setHasVat] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0)

    const [totalTaxes, setTotalTaxes] = useState(0)

    const [employees, setEmployees] = useState([])
    const [loadingEmployees, setLoadingEmployees] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(false)

    const [ submitting, setSubmitting ] = useState(false)

    const ovserver = useRef()

    const lastElementRef = useCallback((node) => {
        if (loadingEmployees) return;
        if (ovserver.current) ovserver.current.disconnect()
        ovserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !lastPage) {
                setPage(_page => _page + 1)
            }
        })
        if (node) ovserver.current.observe(node)
    }, [lastPage, loadingEmployees])

    const fetchEmployees = useCallback((searchParams) => {
        const notEmptySearchParams = {};
        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        setLoadingEmployees(true)
        axios.get(`/vendors/employees`, {
            params: { ...notEmptySearchParams },
        }).then(response => {
            setEmployees(currentSeats => {
                return [...currentSeats, ...response.data.data]
            })
            if (response.data.meta.last_page === page) {
                setLastPage(true)
            }
            setLoadingEmployees(false)
        })
            .catch(err => {
                toast.error(t('Error Getting Employees'))
                setLoadingEmployees(false)
            })
    }, [page, t])

    useEffect(() => {
        const params = {
            page: page,
            per_page: rowsPerPage,
        }
        fetchEmployees(params)
    }, [fetchEmployees, page])

    useEffect(() => {
        let total = 0;
        for (let section in items) {
            for (let item of items[section]) {
                total += item.price * item.quantity;
            }
        }

        setTotalTaxes((total - (total / 1.15)).toFixed(2))
        setTotalPrice(total.toFixed(2));
    }, [items])


    const fetchVatInfos = useCallback(() => {
        setLoading(true)
        v1.get(`/vendors/settings/company`)
            .then(response => {
                setLoading(false);
                setHasVat(response.data.has_vat);
            })
            .catch(err => {
                setLoading(false);
                if (err.response.data.errors) {
                    const errs = err.response.data.errors;
                    for (let key in errs) {
                        toast.error(errs[key][0])
                    }
                } else {
                    toast.error(err.response.data.message)
                }
            })
    }, [])

    useEffect(() => {
        fetchVatInfos()
    }, [fetchVatInfos])

    const formatedItems = useMemo(() => {
        let returnedItems = [];
        Object.keys(items).forEach(item => {
            returnedItems.push(...items[item])
        })
        return returnedItems
    }, [items])

    const resetCart = () => {
        resetCartItems()
        resetBooking()
        resetStatus()
    }

    const bookOrderHandler = () => {
        console.log(items)
        let flattenedItems = [...items.services, ...items.deals, ...items.products]
        let formattedItems = []
        flattenedItems.forEach( item => {
            return formattedItems.push( { item_id: item.id , employee_id: item.employee_id || null  } )
        } )
        const data = {
            items: formattedItems,
            dateTime: moment(dateTime).format('YYYY-MM-DD hh:mm A'),
            status: bookingData.status,
        }
        setSubmitting(true);
        axios.put(`/vendors/bookings/${bookingData.id}`, data)
            .then(response => {
                setSubmitting(false);
                resetCart()
                toast.success(t('Your Order has been updated successfully'))
            })
            .catch(err => {
                setSubmitting(false);
                const errs = err.response.data ? err.response.data.errors : { message: [err.response.data.message] };
                for (let key in errs) {
                    toast.error(errs[key][0], {
                        position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                        closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                    });
                }
            })
    }

    if (loading) {
        return <Loader height='75vh' />
    }

    return (
        <Fragment>
            <Wrapper $show={showCart} >
                {isTablet && (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '40px', mb: 1 }}>
                        <IconButton onClick={hideCart} >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                )}
                <ChooseCustomer customerData={bookingData?.user} />
                <Box sx={{ mt: '10px' }} >
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DateTimePicker
                            label={t("Booking Date & time")}
                            inputFormat="DD-MM-YYYY hh:mm a"
                            value={dateTime}
                            onChange={changeDateTime}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <ItemsWrapper>
                    {formatedItems.map((item, index) => {
                        return (
                            <CartItem key={index} item={item}
                                type={item.type} changeEmployee={changeEmployee}
                                employees={employees} lastElementRef={lastElementRef} />
                        )
                    })}
                </ItemsWrapper>
                <div>
                    { status !== '' && (
                        <CartInfoWrapper>
                            <span>{t('Status')}</span>
                            <FormControl variant="standard" sx={{ minWidth: 120 }}>
                                <Select id="booking-status" value={status} onChange={changeStatus} inputProps={{ 'aria-label': 'Without label' }} label={t('Booking Status')} >
                                    <MenuItem value='approved'>{t('approved')}</MenuItem>
                                    <MenuItem value='completed'>{t('completed')}</MenuItem>
                                    <MenuItem value='canceled'>{t('canceled')}</MenuItem>
                                    <MenuItem value='in progress'>{t('in progress')}</MenuItem>
                                    <MenuItem value='pending'>{t('pending')}</MenuItem>
                                </Select>
                            </FormControl>
                        </CartInfoWrapper>
                    ) }
                    {hasVat && (
                        <CartInfoWrapper>
                            <span>{t('total taxes')}</span>
                            <span>{formatCurrency(totalTaxes)}</span>
                        </CartInfoWrapper>
                    )}
                    <CartInfoWrapper>
                        <span>{t('amount')}</span>
                        <span>{formatCurrency(totalPrice)}</span>
                    </CartInfoWrapper>
                </div>
                <LoadingButton
                    disabled={!bookingData} variant='contained'
                    onClick={bookOrderHandler}
                    loading={submitting}
                    color='secondary' sx={{ width: '100%', mt: 1 }} >{t('Edit')}</LoadingButton>
            </Wrapper>
        </Fragment>
    )
}
export default Cart;