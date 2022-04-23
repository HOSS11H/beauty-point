import { Container, Grid } from '@mui/material';
import styled from 'styled-components';
import { Heading } from "../../../components/UI/Heading/Heading";
import SalonPanel from '../../../components/UI/SalonPanel/SalonPanel';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import HomeLayout from '../../../components/HomeLayout/HomeLayout';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import ThemeContext from '../../../store/theme-context';
import Loader from '../../../components/UI/Loader/Loader';

const ArtistsWrapper = styled.section`
    margin: 100px 0;
    @media screen and (max-width: 899.98px) {
        margin: 70px 0;
    }
`


const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const AllArtists = props => {

    const { t } = useTranslation();
    const [artists, setArtists] = useState([]);

    const [lastPage, setLastPage] = useState(false)
    const [loading, setLoading] = useState(true)

    const themeCtx = useContext(ThemeContext);
    const {city} = themeCtx;

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
        axios.get(`/artists?page=${page}&per_page=10&location_id=${city}`)
            .then(res => {
                setLoading(false)
                setArtists(currentArtists => {
                    return [...currentArtists, ...res.data.data]
                });
                if (res.data.meta.last_page === page) {
                    setLastPage(true)
                }
            })
            .catch(err => {
                setLoading(false)
                //console.log(err);
            })
    }, [city, page])


    let content = (
        <Loader height='200px' />
    );
    if (artists.length > 0) {
        content = (
            <Grid container spacing={2}>
                {
                    artists.map((artist, index) => {
                        if (artists.length === (index + 1)) {
                            return (
                                <Grid key={artist.id} item xs={6} md={4} ref={lastElementRef}>
                                    <SalonPanel salon={artist} path='../artists' />
                                </Grid>
                            )
                        } else {
                            return (
                                <Grid key={artist.id} item xs={6} md={4}>
                                    <SalonPanel salon={artist} path='../artists' />
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
            <ArtistsWrapper>
                <Container maxWidth="lg">
                    <Heading>
                        <h2 className="heading-title" >{t('popular artists')}</h2>
                    </Heading>
                    {content}
                </Container>
            </ArtistsWrapper>
        </HomeLayout>
    )
}
export default AllArtists
