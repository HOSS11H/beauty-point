import { Container } from "@mui/material";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import HomeLayout from "../../components/HomeLayout/HomeLayout";
import SingleCard from "../../components/UI/SingleCard/SingleCard";

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

const CustomCard = styled(Card)`
    display: flex;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;;
    @media screen and (max-width: 599.98px) {
        flex-direction: column;
    }
    .card-content {
        display: flex;
        flex-direction: column;
        flex-basis: 50%;
        flex-shrink: 0;
        padding-top: 25px;
        .card-title {
            margin-bottom: 35px;
            h1 {
                font-size: 34px;
                font-weight: 500;
                line-height: 1.1;
                margin-bottom: 10px;
                text-transform: capitalize;
                color: ${ props => props.theme.palette.text.primary};
            }
            h2 {
                font-size: 24px;
                font-weight: 500;
                line-height: 1.1;
                text-transform: uppercase;
                color: ${ props => props.theme.vars.primary};
                cursor: pointer;
            }
        }
    }
`

const SingleService = props => {

    const { t } = useTranslation();

    const param = useParams();


    const [service, setService] = useState();


    useEffect(() => {
        axios.get(`/services/${param.serviceId}?include[]=company&include[]=location`)
            .then(res => {
                setService(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [param.serviceId])
    let content = (
        <Loader>
            <CircularProgress color="secondary" />
        </Loader>
    );
    if (service) {
        content = (
            <SingleCard image={service.image} title={service.name} name={service.company.companyName} compnyId={service.company.id}
                price={service.price} time={service.time} timeType={service.time_type} location={service.location.name} />
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
export default SingleService;