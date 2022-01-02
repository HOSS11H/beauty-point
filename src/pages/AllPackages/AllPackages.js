import { Container, Grid } from '@mui/material';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomeLayout from '../../components/HomeLayout/HomeLayout';



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
                            <Grid item xs={6} md={4}>
                            </Grid>
                        )
                    })
                }
            </Grid>
        );
    }

    return (
        <HomeLayout>
            Fuck
            {content}
        </HomeLayout>
    )
}
export default AllSaloons
