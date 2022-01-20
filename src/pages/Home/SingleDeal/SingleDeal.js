import { Container } from "@mui/material";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import HomeLayout from "../../../components/HomeLayout/HomeLayout";
import SingleCard from "../../../components/UI/SingleCard/SingleCard";

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