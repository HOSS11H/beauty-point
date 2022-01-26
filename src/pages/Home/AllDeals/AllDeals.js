import { Container, Grid } from '@mui/material';
import styled from 'styled-components';
import { Heading } from "../../../components/UI/Heading/Heading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealPanel from '../../../components/UI/DealPanel/DealPanel';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import HomeLayout from '../../../components/HomeLayout/HomeLayout';
import { useRef } from 'react';
import { useCallback } from 'react';

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
const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const AllDeals = props => {

    const { t } = useTranslation();
    const [deals, setDeals] = useState([]);

    const [lastPage, setLastPage] = useState(false)
    const [loading, setLoading] = useState(true)

    // tracking on which page we currently are
    const [page, setPage] = useState(1)


    const ovserver = useRef()
    const lastElementRef = useCallback((node) => {
        if (loading) return;
        if (ovserver.current) ovserver.current.disconnect()
        ovserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !lastPage) {
                setPage(_page => _page + 1)
            }
        })
        if (node) ovserver.current.observe(node)
    }, [lastPage, loading])

    useEffect(() => {
        setLoading(true)
        axios.get(`/deals?include[]=location&include[]=company&page=${page}&per_page=10`)
            .then(res => {
                setLoading(false)
                setDeals(currentDeals => {
                    return [...currentDeals, ...res.data.data]
                });
                if (res.data.meta.last_page === page) {
                    setLastPage(true)
                }
            })
            .catch(err => {
                setLoading(false)
                //console.log(err);
            })
    }, [page])


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
                if (deals.length === (index + 1)) {
                    return (
                        <Grid item xs={6} md={4} key={deal.id} ref={lastElementRef} >
                            <DealPanel deal={deal} path='../deals' />
                        </Grid>
                    )
                } else {
                    return (
                        <Grid item xs={6} md={4} key={deal.id}>
                            <DealPanel deal={deal} path='../deals' />
                        </Grid>
                    )
                }
            })
        }
        {!lastPage && (
            <Grid item xs={12} >
                <Loading>
                    <CircularProgress color="secondary" />
                </Loading>
            </Grid>
        )}
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
