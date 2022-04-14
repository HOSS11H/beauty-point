import { Grid, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';

const CustomTextField = styled(TextField)`
    width: 100%;
`

const CreateTicket  = props => {
    const { show, heading, confirmText, onConfirm, onClose, addSuccess } = props;


    const { t } = useTranslation();

    const [ticketTitle, setTicketTitle] = useState('');
    const [ticketTitleError, setTicketTitleError] = useState(false);
    
    const [ticketSubject, setTicketSubject] = useState('');
    const [ticketSubjectError, setTicketSubjectError] = useState(false);


    const ticketTitleChangeHandler = (event) => {
        setTicketTitle(event.target.value);
        setTicketTitleError(false);
    }

    const ticketSubjectChangeHandler = (event) => {
        setTicketSubject(event.target.value);
    }


    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose])

    const resetModalData = useCallback(() => {
        setTicketTitle('');
        setTicketTitleError(false);
        setTicketSubject('');
    }, [])

    useEffect(() => {
        addSuccess && resetModalData();
    }, [addSuccess, resetModalData])

    const confirmCreateHandler = useCallback(() => {
        if (ticketTitle.trim().length === 0) {
            setTicketTitleError(true);
            return;
        }
        if (ticketSubject.trim().length === 0) {
            setTicketSubjectError(true);
            return;
        }
        const data = {
            title: ticketTitle,
            subject: ticketSubject,
        }
        onConfirm(data);
    }, [ticketSubject, ticketTitle, onConfirm])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="ticket-title" label={t('title')} variant="outlined" value={ticketTitle} onChange={ticketTitleChangeHandler} />
                {ticketTitleError && <ValidationMessage notExist>{t(`Please add title`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} >
                <CustomTextField multiline rows={3} id="ticket-subject" type='text' label={t('subject')} variant="outlined" value={ticketSubject} onChange={ticketSubjectChangeHandler} />
                {ticketSubjectError && <ValidationMessage notExist>{t(`Please add subject`)}</ValidationMessage>}
            </Grid>
        </Grid>
    )
    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmCreateHandler} onClose={closeModalHandler} >
            {content}
        </CustomModal>
    )
}
export default CreateTicket