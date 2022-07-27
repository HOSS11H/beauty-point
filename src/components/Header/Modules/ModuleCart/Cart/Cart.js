import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Box, Button, Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import CartHeadliner from './CartHeadliner/CartHeadliner';
import ChooseAppointment from './ChooseAppointment/ChooseAppointment';
import UserAuth from './UserAuth/UserAuth';
import ChoosePayment from './ChoosePayment/ChoosePayment';
import axios from '../../../../../utils/axios-instance';
import ItemsReview from './ItemsReview/ItemsReview';
import PrintBooking from './PrintBooking/PrintBooking';
import { format } from 'date-fns/esm';
import CartSummary from './CartSummary/CartSummary';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCoupons, removeDeal, removeService } from '../../../../../store/actions/index';
import { useContext } from 'react';
import ThemeContext from '../../../../../store/theme-context';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../../../UI/Loader/Loader';
import { toast } from 'react-toastify';

const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        margin: auto;
        overflow: hidden;
        box-shadow: none;
        border-radius:20px;
        background-color: ${({ theme }) => theme.palette.background.default};
        z-index:1290;
        width: 70%;
        @media screen and (max-width: 1399.98px) {
            width: 90%;
        }
        @media screen and (max-width: 899.98px) {
            width: 90%;
        }
    }
`;

const CartContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    height: 100%;
`
const CartBody = styled.div`
    margin-top: 25px;
    flex-grow: 1;
    width: 100%;
    padding: 0 25px 25px;
    max-height: 70vh;
    overflow-y: auto;
    // Scroll //
    -webkit-overflow-scrolling: touch;
    @media screen and (max-width: 899.98px) {
        max-height: 40vh;
        padding:  0 15px 25px;
    }
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

const CartButton = styled(Button)`
    &.MuiButton-root {
        background: ${({ theme }) => theme.vars.primary};
        color: ${({ theme }) => theme.palette.common.white};
        transition: 0.3s ease-in-out;
        border-radius: 10px;
        &:disabled {
            background: #eee;
            color: #999;
            box-shadow: none;
        }
        &:hover {
            background: ${({ theme }) => theme.palette.secondary.dark};
        }
    }
`

const CustomMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    flex-grow: 1;
    padding: 20px;
    p {
        font-size: 24px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
    }
`

const steps = ['review items', 'Select appointment', 'user infos', 'choose Payment', 'print receipt'];

const Cart = props => {

    const { show, onClose, fetchCouponsHandler, cart, removeDeal, removeService } = props;

    const { t } = useTranslation();

    const companyId = +localStorage.getItem('cId')

    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;

    const [companyData, setCompanyData] = useState({
        id: companyId || null,
        companyName: '',
        vendor_page: {}
    })

    const [fetchingCompanyData, setFetchingCompanyData] = useState(false)
    const [companyDataFetched, setCompanyDataFetched] = useState(false)
    const [companyDataFetchError, setCompanyDataFetchError] = useState(false)

    const [totalPrice, setTotalPrice] = useState(0)

    const [totalTaxes, setTotalTaxes] = useState(0)

    const [activeStep, setActiveStep] = useState(0);

    const [appointment, setAppointment] = useState(new Date());
    const [slot, setSlot] = useState('');
    const [hasSelectedAppointment, setHasSelectedAppointment] = useState(false);

    const [bookingPlace, setBookingPlace] = useState(null)
    const [bookingPlacePrice, setBookingPlacePrice] = useState(null)

    const [userInfos, setUserInfos] = useState('');

    const [paymentMethod, setPaymentMethod] = useState('');

    const [couponId, setCouponId] = useState(null);
    const [couponData, setCouponData] = useState({ amount: 0 })

    const [resevedBookingData, setReservedBookingData] = useState(null);

    const [bookingDone, setBookingDone] = useState(false);

    useEffect(() => {
        if (!companyId) return;
        setFetchingCompanyData(true);
        setCompanyDataFetched(false)
        setCompanyDataFetchError(false)
        axios.get(`/companies/${companyId}?include[]=vendor_page&include[]=booking_times`)
            .then(res => {
                setFetchingCompanyData(false);
                setCompanyData(res.data);
                setCompanyDataFetched(true)
            })
            .catch(err => {
                setFetchingCompanyData(false);
                toast.error('Can not get Company data')
                setCompanyDataFetchError(true)
            })
    }, [companyId])

    useEffect(() => {
        let total = 0;
        for (let section in cart) {
            for (let item of cart[section]) {
                total += item.price * item.quantity;
            }
        }

        if (couponData.discountType === 'percentage') {
            total = total - ((total * couponData.amount / 100));
        } else if (couponData.discountType === 'fixed') {
            total = total - couponData.amount;
        }

        setTotalTaxes(total - (total / 1.15))
        setTotalPrice(total);
    }, [cart, couponData])

    useEffect(() => {
        fetchCouponsHandler(lang);
    }, [fetchCouponsHandler, lang])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    const handleAppointment = useCallback((date) => {
        setAppointment(date);
        setSlot('');
    }, [])

    const bookingPlaceHandler = useCallback((val) => {
        setBookingPlace(val)
        setBookingPlacePrice(companyData.vendor_page[val])
    }, [companyData.vendor_page])

    const handleSlot = useCallback((slot) => {
        setSlot(slot);
        setHasSelectedAppointment(true);
    }, [])

    const handleCoupon = useCallback(id => {
        setCouponId(id);
    }, [])
    const handleCouponData = useCallback(data => {
        setCouponData(data);
    }, [])

    const handleChoosePayment = useCallback((payment) => {
        setPaymentMethod(payment);
        const chosenDate = format(appointment, 'yyyy-MM-dd');
        const combined = chosenDate + " " + slot;
        if (payment === 'cash') {
            let data = {
                company_id: companyData.id,
                dateTime: combined,
                payment_gateway: payment,
                cart: cart,
                couponId: couponId,
            };
            if (bookingPlace) {
                data.booking_place = bookingPlace
            }
            axios.post(`/bookings`, data)
                .then(response => {
                    setReservedBookingData(response.data);
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                })
                .catch(err => {
                    //console.log(err);
                })
        }
    }, [appointment, slot, companyData.id, cart, couponId, bookingPlace])

    const storeUserInfos = useCallback((infos) => {
        setUserInfos(infos);
    }, [])

    const handleBookingDone = useCallback(() => {
        setBookingDone(true);
    }, [])

    const ResetCart = () => {
        if (bookingDone) {
            handleReset();
            setAppointment(new Date());
            setSlot('');
            setHasSelectedAppointment(false);
            setUserInfos('');
            setPaymentMethod('');
            setCouponId(null);
            setReservedBookingData(null);
            setBookingDone(false);
            onClose();
            localStorage.removeItem('cId')
        }
    }

    let content;

    if (fetchingCompanyData) {
        content = <Loader height={300} />
    }
    if (companyDataFetchError) {
        content = (
            <CustomMessage>
                <p>{t('no company data')}</p>
            </CustomMessage>
        )
    }
    if (!companyData.id) {
        content = <ItemsReview cartData={cart} removeService={removeService} removeDeal={removeDeal} />
    }

    if (!fetchingCompanyData && companyData.id && companyDataFetched) {
        const bookingPlaceDisabled = !companyData.vendor_page.in_customer_house_available && !companyData.vendor_page.in_house_available && !companyData.vendor_page.in_saloon_available
        content = (
            <Grid container spacing={0} >
                <Grid item xs={12} md={3}>
                    <CartHeadliner activeStep={activeStep} salonName={companyData.companyName} steps={steps} />
                </Grid>
                <Grid item xs={12} md={activeStep === 4 ? 9 : 6}>
                    <CartContent sx={{ width: '100%' }}>
                        <CartBody>
                            {
                                activeStep === 0 && <ItemsReview cartData={cart} removeService={removeService} removeDeal={removeDeal} />
                            }
                            {
                                activeStep === 1 && <ChooseAppointment
                                    id={companyData.id} vendotPage={companyData.vendor_page} appointment={appointment}
                                    bookingPlace={bookingPlace} chooseBookingPlace={bookingPlaceHandler}
                                    handleAppointment={handleAppointment} handleSlot={handleSlot} activeSlot={slot} />
                            }
                            {
                                activeStep === 2 && <UserAuth id={companyData.id} handleNext={handleNext} storeUserData={storeUserInfos} />
                            }
                            {
                                activeStep === 3 && <ChoosePayment handlePayment={handleChoosePayment} assignCoupon={handleCoupon} assignCouponData={handleCouponData} couponData={couponData} />
                            }
                            {
                                activeStep === 4 && <PrintBooking bookingData={resevedBookingData} userData={userInfos} handleBookingDone={handleBookingDone} salonName={companyData.companyName} appointment={appointment} slot={slot} />
                            }
                        </CartBody>
                        <Fragment>
                            {
                                activeStep === 0 && (
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <CartButton color="secondary" variant='contained' onClick={handleNext} disabled={cart.services.length === 0 && cart.deals.length === 0} >
                                            {t('Next')}
                                        </CartButton>
                                    </Box>
                                )
                            }
                            {
                                activeStep === 1 && (
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }}>
                                        <Button
                                            color="inherit"
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            {t('Back')}
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <CartButton color="secondary" variant='contained' onClick={handleNext} disabled={!hasSelectedAppointment || (!bookingPlaceDisabled && !bookingPlace)} >
                                            {t('Next')}
                                        </CartButton>
                                    </Box>
                                )
                            }
                            {
                                activeStep === 2 && (
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }}>
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            {t('Back')}
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <CartButton color="secondary" variant='contained' onClick={handleNext} disabled >
                                            {t('Next')}
                                        </CartButton>
                                    </Box>
                                )
                            }
                            {
                                activeStep === 3 && (
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }}>
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={() => setActiveStep(activeStep - 2)}
                                            sx={{ mr: 1 }}
                                        >
                                            {t('Back')}
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                    </Box>
                                )
                            }
                            {
                                activeStep === 4 && (
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <CartButton color="secondary" variant='contained' onClick={ResetCart} disabled={!bookingDone} >
                                            {t('Finish')}
                                        </CartButton>
                                    </Box>
                                )
                            }
                        </Fragment>
                    </CartContent>
                </Grid>
                <Grid item xs={12} md={3} sx={{ display: activeStep === 4 ? 'none' : 'block' }} >
                    <CartSummary cartData={cart} taxes={totalTaxes} total={totalPrice} hasSelectedAppointment={hasSelectedAppointment} bookingPlacePrice={bookingPlacePrice}
                        appointment={appointment} slot={slot} bookingPlace={bookingPlace} hasSelectedCoupon={couponId} couponDiscount={couponData.amount} />
                </Grid>
            </Grid>
        )
    }



    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={show}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '1299',
            }}
        >
            <Fade in={show}>
                <CustomCardMui>
                    {content}
                </CustomCardMui>
            </Fade>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCouponsHandler: (lang) => dispatch(fetchCoupons(lang)),
        removeService: (type, id) => {
            dispatch(removeService(id))
        },
        removeDeal: (type, id) => dispatch(removeDeal(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
