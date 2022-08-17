import { Card } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import styled from "styled-components";
import axios from '../../../../../utils/axios-instance';
import CartItem from "./CartItem/CartItem";
import ChooseCustomer from "./ChooseCustomer/ChooseCustomer";

const Wrapper = styled(Card)`
    &.MuiPaper-root {
        padding: 8px;
    }
`

const ItemsWrapper = styled.div`
    margin-top: 5px;
`
const rowsPerPage = 20;

const Cart = props => {

    const { items, removeItem, increaseItem, decreaseItem, changePrice, changeEmployee, resetCart } = props; 

    const { t } = useTranslation();

    const defaultCustomer = useMemo( () => {
        return {
            id: '',
            name: t('passing customer'),
        }
    }, [t])
    const [customerData, setCustomerData] = useState(defaultCustomer);

    const [ employees, setEmployees ] = useState([])
    const [ loadingEmployees, setLoadingEmployees] = useState(false);
    
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(false)
    
    const ovserver = useRef()
    
    const lastElementRef = useCallback((node) => {
        if (loadingEmployees) return;
        if (ovserver.current) ovserver.current.disconnect()
        ovserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !lastPage) {
                setPage(_page => _page + 1)
            }
        })
        if (node) ovserver.current.observe(node)
    }, [lastPage, loadingEmployees])
    
    const fetchEmployees = useCallback( ( searchParams ) => {
        const notEmptySearchParams = {};
        for (let key in searchParams) {
            if (searchParams[key] !== '') {
                notEmptySearchParams[key] = searchParams[key]
            }
        }
        setLoadingEmployees(true)
        axios.get(`/vendors/employees`, {
            params: { ...notEmptySearchParams },
        }).then(response => {
            setEmployees(currentSeats => {
                return [...currentSeats, ...response.data.data]
            })
            if (response.data.meta.last_page === page) {
                setLastPage(true)
            }
            setLoadingEmployees(false)
        })
        .catch(err => {
            toast.error(t('Error Getting Employees'))
            setLoadingEmployees(false)
        })
    }, [page, t])
    
    useEffect(() => {
        const params = {
            page: page ,
            per_page: rowsPerPage,
        }
        fetchEmployees(params )
    }, [fetchEmployees, page])
    
    const customerAddHandler = useCallback((val) => {
        setCustomerData(val)
    }, [])
    const customerDeleteHandler = useCallback(() => {
        setCustomerData(defaultCustomer)
    }, [defaultCustomer])

    const formatedItems = useMemo(() => {
        let returnedItems= [];
        Object.keys(items).forEach( item => {
            returnedItems.push(...items[item])
        } )
        return returnedItems
    },[items] )

    return (
        <Wrapper>
            <ChooseCustomer customerData={customerData} chooseCustomer={customerAddHandler} deleteCustomer={customerDeleteHandler}  />
            <ItemsWrapper>
                {formatedItems.map( (item, index)  => {
                    return (
                        <CartItem key={index} item={item} remove={removeItem} increase={increaseItem} decrease={decreaseItem} 
                            type={item.type} changePrice={changePrice} changeEmployee={changeEmployee} 
                            employees={employees} lastElementRef={lastElementRef}  />
                    )
                })}
            </ItemsWrapper>
        </Wrapper>
    )
}
export default Cart;