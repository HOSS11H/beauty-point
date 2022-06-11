import { Card, Typography } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../../../components/UI/Loader/Loader';
import styled from 'styled-components'

const CustomCard = styled(Card)`
    &.MuiPaper-root {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        box-shadow: none;
        background: none;
        padding:0;
    }
`


const cdata = {
    "id": "ab21961d-3629-4143-81e5-6bb7bd9c7cb8",
    "type": "App\\Notifications\\BookingCreated",
    "message": "مرحباً بك تم تأكيد حجزك رقم 12227 لدى صالون صالون منيرة",
    "title": "تم تأكيد حجزك",
    "read_at": null,
    "created_at": "2022-06-11T00:45:53.000000Z"
}

const SingleNotification = props => {

    let { id } = useParams();

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get(`/notifications/${id}`)
            .then(res => {
                setLoading(false)
                setData(res.data.data)
            })
            .catch(err => {
                setLoading(false)
                toast.error(err.response.data.message)
            })
    }, [id])

    if (loading) {
        return <Loader height='80vh' />
    }

    return (
        <CustomCard>
            <Typography color='secondary' variant='h4' gutterBottom >{cdata.title}</Typography>
            <Typography variant='h5'>{cdata.message}</Typography>
            <Typography color='secondary' variant="caption" display="block" sx={{ textAlign: 'left', alignSelf: 'flex-end' }}  gutterBottom >
                <bdi>{moment(cdata.created_at).fromNow()}</bdi>
            </Typography>
        </CustomCard>
    )
}
export default SingleNotification;