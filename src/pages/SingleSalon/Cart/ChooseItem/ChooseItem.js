import axios from '../../../../utils/axios-instance';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import styled, {css} from 'styled-components';
import Loader from '../../../../components/UI/Loader/Loader';
import { CircularProgress, Grid } from '@mui/material';
import { useCallback } from 'react';
import { formatCurrency } from '../../../../shared/utility';

const Wrapper = styled.div`
    
`

const ItemsWrapper = styled.div`
    width: 100%;
    max-height: 290px;
    overflow-y: auto;
    padding: 10px;
    // Scroll //
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
        height: 7px;
        width: 8px;
        background-color: ${({ theme }) => theme.palette.divider};
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        margin-left: 2px;
        background: ${({ theme }) => theme.vars.primary};
        border-radius: 10px;
        cursor: pointer;
    }
`

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
    border-radius: 15px;
    background-color: ${props => props.theme.vars.theme};
    border: 5px solid ;
    border-color: ${props => props.theme.vars.theme};;
    padding: 10px 15px;
    color: #fff;
    transition: 0.2s ease-in-out;
    cursor: pointer;
    text-align: left;
    span {
        margin-left: 5px;
        &.original-price {
            text-decoration: line-through;
            margin-left: 10px
        }
    }
    ${ ( { activeItem } ) => activeItem && css`
        background-color: #fff;
        border: 5px solid ${props => props.theme.vars.theme};
        color: ${props => props.theme.vars.theme};
    `}
`
const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`


const ChooseItem = props => {

    const { type, id, onChoose, cartData } = props;

    const [services, setServices] = useState([]);
    
    const [deals, setDeals] = useState([]);

    const [lastPage, setLastPage] = useState(false)
    const [loading, setLoading] = useState(true)

    // tracking on which page we currently are
    const [page, setPage] = useState(1)

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

    useEffect(() => {
        if (type === 'services') {
            setLoading(true)
            axios.get(`/companies/${id}/services?page=${page}&per_page=10`)
                .then(res => {
                    setLoading(false)
                    setServices(currentServices => {
                        return [...currentServices, ...res.data.data]
                    });
                    if (res.data.meta.last_page === page) {
                        setLastPage(true)
                    }
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err);
                })
        }
        if (type === 'deals') {
            setLoading(true)
            axios.get(`/companies/${id}/deals?page=${page}&per_page=10`)
                .then(res => {
                    setLoading(false)
                    setDeals(currentServices => {
                        return [...currentServices, ...res.data.data]
                    });
                    if (res.data.meta.last_page === page) {
                        setLastPage(true)
                    }
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err);
                })
        }
    }, [type, page, id])


    const onChooseService = (service) => {
        const serviceData = {
            id: service.id,
            price: service.discount_price,
            quantity: 1,
        }
        onChoose(serviceData)
    }
    const onChooseDeal = (deal) => {
        const dealData = {
            id: deal.id,
            price: deal.discount_price,
            quantity: 1,
        }
        onChoose(dealData)
    }


    let content = (
        <Loader height='300px' />
    )

    if (services.length > 0 && type === 'services') {
        content = (
            <Grid container spacing={2}>
                <Grid item xs={12}  >
                    <ItemsWrapper>
                        <div>
                            {services.map((service, index) => {
                                const activeItem = (cartData.services.find( item => item.id === service.id));
                                if (services.length === (index + 1)) {
                                    return (
                                        <Item ref={lastElementRef} key={index} onClick={() => onChooseService(service)} activeItem={activeItem} >
                                            {service.name}
                                            <div>
                                                <span>{formatCurrency(service.discount_price)}</span>
                                                { service.discount_price !== service.price && (<span className="original-price" >{formatCurrency(service.price)}</span>)} 
                                            </div>
                                        </Item>
                                    )
                                } else {
                                    return (
                                        <Item key={index} onClick={() => onChooseService(service)} activeItem={activeItem} >
                                            {service.name}
                                            <div>
                                                <span>{formatCurrency(service.discount_price)}</span>
                                                { service.discount_price !== service.price && (<span className="original-price" >{formatCurrency(service.price)}</span>)} 
                                            </div>
                                        </Item>
                                    )
                                }
                            })}
                        </div>
                        {!lastPage && (
                            <Loading>
                                <CircularProgress color="secondary" />
                            </Loading>
                        )}
                    </ItemsWrapper>
                </Grid>
            </Grid>
        )
    }
    if (deals.length > 0 && type === 'deals') {
        content = (
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <ItemsWrapper>
                        <div>
                            {deals.map((deal, index) => {
                                const activeItem = (!!cartData.deals.find( item => item.id === deal.id));
                                if (deals.length === (index + 1)) {
                                    return (
                                        <Item ref={lastElementRef} key={index} onClick={() => onChooseDeal(deal)} activeItem={activeItem} >
                                            {deal.title}
                                            <div>
                                                <span>{formatCurrency(deal.discount_price)}</span>
                                                { deal.discount_price !== deal.price && (<span className="original-price" >{formatCurrency(deal.price)}</span>)} 
                                            </div>
                                        </Item>
                                    )
                                } else {
                                    return (
                                        <Item key={index} onClick={() => onChooseDeal(deal)} activeItem={activeItem} >
                                            {deal.title}
                                            <div>
                                                <span>{formatCurrency(deal.discount_price)}</span>
                                                { deal.discount_price !== deal.price && (<span className="original-price" >{formatCurrency(deal.price)}</span>)} 
                                            </div>
                                        </Item>
                                    )
                                }
                            })}
                        </div>
                        {!lastPage && (
                            <Loading>
                                <CircularProgress color="secondary" />
                            </Loading>
                        )}
                    </ItemsWrapper>
                </Grid>
            </Grid>
        )
    }


    return (
        <Wrapper>
            {content}
        </Wrapper>
    )
}
export default ChooseItem;