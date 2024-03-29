import { Grid } from '@mui/material';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState, } from 'react';
import { fetchCategories, fetchLocations } from '../../../../../store/actions/index';
import { connect } from 'react-redux';
import ThemeContext from '../../../../../store/theme-context';
import { DebounceInput } from 'react-debounce-input';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';

const CustomTextField = styled(TextField)`
    width: 100%;
`
const FiltersWrapper = styled.div`
    margin-bottom: 30px;
`

const SearchFilters = (props) => {

    const { resultsHandler, fetchedLocations, fetchedCategories, fetchCategoriesHandler, fetchLocationsHandler } = props;

    const { t } = useTranslation()

    const themeCtx = useContext(ThemeContext)

    const { lang, city, selectCity } = themeCtx

    const [type, setType] = useState('services');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState(city);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (fetchedLocations.length === 0) {
            fetchLocationsHandler(lang);
        }
        if (fetchedCategories.length === 0) {
            fetchCategoriesHandler(lang);
        }
    }, [fetchedLocations, fetchedCategories, fetchCategoriesHandler, fetchLocationsHandler, lang])
    
    const handleTypeChange = (event) => {
        setType(event.target.value);
        resultsHandler(event.target.value, category, location, search);
    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        resultsHandler(type, event.target.value, location, search);
    };
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
        selectCity(event.target.value);
        resultsHandler(type, category, event.target.value, search);
    };
    const handleSearchChange = (event) => {
        if (event.target.value.length < 3 && event.target.value.length > 0) {
            return;
        } else {
            setSearch(event.target.value);
            resultsHandler(type, category, location, event.target.value);
        }
    }

    return (
        <FiltersWrapper>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="item-type">{t('Type')}</InputLabel>
                        <Select
                            labelId="item-type"
                            id="item-type-select"
                            value={type}
                            label={t("Type")}
                            onChange={handleTypeChange}
                        >
                            <MenuItem value='services'>{t('Services')}</MenuItem>
                            <MenuItem value='products'>{t('Products')}</MenuItem>
                            <MenuItem value='deals'>{t('Deals')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="item-location">{t('location')}</InputLabel>
                        <Select
                            labelId="item-location"
                            label={t('location')}
                            id="item-location-select"
                            value={location}
                            onChange={handleLocationChange}
                        >
                            {
                                fetchedLocations.map(location => {
                                    return <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                {
                    type === 'services' && (
                        <Grid item xs={6} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="item-category">{t('Category')}</InputLabel>
                                <Select
                                    labelId="item-category"
                                    id="item-category-select"
                                    value={category}
                                    label={t('Category')}
                                    onChange={handleCategoryChange}
                                >
                                    <MenuItem value=''>{t('ALL')}</MenuItem>
                                    {
                                        fetchedCategories.map(category => {
                                            return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    )
                }
                <Grid item xs={12} sm={6}>
                    <DebounceInput element={CustomTextField} debounceTimeout={500} id="item-search" label={t('search')} variant="outlined" value={search} onChange={handleSearchChange} />
                    <ValidationMessage exist>{t('write at least 3 chars')}</ValidationMessage>
                </Grid>
            </Grid>
        </FiltersWrapper>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedLocations: state.locations.locations,
        fetchedCategories: state.categories.categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoriesHandler: (lang) => dispatch(fetchCategories(lang)),
        fetchLocationsHandler: (lang) => dispatch(fetchLocations(lang)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters);