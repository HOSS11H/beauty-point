import { CircularProgress, Container, Grid } from "@mui/material";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios-instance';
import {  useParams } from "react-router-dom";
import HomeLayout from "../../../components/HomeLayout/HomeLayout";
import ServicePanel from "../../../components/UI/ServicePanel/ServicePanel";
import { useRef } from 'react';
import { useCallback } from 'react';
import Loader from "../../../components/UI/Loader/Loader";

const CategoriesWrapper = styled.section`
    padding: 70px 0px;
`


const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const SingleCategory = props => {

    const param = useParams();

    const [services, setServices ] = useState([]);

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
        setLoading(true)
        axios.get(`/categories/${param.categoryId}/services?include[]=company&page=${page}&per_page=10`)
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
                //console.log(err);
            })
    }, [page, param.categoryId])

    let content= (
        <Loader height='200px' />
    );
    if (services.length > 0) {
        content = (
            <Grid container spacing={2}>
                {
                    services.map((service, index) => {
                        if (services.length === (index + 1) ) {
                            return (
                                <Grid item xs={6} md={4} key={index} ref={lastElementRef} >
                                    <ServicePanel service={service} path='../services' />
                                </Grid>
                            )
                        } else {
                            return (
                                <Grid item xs={6} md={4} key={index}>
                                    <ServicePanel service={service} path='../services' />
                                </Grid>
                            )
                        }
                    })
                }
                {!lastPage && (
                    <Grid item xs={12} >
                        <Loading>
                            <CircularProgress color="secondary" />
                        </Loading>
                    </Grid>
                )}
            </Grid>
        ) 
    }
    return (
        <HomeLayout>
            <CategoriesWrapper>
                <Container maxWidth="lg">
                    {content}
                </Container>
            </CategoriesWrapper>
        </HomeLayout>
    )
}
export default SingleCategory;