import { Container, Grid } from '@mui/material';
import styled from 'styled-components';
import { Heading } from "../../components/UI/Heading/Heading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SalonPanel from '../../components/UI/SalonPanel/SalonPanel';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import HomeLayout from '../../components/HomeLayout/HomeLayout';

const SalonsWrapper = styled.section`
    margin: 100px 0;
    @media screen and (max-width: 899.98px) {
        margin: 70px 0;
    }
`
const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
`

const AllSaloons = props => {

    const { t } = useTranslation();
    const [salons, setSalons] = useState(null);

    useEffect(() => {
        axios.get('/companies')
            .then(res => {
                setSalons(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    let content = (
        <Loader>
            <CircularProgress color="secondary" />
        </Loader>
    );
    if (salons) {
        let fetchedSalons = [...salons];
        content = (
            <Grid container spacing={2}>
                {
                    fetchedSalons.map((salon, index) => {
                        return (
                            <Grid key={salon.id} item xs={6} md={4}>
                                <SalonPanel salon={salon} /> 
                            </Grid>
                        )
                    })
                }
            </Grid>
        );
    }

    return (
        <HomeLayout>
            <SalonsWrapper>
                <Container maxWidth="lg">
                    <Heading>
                        <h2 className="heading-title" >{t('popular saloons')}</h2>
                    </Heading>
                    {content}
                </Container>
            </SalonsWrapper>
        </HomeLayout>
    )
}
export default AllSaloons
