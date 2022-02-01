import { Backdrop, CircularProgress } from '@mui/material';
const SendingRequestIndicator = ({open}) => {
    return (
        <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
    )
}
export default SendingRequestIndicator;