import { Grid, TextField, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import SearchMessage from "../../../../../components/Search/SearchMessage/SearchMessage";
import { CustomButton } from "../../../../../components/UI/Button/Button";
import CommentCard from "../../../../../components/UI/Dashboard/Comment/Comment";
import Loader from "../../../../../components/UI/Loader/Loader";
import axios from '../../../../../utils/axios-instance';
import { SeatStatus } from "../SeatsTable/SeatsTable";
import moment from 'moment';


const SeatDetails = styled.div`
    margin-bottom: 30px;
`

const AddComment = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin-top: 40px;
`
const CustomTextField = styled(TextField)`
    width: 100%;
`

const SingleSeat = props => {

    const { id } = useParams();
    const { t } = useTranslation()

    const [seat, setSeat] = useState(null);
    const [loading, setLoading] = useState(true);

    const [comments, setComments] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(false)

    const [ commentInput, setCommentInput ] = useState('')

    const getSeat = useCallback(() => {
        setLoading(true);
        axios.get(`/vendors/seats/${id}`)
            .then(res => {
                setSeat(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            })
    }, [id])

    const ovserver = useRef()

    const lastElementRef = useCallback((node) => {
        if (fetching) return;
        if (ovserver.current) ovserver.current.disconnect()
        ovserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !lastPage) {
                setPage(_page => _page + 1)
            }
        })
        if (node) ovserver.current.observe(node)
    }, [lastPage, fetching])

    const fetchComments = useCallback((searchParams) => {
        const notEmptySearchParams = {};
        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        setFetching(true)
        axios.get(`/vendors/seats/${id}/comments?include[]=owner`, {
            params: { ...notEmptySearchParams },
        })
            .then(res => {
                setFetching(false)
                setComments(currentComments => {
                    return [...currentComments, ...res.data.data]
                })
                if (res.data.meta.last_page === page) {
                    setLastPage(true)
                }
            }
            )
            .catch(err => {
                setFetching(false)
            })
    }, [id, page])

    useEffect(() => {
        getSeat();
    }, [getSeat])

    useEffect(() => {
        fetchComments({ page: page, per_page: 10, order_by: 'id' })
    }, [fetchComments, page])

    const commentInputChangeHandler = (e) => {
        setCommentInput(e.target.value)
    }
    let seatContent;
    let commentsContent;


    const deleteCommentHandler = useCallback((id) => {
        axios.delete(`/vendors/seat-comments/${id}`)
            .then(res => {
                setComments(currentComments => {
                    return currentComments.filter(coupon => coupon.id !== id)
                })
                toast.success(t('Comment Deleted'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
            .catch(err => {
                toast.error(t('Failed Deleting Comment'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }, [t])

    const addCommentHandler = useCallback(() => {
        axios.post(`vendors/seat-comments`, {
            seat_id: id,
            comment: commentInput
        })

            .then(res => {
                setComments(currentComments => {
                    return [res.data, ...currentComments]
                })
                setCommentInput('')
                toast.success(t('Comment Added'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
            .catch(err => {
                toast.error(t('Failed Adding Comment'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }, [t, id, commentInput])

    if (loading) {
        seatContent = <Loader height='200px' />
    }

    if (seat && !loading) {
        seatContent = (
            <SeatDetails>
                <Typography variant="h3" gutterBottom component="div">
                    {seat.title}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ marginBottom: '30px'  }} >
                    {seat.subject}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {moment.utc(seat.created_at).format('YYYY-MM-DD hh:mm A')}
                </Typography>
                <SeatStatus className={seat.status}>
                    {t(seat.status)}
                </SeatStatus>
            </SeatDetails>
        )
    }

    if (fetching && comments.length === 0) {
        commentsContent = (
            <Loader height='40vh' />
        )
    }

    if (!fetching && comments.length === 0) {
        commentsContent = (
            <SearchMessage height='150px'>
                {t('No Comments Found')}
            </SearchMessage>
        )
    }

    if (comments.length > 0) {
        commentsContent = (
            <Grid container spacing={2}>
                {comments.map((comment, index) => {
                    if (comments.length === (index + 1)) {
                        return (
                            <Grid item xs={12} key={index} ref={lastElementRef} >
                                <CommentCard comment={comment} deleteHandler={deleteCommentHandler} />
                            </Grid>
                        )
                    } else {
                        return (
                            <Grid item xs={12} key={index}>
                                <CommentCard comment={comment} deleteHandler={deleteCommentHandler} />
                            </Grid>
                        )
                    }
                })}
            </Grid>
        )
    }

    return (
        <Fragment>
            {seatContent}
            {commentsContent}
            <AddComment>
                <CustomTextField multiline rows={3} id="seat-comment" type='text' label={t('comment')} variant="outlined" value={commentInput} onChange={commentInputChangeHandler} />
                <CustomButton onClick={ addCommentHandler } >{t('add comment')}</CustomButton>
            </AddComment>
        </Fragment>
    )
}
export default SingleSeat;