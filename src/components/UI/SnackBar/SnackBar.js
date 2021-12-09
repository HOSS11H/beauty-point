import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars( props ) {

    const { show, message, type, onClose } = props;
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose()
    };

    return (
        <Snackbar open={show} autoHideDuration={4000} onClose={handleClose} >
            {type === 'success' ? <Alert onClose={handleClose} severity="success">{message}</Alert> : <Alert onClose={handleClose} severity="error">{message}</Alert>}
        </Snackbar>
    );
}