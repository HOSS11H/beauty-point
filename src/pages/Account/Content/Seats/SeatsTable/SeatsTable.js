import { FormControl, InputLabel, MenuItem, Select, TableHead } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import styled from "styled-components";
import SearchBar from '../../../../../components/Search/SearchBar/SearchBar';
import SearchMessage from "../../../../../components/Search/SearchMessage/SearchMessage";
import { CustomButton } from "../../../../../components/UI/Button/Button";
import Actions from "../../../../../components/UI/Dashboard/Actions/Actions";
import TablePaginationActions from "../../../../../components/UI/Dashboard/Table/TablePagination/TablePagination";
import Loader from "../../../../../components/UI/Loader/Loader";
import axios from '../../../../../utils/axios-instance';
import CreateSeat from "../CreateSeat/CreateSeat";
import EditSeat from "../EditSeat/EditSeat";

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

export const SeatStatus = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 30px;
    padding: 3px 10px;
    border-radius: 12px;
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 14px;
    text-transform: capitalize;
    font-weight: 500;
    &.in-progress {
        background-color: ${({ theme }) => theme.palette.primary.main};
    }
    &.solved {
        background-color: ${({ theme }) => theme.palette.success.main};
    }
    &.closed {
        background-color: ${({ theme }) => theme.palette.secondary.main};
    }
    &.duplicate {
        background-color: ${({ theme }) => theme.palette.error.main};
    }
`

const intialRowsPerPage = 10;

const SeatsTable = props => {

    const { t } = useTranslation()

    const [seats, setSeats] = useState({ data: [] })
    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(intialRowsPerPage)
    const [searchWord, setSearchWord] = useState('')

    const [editSeatOpened, setEditSeatOpened] = useState(false)
    const [createSeatOpened, setCreateSeatOpened] = useState(false)

    const [creatingSeatSuccess, setCreatingSeatSuccess] = useState(false)

    const [selectedSeat, setSelectedSeat] = useState(null)

    const fetchSeats = useCallback((searchParams) => {
        const notEmptySearchParams = {};
        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        setLoading(true)
        axios.get(`/vendors/seats?include[]=location`, {
            params: { ...notEmptySearchParams },
        })
            .then(res => {
                setLoading(false)
                setSeats(res.data)
            }
            )
            .catch(err => {
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        fetchSeats({ page: page + 1, term: searchWord, per_page: rowsPerPage, order_by: 'id' })
    }, [fetchSeats, page, rowsPerPage, searchWord])

    const openCreateSeatHandler = useCallback(() => {
        setCreateSeatOpened(true)
    }, [])
    const closeCreateSeatHandler = useCallback(() => {
        setCreateSeatOpened(false)
    }, [])

    const createSeatConfirmHandler = useCallback((data) => {
        setCreatingSeatSuccess(false)
        axios.post('/vendors/seats', data)
            .then(response => {
                setCreatingSeatSuccess(true)
                setCreateSeatOpened(false)
                fetchSeats({ page: page + 1, term: searchWord, per_page: rowsPerPage, order_by: 'id', order_dir: 'desc' })
                toast.success(t('Seat Created'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
            .catch(error => {
                setCreatingSeatSuccess(false)
                const errs = error.response?.data.errors;
                for (let key in errs) {
                    toast.error(errs[key][0], {
                        position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                        closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                    });
                }
            });
    }, [fetchSeats, page, rowsPerPage, searchWord, t])

    const deleteSeatHandler = useCallback((id) => {
        axios.delete(`/vendors/seats/${id}`)
            .then(res => {
                fetchSeats({ page: page + 1, term: searchWord, per_page: rowsPerPage, order_by: 'id' })
                toast.success(t('Seat Deleted'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
            .catch(err => {
                toast.error(t('Failed Deleting Seat'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }, [fetchSeats, page, rowsPerPage, searchWord, t])

    const openEditSeatHandler = useCallback((seat) => {
        setEditSeatOpened(true)
        setSelectedSeat(seat)
    }, [])
    const closeEditSeatHandler = useCallback(( ) => {
        setEditSeatOpened(false)
        setSelectedSeat(null)
    }, [])
    const editSeatConfirmHandler = useCallback((data) => {
        axios.put(`/vendors/seats/${data.id}`, data )
            .then(res => {
                setEditSeatOpened(false)
                setSelectedSeat(null)
                toast.success(t('Seat Details Updated'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
                fetchSeats({ page: page + 1, term: searchWord, per_page: rowsPerPage, order_by: 'id' })
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
    }, [fetchSeats, page, rowsPerPage, searchWord, t])

    /* const viewSeatHandler = ( id ) => {
        navigate(`${id}`)
    } */

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

    if (!loading && seats.data.length === 0) {
        content = (
            <SearchMessage height='400px'>{t('No Seats Found')}</SearchMessage>
        )
    }
    if (!loading && seats.data.length > 0) {
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
                                    <TableCell align="center" >{t('location')}</TableCell>
                                    <TableCell align="center" >{t('status')}</TableCell>
                                    <TableCell align="center" >{t('commission')}</TableCell>
                                    <TableCell align="center" >{t('action')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {seats.data.map((seat, index) => {
                                    return (
                                        <TableRow key={seat.id}>
                                            <TableCell align="center" >{index + 1}</TableCell>
                                            <TableCell align="center" >{seat.title}</TableCell>
                                            <TableCell align="center" >{seat.location.name}</TableCell>
                                            <TableCell align="center" >
                                                <SeatStatus className={seat.status}>
                                                    {t(seat.status)}
                                                </SeatStatus>
                                            </TableCell>
                                            <TableCell align="center" >{`${seat.commission} %`}</TableCell>
                                            <TableCell align="center" >
                                                <Actions edit remove
                                                    editHandler={openEditSeatHandler.bind(null, seat)}
                                                    removeHandler={deleteSeatHandler.bind(null, seat.id)}
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
                            count={seats.data.length}
                            total={seats.meta ? seats.meta.total : 0}
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
                <CreateBtn onClick={openCreateSeatHandler} >{t('Create Seat')}</CreateBtn>
                <CreateSeat show={createSeatOpened} addSuccess={creatingSeatSuccess}
                    onClose={closeCreateSeatHandler} onConfirm={createSeatConfirmHandler}
                    heading='create new seat' confirmText='create' />
            </ActionsHolder>
            {content}
            {editSeatOpened && selectedSeat && (
                <EditSeat show={editSeatOpened} seatId={selectedSeat.id}
                    onClose={closeEditSeatHandler} confirmText='save changes'
                    onConfirm={editSeatConfirmHandler} />
            )}
        </Fragment>
    )
}
export default SeatsTable