import { FormControl, InputLabel, MenuItem, Select, TableHead } from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import styled from "styled-components";
import SearchBar from '../../../../../components/Search/SearchBar/SearchBar';
import { CustomButton } from "../../../../../components/UI/Button/Button";
import TablePaginationActions from "../../../../../components/UI/Dashboard/Table/TablePagination/TablePagination";
import Loader from "../../../../../components/UI/Loader/Loader";
import axios from '../../../../../utils/axios-instance';
import CreateTicket from "../CreateTicket/CreateTicket";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Actions from "../../../../../components/UI/Dashboard/Actions/Actions";
import SearchMessage from "../../../../../components/Search/SearchMessage/SearchMessage";
import EditTicket from "../EditTicket/EditTicket";

const TablePaginationWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 30px;
    flex-direction: column;
`

const ActionsHolder = styled.div`
    display: flex;
    align-items: center;
`
const CreateBtn = styled(CustomButton)`
    &.MuiButton-root {
        margin-left: 20px;
        width: auto;
        padding: 0 20px;
        height: 64px;
        flex-shrink: 0;
        box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
        @media screen and (max-width: 600px) {
            height: 50px;
        }
        &:last-child {
            margin-bottom: 40px;
        }
    }
`
const intialRowsPerPage = 10;

const TicketsTable = props => {

    const { t } = useTranslation()

    const [tickets, setTickets] = useState({ data: [] })
    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(intialRowsPerPage)
    const [searchWord, setSearchWord] = useState('')

    const [editTicketOpened, setEditTicketOpened] = useState(false)
    const [createTicketOpened, setCreateTicketOpened] = useState(false)

    const [creatingTicketSuccess, setCreatingTicketSuccess] = useState(false)

    const [selectedTicket, setSelectedTicket] = useState(null)

    const fetchTickets = useCallback((searchParams) => {
        const notEmptySearchParams = {};
        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        setLoading(true)
        axios.get(`/vendors/tickets`, {
            params: { ...notEmptySearchParams },
        })
            .then(res => {
                setLoading(false)
                setTickets(res.data)
            }
            )
            .catch(err => {
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        fetchTickets({ page: page + 1, term: searchWord, per_page: rowsPerPage, order_by: 'id' })
    }, [fetchTickets, page, rowsPerPage, searchWord])

    const openCreateTicketHandler = useCallback(() => {
        setCreateTicketOpened(true)
    }, [])
    const closeCreateTicketHandler = useCallback(() => {
        setCreateTicketOpened(false)
    }, [])

    const createTicketConfirmHandler = useCallback((data) => {
        setCreatingTicketSuccess(false)
        axios.post('/vendors/tickets', data)
            .then(response => {
                setCreatingTicketSuccess(true)
                setCreateTicketOpened(false)
                fetchTickets({ page: page + 1, term: searchWord, per_page: rowsPerPage, order_by: 'id', order_dir: 'desc' })
                toast.success(t('Ticket Created'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
            .catch(error => {
                setCreatingTicketSuccess(false)
                const errs = error.response?.data.errors;
                for (let key in errs) {
                    toast.error(errs[key][0], {
                        position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                        closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                    });
                }
            });
    }, [fetchTickets, page, rowsPerPage, searchWord, t])

    const deleteTicketHandler = useCallback((id) => {
        axios.delete(`/vendors/tickets/${id}`)
            .then(res => {
                fetchTickets({ page: page + 1, term: searchWord, per_page: rowsPerPage, order_by: 'id' })
                toast.success(t('Ticket Deleted'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
            .catch(err => {
                toast.error(t('Failed Deleting Ticket'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }, [fetchTickets, page, rowsPerPage, searchWord, t])

    const openEditTicketHandler = useCallback((ticket) => {
        setEditTicketOpened(true)
        setSelectedTicket(ticket)
    }, [])
    const closeEditTicketHandler = useCallback(( ) => {
        setEditTicketOpened(false)
        setSelectedTicket(null)
    }, [])
    const editTicketConfirmHandler = useCallback((data) => {
        axios.put(`/vendors/tickets/${data.id}`, data )
            .then(res => {
                setEditTicketOpened(false)
                setSelectedTicket(null)
                toast.success(t('Ticket Details Updated'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
                fetchTickets({ page: page + 1, term: searchWord, per_page: rowsPerPage, order_by: 'id' })
            })
            .catch(error => {
                const errs = error.response?.data.errors;
                for (let key in errs) {
                    toast.error(errs[key][0], {
                        position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                        closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                    });
                }
            })
    }, [fetchTickets, page, rowsPerPage, searchWord, t])

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage)
    }, [])

    const handlePerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value)
        setPage(0)
    }, [])

    const searchCutomersHandler = useCallback((lang, search) => {
        setSearchWord(search)
        setPage(0)
    }, [])

    let content;

    if (loading) {
        content = <Loader height='50vh' />
    }

    if (!loading && tickets.data.length === 0) {
        content = (
            <SearchMessage height='400px'>{t('No Tickets Found')}</SearchMessage>
        )
    }
    if (!loading && tickets.data.length > 0) {
        content = (
            <Fragment>
                <TablePaginationWrapper>
                    <FormControl sx={{ minWidth: '75px', }} variant="filled" >
                        <InputLabel id="show-num">{t('show')}</InputLabel>
                        <Select
                            labelId="show-num"
                            id="show-num-select"
                            value={rowsPerPage}
                            label={t('show')}
                            onChange={handlePerPageChange}
                        >
                            <MenuItem value='all'>{t('all')}</MenuItem>
                            <MenuItem value={5}>{t('5')}</MenuItem>
                            <MenuItem value={10}>{t('10')}</MenuItem>
                            <MenuItem value={15}>{t('15')}</MenuItem>
                            <MenuItem value={20}>{t('20')}</MenuItem>
                        </Select>
                    </FormControl>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" >{t('#')}</TableCell>
                                    <TableCell align="center" >{t('title')}</TableCell>
                                    <TableCell align="center" >{t('action')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tickets.data.map((ticket, index) => {
                                    return (
                                        <TableRow key={ticket.id}>
                                            <TableCell align="center" >{index + 1}</TableCell>
                                            <TableCell align="center" >{ticket.title}</TableCell>
                                            <TableCell align="center" >
                                                <Actions edit remove
                                                    editHandler={openEditTicketHandler.bind(null, ticket)}
                                                    removeHandler={deleteTicketHandler.bind(null, ticket.id)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {rowsPerPage !== 'all' && (
                        <TablePaginationActions
                            sx={{ width: '100%' }}
                            component="div"
                            count={tickets.data.length}
                            total={tickets.meta ? tickets.meta.total : 0}
                            rowsPerPage={+rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            loading={loading}
                        />
                    )}
                </TablePaginationWrapper>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <ActionsHolder>
                <SearchBar searchHandler={searchCutomersHandler} />
                <CreateBtn onClick={openCreateTicketHandler} >{t('Create Ticket')}</CreateBtn>
                <CreateTicket show={createTicketOpened} addSuccess={creatingTicketSuccess}
                    onClose={closeCreateTicketHandler} onConfirm={createTicketConfirmHandler}
                    heading='create new ticket' confirmText='create' />
            </ActionsHolder>
            {content}
            {editTicketOpened && selectedTicket && (
                <EditTicket show={editTicketOpened} ticket={selectedTicket}
                    onClose={closeEditTicketHandler} confirmText='save changes'
                    onConfirm={editTicketConfirmHandler} />
            )}
        </Fragment>
    )
}
export default TicketsTable