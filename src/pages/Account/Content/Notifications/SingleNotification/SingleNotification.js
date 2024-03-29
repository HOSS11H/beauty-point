import { Card, Typography } from '@mui/material';
import axios from '../../../../../utils/axios-instance';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Loader from '../../../../../components/UI/Loader/Loader';
import DOMPurify from "dompurify";

const CustomCard = styled(Card)`
    &.MuiPaper-root {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        box-shadow: none;
        background: none;
        padding:0;
        & .MuiTypography-h5 {
            a {
                color: ${({ theme }) => theme.vars.primary}
            }
        }
    }
`

const SingleNotification = props => {

    let { id } = useParams();

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        setLoading(true)
        axios.get(`/notifications/${id}`)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                toast.error(err.response)
            })
    }, [id])

    if (loading) return <Loader />

    if ( !data ) return <Typography variant="h6">Notification not found</Typography>

    const mySafeHTML = DOMPurify.sanitize(data.message);

    return (
        <CustomCard>
            <Typography color='secondary' variant='h4' gutterBottom >{data.title}</Typography>
            <Typography variant='h5'  dangerouslySetInnerHTML={{ __html: mySafeHTML }} />
            <Typography color='secondary' variant="caption" display="block" sx={{ textAlign: 'left', alignSelf: 'flex-end' }}  gutterBottom >
                <bdi>{moment.utc(data.created_at).fromNow()}</bdi>
            </Typography>
        </CustomCard>
    )
}
export default SingleNotification;