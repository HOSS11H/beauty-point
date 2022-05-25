import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { format } from 'date-fns';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CustomButton } from '../../../../../../../components/UI/Button/Button';

const FiltersWrapper = styled.div`
    margin-bottom: 30px;
`
const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;
`
const FilterButton = styled(CustomButton)`
    &.MuiButton-root {
        margin-right: 20px;
        width: auto;
        padding: 0 10px;
        height: 56px;
        flex-shrink: 0;
        margin-bottom: 0;
        &:last-child {
            margin-right: 0;
        }
    }
`
const ResetButton = styled(CustomButton)`
    &.MuiButton-root {
        margin-right: 20px;
        width: auto;
        padding: 0 10px;
        height: 56px;
        flex-shrink: 0;
        margin-bottom:0;
        background-color: ${(props) => props.theme.palette.error.main};
        &:last-child {
            margin-right: 0;
        }
    }
`

const SearchFilters = (props) => {

    const { handleFilters } = props;

    const { t } = useTranslation()

    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());

    const handleDateFromChange = (val) => {
        const formattedVal = format(val, 'yyyy-MM-dd')
        setDateFrom(formattedVal);
    }
    const handleDateToChange = (val) => {
        const formattedVal = format(val, 'yyyy-MM-dd')
        setDateTo(formattedVal);
    }

    const ConfirmFilteringHandler = () => {
        const selectedSearchParams = {
            from_date: dateFrom,
            to_date: dateTo,
        }
        handleFilters(selectedSearchParams);
    }

    const resetFilteringHandler = () => {
        const searchParams = {
        }
        setDateFrom(new Date());
        setDateTo(new Date());
        handleFilters(searchParams);
    }


    return (
        <FiltersWrapper>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                            label={t("Date from")}
                            inputFormat="MM/dd/yyyy"
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
                            inputFormat="MM/dd/yyyy"
                            value={dateTo}
                            onChange={handleDateToChange}
                            renderInput={(params) => <TextField sx={{ width: '100%' }} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ActionsWrapper>
                        <FilterButton onClick={ConfirmFilteringHandler} endIcon={<FilterAltIcon />} >{t('filter')}</FilterButton>
                        <ResetButton onClick={resetFilteringHandler} endIcon={<RestartAltIcon />} >{t('reset')}</ResetButton>
                    </ActionsWrapper>
                </Grid>
            </Grid>
        </FiltersWrapper>
    )
}


export default SearchFilters;