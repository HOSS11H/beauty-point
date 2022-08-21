import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Button, Card, FormControl, IconButton, MenuItem, Select, TextField, useMediaQuery } from "@mui/material";
import { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import styled, {css} from "styled-components";
import Loader from "../../../../../../components/UI/Loader/Loader";
import { formatCurrency } from "../../../../../../shared/utility";
import axios from '../../../../../../utils/axios-instance';
import v1 from '../../../../../../utils/axios-instance-v1';
import CartItem from "./CartItem/CartItem";
import ChooseCustomer from "./ChooseCustomer/ChooseCustomer";
import PaymentModal from "./PaymentModal/PaymentModal";
import DateAdapter from '@mui/lab/AdapterMoment';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CloseIcon from '@mui/icons-material/Close';
import ThemeContext from '../../../../../../store/theme-context';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SavedOrders from './SavedOrders/SavedOrders';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const Wrapper = styled(Card)`
    &.MuiPaper-root {
        padding: 8px;
        @media screen and (max-width: ${ ({theme}) => theme.breakpoints.values.md }px ) {
            position: fixed;
            top: 0;
            right: 0;
            left:0;
            botom: 0;
            height: 100vh;
            z-index: ${ ({ theme }) => theme.zIndex.modal - 2 };
            opacity: 0;
            visibility: hidden;
            transform: translateY(-100%);
            transition: 0.3s ease-in-out;
            ${ ( { $show } ) => $show && css`
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
    height: calc(100vh - 576px);
    max-height: calc(100vh - 576px);
    padding-right: 10px;
    overflow-y: auto;
    min-height: 0;
    @media screen and (max-width: ${ ({theme}) => theme.breakpoints.values.md }px ) {
        height: calc(100vh - 435px);
        max-height: calc(100vh - 435px);
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
const CartActions = styled.div`
    margin-top: 10px;
    display: flex;
    align-items:center;
    justify-content:space-between;
    gap: 10px;
    & .MuiButton-root {
        flex-basis: 30%;
    }
`
const rowsPerPage = 20;

const Cart = props => {

    const themeCtx = useContext(ThemeContext)

    const isTablet = useMediaQuery(themeCtx.theme.breakpoints.down('md'), { noSsr: true });

    const { items, removeItem, increaseItem, decreaseItem, changePrice, changeEmployee, resetCartItems,assignCartItems, showCart, hideCart } = props;

    const initialStoredItems = JSON.parse(localStorage.getItem("savedOrders")) || [];

    const [ storedItems, setStoredItems ] = useState(initialStoredItems)

    const { t } = useTranslation();

    const defaultCustomer = useMemo(() => {
        return {
            id: '',
            name: t('passing customer'),
        }
    }, [t])
    const [customerData, setCustomerData] = useState(defaultCustomer);

    const [employees, setEmployees] = useState([])
    const [loadingEmployees, setLoadingEmployees] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(false)


    const [loading, setLoading] = useState(true);
    const [hasVat, setHasVat] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0)

    const [totalTaxes, setTotalTaxes] = useState(0)

    const [discount, setDiscount] = useState(0)
    const [discountType, setDiscountType] = useState('percent');

    const [paymentModalOpened, setPaymentModalOpened] = useState(false)

    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() =>
            setDateTime(new Date())
            , 60000);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        let total = 0;
        for (let section in items) {
            for (let item of items[section]) {
                total += item.price * item.quantity;
            }
        }
        if (discountType === 'percent') {
            total = total - ((total * discount / 100));
        } else if (discountType === 'fixed') {
            total = total - discount;
        }
        setTotalTaxes((total - (total / 1.15)).toFixed(2))
        setTotalPrice(total.toFixed(2));
    }, [items, discount, discountType])

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

    const customerAddHandler = useCallback((val) => {
        setCustomerData(val)
    }, [])
    const customerDeleteHandler = useCallback(() => {
        setCustomerData(defaultCustomer)
    }, [defaultCustomer])

    const openPaymentModalHandler = useCallback(() => {
        setPaymentModalOpened(true)
    }, [])
    const closePaymentModalHandler = useCallback(() => {
        setPaymentModalOpened(false)
    }, [])

    const handleDateChange = (newValue) => {
        setDateTime(newValue);
    };

    const formatedItems = useMemo(() => {
        let returnedItems = [];
        Object.keys(items).forEach(item => {
            returnedItems.push(...items[item])
        })
        return returnedItems
    }, [items])

    const payDisabled = formatedItems.length <= 0

    const discountTypeChangeHandler = (event) => {
        setDiscountType(event.target.value);
    }
    const discountChangeHandler = (event) => {
        if (+event.target.value >= 0) {
            setDiscount(+event.target.value)
        }
    }

    const resetCartHandler = () => {
        setCustomerData(defaultCustomer)
        resetCartItems()
        setDiscount(0)
        setDiscountType('percent')
    }

    const saveCartData = (  ) => {
        const obj = {
            id: uuidv4(),
            items:items,
            customerData: customerData,
            discount: discount,
            discountType: discountType,
            dateTime: dateTime,
        }
        const updatedStoredItems = [ ...storedItems ]
        updatedStoredItems.push(obj)
        localStorage.setItem("savedOrders", JSON.stringify(updatedStoredItems));
        setStoredItems(updatedStoredItems);
        resetCartHandler();
    }

    const deleteStoredItem = useCallback(( index ) => {
        let updatedOrders = [...storedItems]
        updatedOrders.splice(index, 1)
        setStoredItems(updatedOrders)
        localStorage.setItem("savedOrders", JSON.stringify(updatedOrders));
    }, [storedItems])

    const restoreOrder = useCallback(( item, index ) => {
        deleteStoredItem(index)
        assignCartItems(item.items)
        setCustomerData(item.customerData)
        setDiscount(item.discount)
        setDiscountType(item.discountType)
        setDateTime(moment(item.dateTime))
    }, [assignCartItems, deleteStoredItem])

    if (loading) {
        return <Loader height='75vh' />
    }

    return (
        <Fragment>
            <Wrapper $show={showCart} >
                {isTablet && (
                    <Box sx={{ display:'flex', alignItems: 'center', height: '40px', mb:1 }}>
                        <IconButton onClick={hideCart} >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                ) }
                <ChooseCustomer customerData={customerData} chooseCustomer={customerAddHandler} deleteCustomer={customerDeleteHandler} />
                <Box sx={{ mt: '10px' }} >
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DateTimePicker
                            label={t("Booking Date & time")}
                            inputFormat="DD-MM-YYYY hh:mm a"
                            value={dateTime}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
                <ItemsWrapper>
                    {formatedItems.map((item, index) => {
                        return (
                            <CartItem key={index} item={item} remove={removeItem} increase={increaseItem} decrease={decreaseItem}
                                type={item.type} changePrice={changePrice} changeEmployee={changeEmployee}
                                employees={employees} lastElementRef={lastElementRef} />
                        )
                    })}
                </ItemsWrapper>
                <div>
                    <CartInfoWrapper>
                        <span>{t('Discount Type')}</span>
                        <FormControl variant="standard" sx={{ minWidth: 120 }}>
                            <Select id="discount-type" value={discountType} onChange={discountTypeChangeHandler} inputProps={{ 'aria-label': 'Without label' }} label={t('Discount Type')} >
                                <MenuItem value='percent'>{t('percent')}</MenuItem>
                                <MenuItem value='fixed'>{t('Fixed')}</MenuItem>
                            </Select>
                        </FormControl>
                    </CartInfoWrapper>
                    <CartInfoWrapper>
                        <span>{t('Discount')}</span>
                        <TextField type="number" sx={{ width: 120 }} id="discount-value" variant='standard' value={discount} onChange={discountChangeHandler} />
                    </CartInfoWrapper>
                    {hasVat && (
                        <CartInfoWrapper>
                            <span>{t('total taxes')}</span>
                            <span>{formatCurrency(totalTaxes)}</span>
                        </CartInfoWrapper>
                    )}
                    <CartInfoWrapper>
                        <span>{t('price after discount')}</span>
                        <span>{formatCurrency(totalPrice)}</span>
                    </CartInfoWrapper>
                </div>
                <Button
                    disabled={payDisabled} variant='contained'
                    onClick={openPaymentModalHandler}
                    color='secondary' sx={{ width: '100%', mt: 1 }} >{t('pay')}</Button>
                <CartActions>
                    <Button onClick={resetCartHandler} >
                        <HighlightOffIcon color='error' sx={{ mr: 1 }} />
                    </Button>
                    <Button onClick={saveCartData} >
                        <PauseCircleOutlineIcon color='warning' sx={{ mr: 1 }} />
                    </Button>
                    <SavedOrders storedItems={storedItems}  deleteOrder={deleteStoredItem} restoreOrder={restoreOrder}  />
                </CartActions>
            </Wrapper>
            {paymentModalOpened && (
                <PaymentModal
                    open={paymentModalOpened} handleClose={closePaymentModalHandler}
                    dateTime={dateTime} hasVat={hasVat}customerId={customerData.id}
                    items={items} discount={discount} discountType={discountType}
                    resetCart={resetCartHandler} />
            )}
        </Fragment>
    )
}
export default Cart;