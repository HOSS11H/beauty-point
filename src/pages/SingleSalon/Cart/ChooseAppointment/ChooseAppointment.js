import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

const ChooseAppointment = props => {

    const { appointment, handleAppointment } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker 
                displayStaticWrapperAs="desktop"
                value={appointment}
                onChange={(newValue) => {
                    handleAppointment(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}
export default ChooseAppointment;