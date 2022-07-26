import { Grid, TextField } from '@mui/material';
import axios from 'axios';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import styled, { css } from 'styled-components';
import SearchMessage from '../../../../components/Search/SearchMessage/SearchMessage';
import TablePaginationActions from '../../../../components/UI/Dashboard/Table/TablePagination/TablePagination';
import Loader from '../../../../components/UI/Loader/Loader';
import ServicePanel from "../../../../components/UI/ServicePanel/ServicePanel";
import v2 from '../../../../utils/axios-instance';

const Category = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 8px;
    border: 2px solid ${({ theme }) => theme.vars.theme};
    background-color: ${({ theme }) => theme.vars.theme};
    color: ${({ theme }) => theme.palette.common.white};
    margin-right: 5px;
    margin-bottom: 10px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    ${({ active }) => active && css`
        background-color: ${({ theme }) => theme.palette.common.white};
        color: ${props => props.theme.vars.theme};
    `}
    @media screen and (max-width: 599.98px) {
        flex-basis: 30%;
    }
`

const servicesRowsPerPage = 9

const Services = props => {

    const { salonId } = props;

    const { t } = useTranslation();

    const [searchTerm, setSearchTerm] = useState('')

    const [servicesPage, setServicesPage] = useState(0);

    const [services, setServices] = useState({ data: [] });
    const [loadingServices, setLoadingServices] = useState(false);

    const [categories, setCategories] = useState([])
    const [loadingCategories, setLoadingCategories] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState(null)



    useEffect(() => {
        setLoadingCategories(true);
        v2.get(`/categories`)
            .then(res => {
                setCategories(res.data.data);
                setLoadingCategories(false);
            })
            .catch(err => {
                //console.log(err);
            })
    }, [])

    useEffect(() => {
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const servicesEndpoint = `${v2.defaults.baseURL}/companies/${salonId}/services?page=${servicesPage + 1}&per_page=${servicesRowsPerPage}&category_id=${selectedCategory}&term=${searchTerm}`;

        const getServices = axios.get(servicesEndpoint, headers);

        setLoadingServices(true)
        axios.all([getServices])
            .then(axios.spread((...responses) => {
                setLoadingServices(false)
                setServices(responses[0].data)
            }))
            .catch(error => {
                setLoadingServices(false)
            });
    }, [salonId, searchTerm, selectedCategory, servicesPage])

    const handleServiceChangePage = useCallback((event, newPage) => {
        setServicesPage(newPage);
    }, []);

    const searchHandler = (e) => {
        setSearchTerm(e.target.value);
    }

    let servicesContent;
    let categoriesContent;

    if (loadingServices) {
        servicesContent = <Loader height='400px' />
    }
    if (loadingCategories) {
        categoriesContent = <Loader height='150px' />
    }
    if (!loadingServices && services.data.length === 0) {
        servicesContent = <SearchMessage height='150px' sx={{ mt:3 }} >{t('There is no services')}</SearchMessage>
    }
    if (!loadingCategories && categories.length === 0) {
        categoriesContent = <Fragment>
            <SearchMessage height='50px'  >{t('There is no categories')}</SearchMessage>
            <TextField id="outlined-basic" label={t('search')} variant="outlined" value={searchTerm} onChange={searchHandler} />
        </Fragment>
    }
    if (!loadingServices && services.data.length > 0) {
        servicesContent = <Fragment>
            <Grid container spacing={2} sx={{ mt: 3 }} >
                {services.data.map(service => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={service.id}>
                            <ServicePanel service={service} path='../services' />
                        </Grid>
                    )
                })
                }
            </Grid>
            <TablePaginationActions
                component="div"
                count={services.data.length}
                total={services.meta ? services.meta.total : null}
                rowsPerPage={servicesRowsPerPage}
                page={servicesPage}
                onPageChange={handleServiceChangePage}
                loading={loadingServices}
            />
        </Fragment>
    }
    if (!loadingCategories && categories.length > 0) {
        categoriesContent = <Fragment>
            <Grid container spacing={2} sx={{ mb: 3 }} >
                {categories.map((category, index) => {
                    return <Grid key={index} item xs="auto">
                        <Category active={selectedCategory === category.id} onClick={() => setSelectedCategory(category.id)}  >{category.name}</Category>
                    </Grid>
                })}
            </Grid>
            <TextField id="outlined-basic" label={t('search')} variant="outlined" value={searchTerm} onChange={searchHandler} />
        </Fragment>
    }


    return (
        <Fragment>
            {categoriesContent}
            {servicesContent}
        </Fragment>
    )
}
export default Services;