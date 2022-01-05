import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';

const ChooseAppointment = props => {

    const { appointment, handleAppointment } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDateTimePicker
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