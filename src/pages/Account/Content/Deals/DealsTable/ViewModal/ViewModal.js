import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import DOMPurify from "dompurify";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { TableDate } from '../../../../../../components/UI/Dashboard/Table/Table';
import EventNoteIcon from '@mui/icons-material/EventNote';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatCurrency } from '../../../../../../shared/utility';
import { useCallback, useContext, useEffect, useState } from 'react';
import ThemeContext from '../../../../../../store/theme-context';
import Loader from '../../../../../../components/UI/Loader/Loader';
import { toast } from 'react-toastify';
import axios from '../../../../../../utils/axios-instance';
import moment from 'moment';

const DealImg = styled.div`
    width: 100%;
    height: 200px;
    border-radius: 10px;
    flex-shrink: 0;
    cursor: pointer;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
`
const DealData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
`
const DealDataHeading = styled.p`
    font-size: 15px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
    margin-bottom: 5px;
`

const DealDataInfo = styled.p`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-bottom: 0px;
`
const DealDesc = styled.div`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    p {
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
    }
`


const ViewModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, id } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [ dealData, setDealData ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const fetchData = useCallback(( ) => {
        setLoading(true);
        axios.get(`/vendors/deals/${id}?include[]=services&include[]=location`, {
            headers: {
                'Accept-Language': lang
            }
        }).then(response => {
            setDealData(response.data);
            setLoading(false);
        })
            .catch(err => {
                setLoading(false);
                toast.error(t('Error Happened'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }, [id, lang, t])

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [fetchData, id]);

    let content;

    if (loading) {
        content = <Loader height='50vh' />
    }

    if (dealData && !loading) {

        const formattedApplyTime = dealData.applied_between_time.split(' - ')

        const transformedDealData = {
            ...dealData,
            applied_between_time: formattedApplyTime,
        }

        const mySafeHTML = DOMPurify.sanitize(dealData.description);

        content = (
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <DealImg>
                        <img src={transformedDealData.image} alt="deal" />
                    </DealImg>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <DealData>
                                <DealDataHeading>{t('title')}</DealDataHeading>
                                <DealDataInfo>{transformedDealData.title}</DealDataInfo>
                            </DealData>
                        </Grid>
                        <Grid item xs={6}>
                            <DealData>
                                <DealDataHeading>{t('discount type')}</DealDataHeading>
                                <DealDataInfo>{transformedDealData.discount_type}</DealDataInfo>
                            </DealData>
                        </Grid>
                        <Grid item xs={6}>
                            <DealData>
                                <DealDataHeading>{t('discount value')}</DealDataHeading>
                                <DealDataInfo>{transformedDealData.discount_type === 'percentage' ? `${transformedDealData.discount_value} %` : formatCurrency(transformedDealData.discount_value)}</DealDataInfo>
                            </DealData>
                        </Grid>
                        <Grid item xs={6}>
                            <DealData>
                                <DealDataHeading>{t('starts at')}</DealDataHeading>
                                <TableDate>
                                    <li><EventNoteIcon sx={{ mr: 1 }} />{moment(transformedDealData.start_date_time).format('YYYY-MM-DD')}</li>
                                    <li><WatchLaterIcon sx={{ mr: 1 }} />{moment(transformedDealData.start_date_time).format('hh:mm A')}</li>
                                </TableDate>
                            </DealData>
                        </Grid>
                        <Grid item xs={6}>
                            <DealData>
                                <DealDataHeading>{t('ends at')}</DealDataHeading>
                                <TableDate>
                                    <li><EventNoteIcon sx={{ mr: 1 }} />{moment(transformedDealData.end_date_time).format('YYYY-MM-DD')}</li>
                                    <li><WatchLaterIcon sx={{ mr: 1 }} />{moment(transformedDealData.end_date_time).format('hh:mm A')}</li>
                                </TableDate>
                            </DealData>
                        </Grid>
                        <Grid item xs={6}>
                            <DealData>
                                <DealDataHeading>{t('applies between')}</DealDataHeading>
                                <TableDate>
                                    <li><WatchLaterIcon sx={{ mr: 1 }} />{transformedDealData.applied_between_time[0]}</li>
                                    <li><WatchLaterIcon sx={{ mr: 1 }} />{transformedDealData.applied_between_time[1]}</li>
                                </TableDate>
                            </DealData>
                        </Grid>
                        <Grid item xs={6}>
                            <DealData>
                                <DealDataHeading>{t('uses limit')}</DealDataHeading>
                                <DealDataInfo>{transformedDealData.uses_limit || 0}</DealDataInfo>
                            </DealData>
                        </Grid>
                        <Grid item xs={6}>
                            <DealData>
                                <DealDataHeading>{t('used time')}</DealDataHeading>
                                <DealDataInfo>{transformedDealData.used_time || 0}</DealDataInfo>
                            </DealData>
                        </Grid>
                        <Grid item xs={6}>
                            <DealData>
                                <DealDataHeading>{t('applied days')}</DealDataHeading>
                                <TableDate>
                                    {transformedDealData.days.map((day, index) => {
                                        return <li key={index}><EventNoteIcon sx={{ mr: 1 }} />{day}</li>
                                    })}
                                </TableDate>
                            </DealData>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <DealData>
                        <DealDataHeading>{t('description')}</DealDataHeading>
                        <DealDesc dangerouslySetInnerHTML={{ __html: mySafeHTML }} />
                    </DealData>
                </Grid>
                {
                    (transformedDealData.services.length > 0) && (
                        <Grid item xs={12}>
                            <DealData>
                                <DealDataHeading>{t('deal items')}</DealDataHeading>
                                <TableContainer component={Paper} sx={{ my: 2 }}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>{t('service')}</TableCell>
                                                <TableCell align="center">{t('price')}</TableCell>
                                                <TableCell align="center">{t('quantity')}</TableCell>
                                                <TableCell align="center">{t('price including taxes')}</TableCell>
                                                <TableCell align="center">{t('total')}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {transformedDealData.services.map((item) => (
                                                <TableRow
                                                    key={item.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {item.service.name}
                                                    </TableCell>
                                                    <TableCell align="center">{item.price}</TableCell>
                                                    <TableCell align="center">{item.quantity}</TableCell>
                                                    <TableCell align="center">{item.total_amount}</TableCell>
                                                    <TableCell align="center">{item.total_amount}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </DealData>
                        </Grid>
                    )
                }
            </Grid>
        )
    }

    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={onConfirm} onClose={onClose} >
            {content}
        </CustomModal>
    )
}

export default ViewModal;
