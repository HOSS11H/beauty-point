import { Grid } from '@mui/material';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import SearchBar from '../../../../components/Search/SearchBar/SearchBar';
import SearchMessage from "../../../../components/Search/SearchMessage/SearchMessage";
import { CustomButton } from '../../../../components/UI/Button/Button';
import CouponCard from '../../../../components/UI/Dashboard/Coupon/Coupon';
import Loader from '../../../../components/UI/Loader/Loader';
import axios from '../../../../utils/axios-instance';
import CreateModal from './CreateModal/CreateModal';
import EditCoupon from './EditCoupon/EditCoupon';

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

const Coupons = props => {

    const { t } = useTranslation()

    const [coupons, setCoupons] = useState([])
    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(1)
    const [searchWord, setSearchWord] = useState('')
    const [lastPage, setLastPage] = useState(false)

    const [editCouponOpened, setEditCouponOpened] = useState(false)
    const [createCouponOpened, setCreateCouponOpened] = useState(false)

    const [creatingCouponSuccess, setCreatingCouponSuccess] = useState(false)

    const [selectedCoupon, setSelectedCoupon] = useState(null)

    const ovserver = useRef()

    const lastElementRef = useCallback((node) => {
        if (loading) return;
        if (ovserver.current) ovserver.current.disconnect()
        ovserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !lastPage) {
                setPage(_page => _page + 1)
            }
        })
        if (node) ovserver.current.observe(node)
    }, [lastPage, loading])

    const fetchCoupons = useCallback((searchParams) => {
        const notEmptySearchParams = {};
        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        setLoading(true)
        axios.get(`/vendors/coupons`, {
            params: { ...notEmptySearchParams },
        })
            .then(res => {
                setLoading(false)
                setCoupons(currentCoupons => {
                    return [...currentCoupons, ...res.data.data]
                })
                if (res.data.meta.last_page === page) {
                    setLastPage(true)
                }
            }
            )
            .catch(err => {
                setLoading(false)
            })
    }, [page])

    useEffect(() => {
        fetchCoupons({ page: page, term: searchWord, per_page: 10, order_by: 'id' })
    }, [fetchCoupons, page, searchWord])

    const openCreateCouponHandler = useCallback(() => {
        setCreateCouponOpened(true)
    }, [])
    const closeCreateCouponHandler = useCallback(() => {
        setCreateCouponOpened(false)
    }, [])

    const createCouponConfirmHandler = useCallback((data) => {
        setCreatingCouponSuccess(false)
        axios.post('/vendors/coupons', data)
            .then(response => {
                setCreatingCouponSuccess(true)
                setCreateCouponOpened(false)
                setCoupons(currentCoupons => {
                    return [response.data, ...currentCoupons]
                })
                toast.success(t('Coupon Created'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
            .catch(error => {
                setCreatingCouponSuccess(false)
                const errs = error.response?.data.errors;
                for (let key in errs) {
                    toast.error(errs[key][0], {
                        position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                        closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                    });
                }
            });
    }, [t])

    const deleteCouponHandler = useCallback((id) => {
        axios.delete(`/vendors/coupons/${id}`)
            .then(res => {
                setCoupons(currentCoupons => {
                    return currentCoupons.filter(coupon => coupon.id !== id)
                })
                setSelectedCoupon(null)
                setEditCouponOpened(false)
                toast.success(t('Coupon Deleted'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
            .catch(err => {
                toast.error(t('Failed Deleting Coupon'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }, [t])

    const openEditCouponHandler = useCallback((coupon) => {
        setEditCouponOpened(true)
        setSelectedCoupon(coupon)
    }, [])
    const closeEditCouponHandler = useCallback((data) => {
        setEditCouponOpened(false)
        setSelectedCoupon(null)
    }, [])
    const editCouponConfirmHandler = useCallback((coupon) => {
        axios.post(`/vendors/coupons/${coupon.get('id')}`, coupon, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                setEditCouponOpened(false)
                setSelectedCoupon(null)
                toast.success(t('Coupon Details Updated'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
                setCoupons([])
                setLastPage(false)
                setPage(1)
                fetchCoupons({ page: 1, term: searchWord, per_page: 10, order_by: 'id' })
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
    }, [t])

    const searchCutomersHandler = useCallback((lang, search) => {
        setCoupons([])
        setLastPage(false)
        setSearchWord(search)
        setPage(1)
    }, [])

    let content;

    if (loading && coupons.length === 0) {
        content = (
            <Loader height='90vh' />
        )
    }

    if (!loading && coupons.length === 0 && searchWord !== '') {
        content = (
            <SearchMessage>
                {t('No Coupons Found')}
            </SearchMessage>
        )
    }

    if (coupons.length > 0) {
        content = (
            <Grid container spacing={2}>
                {coupons.map((coupon, index) => {
                    if (coupons.length === (index + 1)) {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={index} ref={lastElementRef} >
                                <CouponCard coupon={coupon} onClick={openEditCouponHandler} />
                            </Grid>
                        )
                    } else {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <CouponCard coupon={coupon} onClick={openEditCouponHandler} />
                            </Grid>
                        )
                    }
                })}
            </Grid>
        )
    }

    return (
        <Fragment>
            <ActionsHolder>
                <SearchBar searchHandler={searchCutomersHandler} />
                <CreateBtn onClick={openCreateCouponHandler} >{t('Create Coupon')}</CreateBtn>
                <CreateModal show={createCouponOpened} addSuccess={creatingCouponSuccess}
                    onClose={closeCreateCouponHandler} onConfirm={createCouponConfirmHandler}
                    heading='create new coupon' confirmText='create' />
            </ActionsHolder>
            {content}
            {editCouponOpened && selectedCoupon && (
                <EditCoupon show={editCouponOpened} coupon={selectedCoupon}
                    heading='edit coupon details' deleteCoupon={deleteCouponHandler}
                    onClose={closeEditCouponHandler} confirmText='save changes'
                    onConfirm={editCouponConfirmHandler} />
            )}
        </Fragment>
    )
}
export default Coupons;