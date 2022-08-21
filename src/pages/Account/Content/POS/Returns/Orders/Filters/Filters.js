import { Card, TextField } from '@mui/material';
import { Fragment } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ValidationMessage from '../../../../../../../components/UI/ValidationMessage/ValidationMessage';


const Wrapper = styled(Card)`
    &.MuiPaper-root {
        padding: 8px;
        height: max-content;
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
        @media screen and (max-width: ${ ({ theme }) => theme.breakpoints.values.md }px ) {
            flex-wrap: wrap;
        }
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

    const handleChange = (e) => {
        handleFiltersChange(e.target.name, e.target.value)
    }

    let content = (
        <Fragment>
            <SearchWrapper>
                <DebounceInput element={TextField} debounceTimeout={500} id="item-search" label={t('search')} variant="standard" name='search' value={data.search} onChange={handleChange} />
                <ValidationMessage exist small >{t('write at least 3 chars')}</ValidationMessage>
            </SearchWrapper>
        </Fragment>
    )

    return (
        <Wrapper>
            {content}
        </Wrapper>
    )
}
export default Filters;