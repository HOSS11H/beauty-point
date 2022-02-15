import { Container, Grid } from "@mui/material";
import { Heading } from "../../../components/UI/Heading/Heading";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios-instance';
import { useTranslation } from "react-i18next";
import HomeLayout from "../../../components/HomeLayout/HomeLayout";
import CategoryPanel from "../../../components/UI/CategoryPanel/CategoryPanel";
import Loader from "../../../components/UI/Loader/Loader";

const CategoriesWrapper = styled.section`
    padding: 74px 0 88px;
    @media screen and (max-width: 899.98px) {
        padding: 25px 0 15px;
    }
`


const AllCategories = props => {

    const { t } = useTranslation();

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true)
        axios.get('/categories', {
            signal: controller.signal
        })
            .then(res => {
                setLoading(false)
                setServices(res.data.data);
            })
            .catch(err => {
                setLoading(false)
                //console.log(err);
            })
        return () => {
            controller.abort();
        }
    }, [])
    let content ;
    if (loading) {
        content = (
            <Loader height='200px' />
        );
    }
    if (services.length > 0) {
        content = services.map((category, index) => (
            <Grid item xs={3} lg={2} key={index}>
                <CategoryPanel key={index} category={category} path='../categories' />
            </Grid>
        ))
    }
    return (
        <HomeLayout>
            <CategoriesWrapper>
                <Container maxWidth="lg">
                    <Heading className='heading-2'>
                        <h2 className="heading-title">{t('all categories')}</h2>
                    </Heading>
                    <Grid container spacing={2}>
                        {content}
                    </Grid>
                </Container>
            </CategoriesWrapper>
        </HomeLayout>
    )
}
export default AllCategories;
