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

const SingleTicket = props => {

    const { id } = useParams();
    const { t } = useTranslation()

    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);

    const [comments, setComments] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(false)

    const [ commentInput, setCommentInput ] = useState('')

    const getTicket = useCallback(() => {
        setLoading(true);
        axios.get(`/vendors/tickets/${id}`)
            .then(res => {
                setTicket(res.data);
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
        axios.get(`/vendors/tickets/${id}/comments`, {
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
        getTicket();
    }, [getTicket])

    useEffect(() => {
        fetchComments({ page: page, per_page: 10, order_by: 'id' })
    }, [fetchComments, page])

    const commentInputChangeHandler = (e) => {
        setCommentInput(e.target.value)
    }
    let ticketContent;
    let commentsContent;


    const deleteCommentHandler = useCallback((id) => {
        axios.delete(`/vendors/ticket-comments/${id}`)
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
        axios.post(`vendors/ticket-comments`, {
            ticket_id: id,
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
        ticketContent = <Loader height='200px' />
    }

    if (ticket && !loading) {
        ticketContent = (
            <Fragment>
                <Typography variant="h3" gutterBottom component="div">
                    {ticket.title}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ marginBottom: '40px'  }} >
                    {ticket.subject}
                </Typography>
            </Fragment>
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
            {ticketContent}
            {commentsContent}
            <AddComment>
                <CustomTextField multiline rows={3} id="ticket-comment" type='text' label={t('comment')} variant="outlined" value={commentInput} onChange={commentInputChangeHandler} />
                <CustomButton onClick={ addCommentHandler } >{t('add comment')}</CustomButton>
            </AddComment>
        </Fragment>
    )
}
export default SingleTicket;