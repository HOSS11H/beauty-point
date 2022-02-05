import { Grid } from '@mui/material';
import { Fragment } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import CustomerCard from '../../../../components/UI/Dashboard/Customer/Customer';
import Loader from '../../../../components/UI/Loader/Loader';
import axios from '../../../../utils/axios-instance';
import ShowCustomer from './ShowCustomer/ShowCustomer';
import EditCustomer from './EditCustomer/EditCustomer';
import SearchBar from '../../../../components/Search/SearchBar/SearchBar';


const Customers = props => {

    const { t } = useTranslation()

    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(1)
    const [searchWord, setSearchWord] = useState('')
    const [lastPage, setLastPage] = useState(false)

    const [showCustomerOpened, setShowCustomerOpened] = useState(false)
    const [editCustomerOpened, setEditCustomerOpened] = useState(false)

    const [selectedCustomer, setSelectedCustomer] = useState(null)

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

    const fetchCustomers = useCallback((searchParams) => {
        const notEmptySearchParams = {};
        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        setLoading(true)
        axios.get(`/vendors/customers`, { 
            params: { ...notEmptySearchParams },
        })
            .then(res => {
                setLoading(false)
                setCustomers(currentCustomers => {
                    return [...currentCustomers, ...res.data.data]
                })
                if (res.data.meta.last_page === page) {
                    setLastPage(true)
                }
            }
            )
            .catch(err => {
                setLoading(false)
                //console.log(err);
            })
    }, [page])

    useEffect(() => {
        fetchCustomers({ page: page, term: searchWord, per_page: 10 })
    }, [fetchCustomers, page, searchWord])

    const openShowCustomerHandler = useCallback((customer) => {
        setShowCustomerOpened(true)
        setSelectedCustomer(customer)
    }, [])
    const closeShowCustomerHandler = useCallback(() => {
        setShowCustomerOpened(false)
        setSelectedCustomer(null)
    }, [])

    const deleteCustomerHandler = useCallback((id) => {
        axios.delete(`/vendors/customers/${id}`)
            .then(res => {
                setCustomers(currentCustomers => {
                    return currentCustomers.filter(customer => customer.id !== id)
                })
                setSelectedCustomer(null)
                setShowCustomerOpened(false)
                toast.success(t('Customer Deleted'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
            .catch(err => {
                toast.error(t('Failed Deleting Customer'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }, [t])

    const openEditCustomerHandler = useCallback(() => {
        setShowCustomerOpened(false)
        setEditCustomerOpened(true)
    }, [])
    const closeEditCustomerHandler = useCallback((data) => {
        setEditCustomerOpened(false)
        setSelectedCustomer(null)
        if (data) {
            setCustomers(
                currentCustomers => {
                    let updatedCustomerIndex = currentCustomers.findIndexOf(customer => customer.id === data.id)
                    let updatedCustomers = [...currentCustomers]
                    let updatedCustomer = updatedCustomers[updatedCustomerIndex]
                    updatedCustomer = { ...updatedCustomer, ...data }
                    updatedCustomers[updatedCustomerIndex] = updatedCustomer
                    return updatedCustomers
                }
            )
        }
    }, [])

    const searchCutomersHandler = useCallback((lang, search) => {
        setCustomers([])
        setLastPage(false)
        setSearchWord(search)
        setPage(1)
    }, [])

    let content;

    if ( loading && customers.length === 0) {
        content = (
            <Loader height='90vh' />
        )
    }

    if ( customers.length > 0) {
        content = (
            <Grid container spacing={2}>
                {customers.map((customer, index) => {
                    if (customers.length === (index + 1)) {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={index} ref={lastElementRef} >
                                <CustomerCard customer={customer} onClick={openShowCustomerHandler} />
                            </Grid>
                        )
                    } else {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <CustomerCard customer={customer} onClick={openShowCustomerHandler} />
                            </Grid>
                        )
                    }
                })}
            </Grid>
        )
    }

    return (
        <Fragment>
            <SearchBar searchHandler={searchCutomersHandler} />
            {content}
            {showCustomerOpened && selectedCustomer && (
                <ShowCustomer show={showCustomerOpened} customer={selectedCustomer}
                    heading='view customer details' onDelete={deleteCustomerHandler} onConfirm={openEditCustomerHandler}
                    onClose={closeShowCustomerHandler} confirmText='edit customer details' />
            )}
            {editCustomerOpened && selectedCustomer && (
                <EditCustomer show={editCustomerOpened} customer={selectedCustomer}
                    heading='edit customer details'
                    onClose={closeEditCustomerHandler} confirmText='save changes' />
            )}
        </Fragment>
    )
}
export default Customers;