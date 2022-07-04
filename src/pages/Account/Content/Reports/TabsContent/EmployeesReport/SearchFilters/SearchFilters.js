import { DesktopDatePicker, LocalizationProvider, TimePicker } from "@mui/lab";
import DateAdapter from '@mui/lab/AdapterMoment';
import { Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Wrapper = styled.div`
    margin-bottom: 35px;
`


const SearchFilters = props => {
    const { dateFrom, dateTo, timeFrom, timeTo, handleDateFromChange, handleDateToChange, 
        handleTimeFromChange,  handleTimeToChange } = props;

    const { t } = useTranslation();


    return (
        <Wrapper>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
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
                <Grid item xs={12} sm={6} md={3}>
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
                <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <TimePicker
                            label={t("Time from")}
                            value={timeFrom}
                            onChange={handleTimeFromChange}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <TimePicker
                            label={t("Time to")}
                            value={timeTo}
                            onChange={handleTimeToChange}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
        </Wrapper>
    )
}
export default SearchFilters;