import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../../../../../../../store/theme-context";
import DateAdapter from '@mui/lab/AdapterMoment';
import { useTranslation } from "react-i18next";
import moment from "moment";
import styled from "styled-components";

const Wrapper = styled.div`
    margin-bottom: 35px;
`


const SearchFilters = props => {
    const {locations, searchHandler} = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext);
    const { city } = themeCtx;

    const [location, setLocation] = useState(city);

    const [dateFrom, setDateFrom] = useState(moment().subtract(3, 'months'));
    const [dateTo, setDateTo] = useState(moment());

    useEffect(() => {
        searchHandler(location, dateFrom.format('YYYY-MM-DD'), dateTo.format('YYYY-MM-DD'));
    }, [dateFrom, dateTo, location, searchHandler])

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };
    const handleDateFromChange = (val) => {
        setDateFrom(val);
    };
    const handleDateToChange = (val) => {
        setDateTo(val);
    };


    return (
        <Wrapper>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                            label={t("Date from")}
                            inputFormat="YYYY-MM-DD"
                            value={dateFrom}
                            onChange={handleDateFromChange}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                            label={t("Date to")}
                            inputFormat="YYYY-MM-DD"
                            value={dateTo}
                            onChange={handleDateToChange}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel id="item-location">{t('location')}</InputLabel>
                        <Select
                            labelId="item-location"
                            id="item-location-select"
                            value={location}
                            label={t("location")}
                            onChange={handleLocationChange}
                        >
                            {
                                locations.map(location => {
                                    return <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Wrapper>
    )
}
export default SearchFilters;