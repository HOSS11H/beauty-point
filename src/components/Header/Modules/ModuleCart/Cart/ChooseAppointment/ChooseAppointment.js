import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import DatePicker from '@mui/lab/DatePicker';
import { useEffect, useState } from 'react';
import axios from '../../../../../../utils/axios-instance';
import { format } from 'date-fns/esm';
import styled, { css } from 'styled-components';
import Loader from '../../../../../UI/Loader/Loader';
import { Fragment } from 'react';
import { useContext } from 'react';
import ThemeContext from '../../../../../../store/theme-context';
import { Grid, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HouseIcon from '@mui/icons-material/House';
import StoreIcon from '@mui/icons-material/Store';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import { formatCurrency } from '../../../../../../shared/utility';


const SlotsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 25px;
`

const Slot = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 8px;
    border: 2px solid ${({ theme }) => theme.vars.theme};
    background-color: ${({ theme }) => theme.vars.theme};
    color: ${({ theme }) => theme.palette.common.white};
    margin-right: 5px;
    margin-bottom: 10px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    ${({ active }) => active && css`
        background-color: ${({ theme }) => theme.palette.common.white};
        color: ${props => props.theme.vars.theme};
    `}
    @media screen and (max-width: 599.98px) {
        flex-basis: 30%;
    }
`
const MobilePickerWrapper = styled.div`
    padding-top: 10px;
    width: 100%;
    & .MuiFormControl-root {
        width: 100%;
    }
`

const BookingPlaceCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 20px 10px;
    border-radius: 8px;
    border: 2px solid ${({ theme }) => theme.vars.theme};
    background-color: ${({ theme }) => theme.vars.theme};
    color: ${({ theme }) => theme.palette.common.white};
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    svg {
        margin-bottom: 5px;
    }
    ${({ active }) => active && css`
        background-color: ${({ theme }) => theme.palette.common.white};
        color: ${props => props.theme.vars.theme};
    `}
`

const ChooseAppointment = props => {

    const { appointment, handleAppointment, id, handleSlot, activeSlot, vendotPage, bookingPlace, chooseBookingPlace } = props;

    const {t} = useTranslation()

    const [date, setDate] = useState(new Date());
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);

    const themeCtx = useContext(ThemeContext);

    const isMobile = useMediaQuery(themeCtx.theme.breakpoints.down('lg'));

    useEffect(() => {
        setLoading(true);
        axios.get(`/company/${id}/slots?bookingDate=${format(date, 'Y-MM-dd')}`)
            .then(res => {
                setLoading(false);
                setSlots(res.data);
            })
            .catch(err => {
                setLoading(false);
            })
    }, [date, id])

    return (
        <Fragment>
            <Grid container  spacing={2} sx={{ marginBottom: '20px' }} >
                {
                    vendotPage.in_house_available && (
                        <Grid item xs={6}  sm={4}>
                            <BookingPlaceCard  active={ bookingPlace === 'in_house' } onClick={  ( ) => chooseBookingPlace('in_house')  }>
                                <HouseIcon />
                                <p>{t('in house')}</p>
                                <p>{formatCurrency(vendotPage.in_house)}</p>
                            </BookingPlaceCard>
                        </Grid>
                    )
                }
                {
                    vendotPage.in_saloon_available && (
                        <Grid item xs={6}  sm={4}>
                            <BookingPlaceCard  active={ bookingPlace === 'in_saloon' } onClick={  ( ) => chooseBookingPlace('in_saloon')  }>
                                <StoreIcon />
                                <p>{t('in saloon')}</p>
                                <p>{formatCurrency(vendotPage.in_saloon)}</p>
                            </BookingPlaceCard>
                        </Grid>
                    )
                }
                {
                    vendotPage.in_customer_house_available && (
                        <Grid item xs={6}  sm={4}>
                            <BookingPlaceCard  active={ bookingPlace === 'in_customer_house' } onClick={  ( ) => chooseBookingPlace('in_customer_house')  }>
                                <DirectionsWalkIcon />
                                <p>{t('in customer house')}</p>
                                <p>{formatCurrency(vendotPage.in_customer_house)}</p>
                            </BookingPlaceCard>
                        </Grid>
                    )
                }
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                {
                    isMobile ? (
                        <MobilePickerWrapper>
                            <DatePicker
                                label={t('choose appointment')}
                                value={appointment}
                                onChange={(newValue) => {
                                    handleAppointment(newValue);
                                    setDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                sx={{ zIndex: 9999 }}
                            />
                        </MobilePickerWrapper>
                    ) : (
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            value={appointment}
                            onChange={(newValue) => {
                                handleAppointment(newValue);
                                setDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    )
                }
            </LocalizationProvider>
            {
                loading ? <Loader height="100px" /> : (
                    <SlotsWrapper>
                        {
                            slots.length > 0 ? slots.map((slot, index) => {
                                return (
                                    <Slot key={index} onClick={() => handleSlot(slot)} active={slot === activeSlot} >
                                        {slot}
                                    </Slot>
                                )
                            }) : <p>{t('No slots available')}</p>
                        }
                    </SlotsWrapper>
                )
            }
        </Fragment>
    )
}
export default ChooseAppointment;