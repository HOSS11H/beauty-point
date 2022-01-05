import axios from '../../../../utils/axios-instance';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
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
    &.active {
        background-color: #fff;
        border: 5px solid ${props => props.theme.vars.theme};
        color: ${props => props.theme.vars.theme};
    }
`
const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const ItemView = styled.div`
    text-align: left;
    h3 {
        font-size: 20px;
        line-height: 1.5;
        color: ${props => props.theme.vars.theme};
        margin-bottom: 15px;
    }
    p {
        font-size: 16px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 1);
    }
`
const ItemPrice = styled.div`
    display: flex;
    align-items: center;
    p {
        font-size: 17px;
        line-height: 1.5;
        color: ${props => props.theme.vars.theme};
        &.original-price {
            text-decoration: line-through;
            margin-left: 10px
        }
    }
`


const ChooseItem = props => {

    const { type, id, onChoose, selectedItems } = props;

    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    
    
    const [deals, setDeals] = useState([]);
    const [selectedDeal, setSelectedDeal] = useState(null);

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
        setSelectedService(service)
        onChoose(service)
    }
    const onChooseDeal = (service) => {
        setSelectedDeal(service)
        onChoose(service)
    }


    let content = (
        <Loader height='300px' />
    )

    if (services.length > 0 && type === 'services') {
        content = (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} >
                    <ItemsWrapper>
                        <div>
                            {services.map((service, index) => {
                                if (services.length === (index + 1)) {
                                    return (
                                        <Item ref={lastElementRef} key={service.id} onClick={() => onChooseService(service)} className={`${ (selectedItems?.indexOf(service.id) > -1) ? 'active' : ''  }`} >{service.name}</Item>
                                    )
                                } else {
                                    return (
                                        <Item key={service.id} onClick={() => onChooseService(service)} className={`${ (selectedItems?.indexOf(service.id) > -1) ? 'active' : ''  }`} >{service.name}</Item>
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
                <Grid item xs={12} sm={6} >
                    {
                        selectedService && (
                            <ItemView>
                                <h3>{selectedService.name}</h3>
                                <ItemPrice>
                                    <p>{formatCurrency(selectedService.discount_price)}</p>
                                    { selectedService.discount_price !== selectedService.price && (<p className="original-price" >{formatCurrency(selectedService.price)}</p>)} 
                                </ItemPrice>
                            </ItemView>
                        )
                    }
                </Grid>
            </Grid>
        )
    }
    if (deals.length > 0 && type === 'deals') {
        content = (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} >
                    <ItemsWrapper>
                        <div>
                            {deals.map((deal, index) => {
                                if (deals.length === (index + 1)) {
                                    return (
                                        <Item ref={lastElementRef} key={deal.id} onClick={() => onChooseDeal(deal)} className={`${ (selectedItems?.indexOf(deal.id) > -1) ? 'active' : ''  }`} >{deal.title}</Item>
                                    )
                                } else {
                                    return (
                                        <Item key={deal.id} onClick={() => onChooseDeal(deal)} className={`${ (selectedItems?.indexOf(deal.id) > -1) ? 'active' : ''  }`} >{deal.title}</Item>
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
                <Grid item xs={12} sm={6} >
                    {
                        selectedDeal && (
                            <ItemView>
                                <h3>{selectedDeal.title}</h3>
                                <ItemPrice>
                                    <p>{formatCurrency(selectedDeal.discount_price)}</p>
                                    { selectedDeal.discount_price !== selectedDeal.price && (<p className="original-price" >{formatCurrency(selectedDeal.price)}</p>)} 
                                </ItemPrice>
                            </ItemView>
                        )
                    }
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