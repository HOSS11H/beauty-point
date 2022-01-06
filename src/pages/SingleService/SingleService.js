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
    @media screen and (max-width: 599.98px) {
        flex-direction: column;
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
    }, [])
    let content = (
        <Loader>
            <CircularProgress color="secondary" />
        </Loader>
    );
    if (service) {
        content = (
            <CustomCard sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' , flexDirection: 'column', flexBasis: '50%', flexShrink: '0' }}>
                    <CardContent sx={{ flex: '1 0 auto', }}>
                        <Typography component="div" variant="h4" color="primary" sx={{ marginBottom: '20px' }}>
                            {service.company.companyName}
                        </Typography>
                        <Typography component="div" variant="h5" sx={{ marginBottom: '10px' }} >
                            {service.name}
                        </Typography>
                        <Typography variant="subtitle1" color="secondary" component="div" sx={{ marginBottom: '10px' }} >
                            {formatCurrency(service.price)}
                        </Typography>
                        <Typography component="div" variant="subtitle2" sx={{ display: 'flex', alignItems: 'center'}}>
                            <WatchLaterIcon sx={{ mr: 1, width:'15px', height:'15px' }} />{service.time} {t(service.time_type)}
                        </Typography>
                        <Typography component="div" variant="subtitle2" sx={{ display: 'flex', alignItems: 'center'}}>
                            <PushPinIcon sx={{ mr: 1, width:'15px', height:'15px' }} />{service.location.name} 
                        </Typography>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ flexBasis: '50%', flexGrow:'0', maxHeight: '500px' }}
                    image={service.image}
                    alt={service.name}
                />
            </CustomCard>
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