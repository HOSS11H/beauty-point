import { Container } from "@mui/material";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from "react-router-dom";
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

const SingleService = props => {

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