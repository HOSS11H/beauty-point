import { Grid, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CustomModal } from '../../../../../components/UI/Modal/Modal';

const CustomTextField = styled(TextField)`
    width: 100%;
`

const ReserveSeat  = props => {

    const { seat, show, heading, confirmText, onConfirm, onClose, addSuccess } = props;

    const { id } = seat;

    const { t } = useTranslation();
    
    const [seatComment, setSeatComment] = useState('');


    const seatCommentChangeHandler = (event) => {
        setSeatComment(event.target.value);
    }

    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose])

    const resetModalData = useCallback(() => {
        setSeatComment('');
    }, [])

    useEffect(() => {
        addSuccess && resetModalData();
    }, [addSuccess, resetModalData])

    const confirmCreateHandler = useCallback(() => {
        const data = {
            id: id,
            comment: seatComment,
        }
        onConfirm(data);
    }, [id, seatComment, onConfirm])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <CustomTextField multiline rows={3} id="seat-comment" type='text' label={t('comment')} variant="outlined" value={seatComment} onChange={seatCommentChangeHandler} />
            </Grid>
        </Grid>
    )
    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmCreateHandler} onClose={closeModalHandler} >
            {content}
        </CustomModal>
    )
}
export default ReserveSeat