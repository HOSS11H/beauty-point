import { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../../../../store/theme-context'

import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import ValidationMessage from '../../../../../../components/UI/ValidationMessage/ValidationMessage';
import { connect } from 'react-redux';


const CustomTextField = styled(TextField)`
    width: 100%;
`


const AddCustomerModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose  } = props;

    const { t } = useTranslation();

    const [customerName, setCustomerName] = useState('');
    const [customerNameError, setCustomerNameError] = useState(false);
    
    const customerNameChangeHandler = (event) => {
        setCustomerName(event.target.value);
        setCustomerNameError(false);
    }

    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose])

    const confirmAddHandler = useCallback(() => {
        if ( customerName === '') {
            setCustomerNameError(true);
            return;
        }

        const data = {
            name: customerName,
        }
        onConfirm(data);
        setCustomerName('');
    }, [customerName, onConfirm])
    
    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmAddHandler} onClose={closeModalHandler} >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField id="deal-name" label={t('name')} variant="outlined" value={customerName} onChange={customerNameChangeHandler} />
                    {customerNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
                </Grid>
            </Grid>
        </CustomModal>
    )
}



export default AddCustomerModal;