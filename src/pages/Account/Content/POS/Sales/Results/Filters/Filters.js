import { Card, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { toast } from 'react-toastify'
import axios from 'axios';
import v2 from '../../../../../../../utils/axios-instance'
import v1 from '../../../../../../../utils/axios-instance-v1'
import ValidationMessage from '../../../../../../../components/UI/ValidationMessage/ValidationMessage';
import Loader from '../../../../../../../components/UI/Loader/Loader';
import { DebounceInput } from 'react-debounce-input';


const Wrapper = styled(Card)`
    &.MuiPaper-root {
        padding: 8px;
        height: max-content;
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
        & .MuiFormControl-root {
            min-width: 100px;
        } 
    }
`

const SearchWrapper = styled.div`
    flex-grow: 1;
    & .MuiFormControl-root {
        width: 100%;
    } 
`

const Filters = props => {
    const { t } = useTranslation()
    const { data, handleFiltersChange } = props;
    const [locations, setLocations] = useState([])
    const [categories, setCategories] = useState([])
    const [fetching, setFetching] = useState(false)


    const fetchData = useCallback(() => {
        setFetching(true);
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const categoriesEndpoint = `${v2.defaults.baseURL}/categories`;
        const locationsEndpoint = `${v1.defaults.baseURL}/locations`;

        const getCategories = axios.get(categoriesEndpoint, headers);
        const getLocations = axios.get(locationsEndpoint, headers);

        axios.all([getCategories, getLocations,])
            .then(axios.spread((...responses) => {
                setFetching(false);
                setCategories(responses[0].data.data)
                setLocations(responses[1].data)
            }))
            .catch(error => {
                setFetching(false);
                toast.error()
            });
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])


    const handleChange = (e) => {
        handleFiltersChange(e.target.name, e.target.value)
    }

    let content;

    if (fetching) {
        content = <Loader height='80.5px' />
    } else {
        content = (
            <Fragment>
                <SearchWrapper>
                    <DebounceInput element={TextField} debounceTimeout={500} id="item-search" label={t('search')} variant="standard" name='search' value={data.search} onChange={handleChange} />
                    <ValidationMessage exist small >{t('write at least 3 chars')}</ValidationMessage>
                </SearchWrapper>
                <FormControl variant="standard" >
                    <InputLabel id="item-type">{t('Type')}</InputLabel>
                    <Select
                        labelId="item-type"
                        id="item-type-select"
                        name='type'
                        value={data.type}
                        label={t("Type")}
                        onChange={handleChange}
                    >
                        <MenuItem value='services'>{t('Services')}</MenuItem>
                        <MenuItem value='products'>{t('Products')}</MenuItem>
                        <MenuItem value='deals'>{t('Deals')}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel id="item-location">{t('location')}</InputLabel>
                    <Select
                        labelId="item-location"
                        label={t('location')}
                        name='location'
                        id="item-location-select"
                        value={data.location}
                        onChange={handleChange}
                    >
                        {
                            locations.map(location => {
                                return <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                {
                    data.type === 'services' && (
                        <FormControl variant="standard">
                            <InputLabel id="item-category">{t('Category')}</InputLabel>
                            <Select
                                labelId="item-category"
                                id="item-category-select"
                                name='category'
                                value={data.category}
                                label={t('Category')}
                                onChange={handleChange}
                            >
                                <MenuItem value=''>{t('ALL')}</MenuItem>
                                {
                                    categories.map(category => {
                                        return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    )
                }
            </Fragment>
        )
    }

    return (
        <Wrapper>
            {content}
        </Wrapper>
    )
}
export default Filters;