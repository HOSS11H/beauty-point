import { Container, Grid } from "@mui/material";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import {  useParams } from "react-router-dom";
import HomeLayout from "../../../components/HomeLayout/HomeLayout";
import ServicePanel from "../../../components/UI/ServicePanel/ServicePanel";

const CategoriesWrapper = styled.section`
    padding: 70px 0px;
`

const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
`

const SingleCategory = props => {

    const param = useParams();

    
    const [category, setCategory ] = useState();
    

    useEffect(() => {
        axios.get(`/categories/${param.categoryId}/services?include[]=company`)
            .then(res => {
                setCategory(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    let content= (
        <Loader>
            <CircularProgress color="secondary" />
        </Loader>
    );
    if (category) {
        content = category.data.map((service, index) => (
            <Grid item xs={6} md={4} key={index}>
                <ServicePanel service={service} path='../services' />
            </Grid>
        ))
    }
    return (
        <HomeLayout>
            <CategoriesWrapper>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {content}
                    </Grid>
                </Container>
            </CategoriesWrapper>
        </HomeLayout>
    )
}
export default SingleCategory;