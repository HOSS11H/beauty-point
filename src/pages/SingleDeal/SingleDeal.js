import { Container, Grid } from "@mui/material";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";
import { formatCurrency } from "../../shared/utility";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PushPinIcon from '@mui/icons-material/PushPin';
import Typography from '@mui/material/Typography';
import HomeLayout from "../../components/HomeLayout/HomeLayout";
import SingleCard from "../../components/UI/SingleCard/SingleCard";

const CategoriesWrapper = styled.section`
    padding: 70px 0px;
`
const HeroImage = styled.div`
    height: 40vh;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(150, 36, 142, 0.27);
        z-index:0;
    }
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(56, 56, 56, 0.72) 0%, rgba(255, 255, 255, 0) 50%);
        z-index:0;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
`

const CustomCard = styled(Card)`
    @media screen and (max-width: 599.98px) {
        flex-direction: column;
    }
`

const SingleDeal = props => {

    const { t } = useTranslation();

    const param = useParams();


    const [deal, setDeal] = useState();


    useEffect(() => {
        axios.get(`/deals/${param.dealId}?include[]=location&include[]=company`)
            .then(res => {
                setDeal(res.data);
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
    if (deal) {
        content = (
            <SingleCard image={deal.image} title={deal.title} name={deal.company.companyName} compnyId={deal.company.id}
                price={deal.price} time={`${t('from')} ${deal.open_time} ${t('to')} ${deal.close_time}`} location={deal.location.name} />
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
export default SingleDeal;