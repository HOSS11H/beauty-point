import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { useEffect, useState } from 'react';
import axios from '../../../../utils/axios-instance';
import { format } from 'date-fns/esm';
import styled, {css} from 'styled-components';
import Loader from '../../../../components/UI/Loader/Loader';
import { Fragment } from 'react';


const SlotsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    margin-top: 25px;
`

const Slot = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.vars.theme};
    color: #fff;
    margin-right: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    ${ ( { active } ) => active && css`
        background-color: #fff;
        color: ${props => props.theme.vars.theme};
    `}
`

const ChooseAppointment = props => {

    const { appointment, handleAppointment, id, handleSlot, activeSlot } = props;

    const [ date, setDate ] = useState(new Date());
    const [ slots, setSlots ] = useState([]);
    const [ loading, setLoading ] = useState(false);

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
    },[date, id])

    return (
        <Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker 
                    displayStaticWrapperAs="desktop"
                    value={appointment}
                    onChange={(newValue) => {
                        handleAppointment(newValue);
                        setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            {
                loading ? <Loader height="100px" /> : (
                    <SlotsWrapper>
                        {
                            slots.length > 0 ? slots.map((slot, index) => {
                                return (
                                    <Slot key={index} onClick={( ) => handleSlot(slot)} active={ slot === activeSlot } >
                                        {slot}
                                    </Slot>
                                )
                            }) : <p>No slots available</p>
                        }
                    </SlotsWrapper>
                )
            }
        </Fragment>
    )
}
export default ChooseAppointment;