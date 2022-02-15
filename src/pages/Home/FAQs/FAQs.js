import { Container, Grid } from "@mui/material";
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import v1 from '../../../utils/axios-instance-v1';
import CircularProgress from '@mui/material/CircularProgress';
import HomeLayout from "../../../components/HomeLayout/HomeLayout";
import { useRef } from 'react';
import { useCallback } from 'react';
import Loader from "../../../components/UI/Loader/Loader";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import ThemeContext from "../../../store/theme-context";
import { Heading } from "../../../components/UI/Heading/Heading";
import DOMPurify from "dompurify";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQsWrapper = styled.section`
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

const FAQs = props => {
    const { t } = useTranslation();
    const [faqs, setFAQs] = useState([]);

    const [lastPage, setLastPage] = useState(false)
    const [loading, setLoading] = useState(true)

    const themeCtx = useContext(ThemeContext);
    const { city } = themeCtx;

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
        v1.get(`/faq?page=${page}&per_page=10`)
            .then(res => {
                setLoading(false)
                setFAQs(currentFAQs => {
                    return [...currentFAQs, ...res.data.data]
                });
                if (res.data.last_page === page) {
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
    if (faqs.length > 0) {
        content = (
            <Grid container spacing={2}>
                {
                    faqs.map((faq, index) => {
                        const mySafeHTML = DOMPurify.sanitize(faq.answer);
                        if (faqs.length === (index + 1)) {
                            return (
                                <Grid item xs={12} key={faq.id} ref={lastElementRef} >
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>{faq.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails dangerouslySetInnerHTML={{ __html: mySafeHTML }} />
                                    </Accordion>
                                </Grid>
                            )
                        } else {
                            return (
                                <Grid item xs={12} key={faq.id}>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>{faq.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails dangerouslySetInnerHTML={{ __html: mySafeHTML }} />
                                    </Accordion>
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
            <FAQsWrapper>
                <Container maxWidth="lg">
                    <Heading>
                        <h2 style={{ textAlign: 'center' }} className="heading-title" >{t('faqs')}</h2>
                    </Heading>
                    {content}
                </Container>
            </FAQsWrapper>
        </HomeLayout>
    )
}
export default FAQs;