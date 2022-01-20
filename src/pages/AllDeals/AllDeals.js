import { Container, Grid } from '@mui/material';
import styled from 'styled-components';
import { Heading } from "../../components/UI/Heading/Heading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealPanel from '../../components/UI/DealPanel/DealPanel';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import HomeLayout from '../../components/HomeLayout/HomeLayout';

const DealsWrapper = styled.section`
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

const AllDeals = props => {

    const { t } = useTranslation();
    const [deals, setDeals] = useState(null);

    useEffect(() => {
        axios.get('/deals?include[]=location&include[]=company')
            .then(res => {
                setDeals(res.data.data);
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
    if (deals) {
        content = (
            <Grid container spacing={2}>
                {
                    deals.map((deal, index) => {
                        return (
                            <Grid item xs={6} md={4} key={deal.id}>
                                <DealPanel deal={deal} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        );
    }
    return (
        <HomeLayout>
            <DealsWrapper>
                <Container maxWidth="lg">
                    <Heading>
                        <h2 className="heading-title" >{t('deals')}</h2>
                    </Heading>
                    {content}
                </Container>
            </DealsWrapper>
        </HomeLayout>
    )
}
export default AllDeals
