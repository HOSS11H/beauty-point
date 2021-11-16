import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import ThemeContext from '../../../../../../store/theme-context';
import CircularProgress from '@mui/material/CircularProgress';

const TablePaginationWrapper = styled.div`
    min-height: 52px;
    padding: 0 2px 0 24px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @media screen and (max-width: 500px) {
        flex-direction: column;
        justify-content: center;
        padding: 15px 0;
    }
`
const PaginationData = styled.p`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-bottom: 0px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    &.divider {
        margin: 0 5px;
    }
`


function TablePaginationActions(props) {

    const { t } = useTranslation()

    const themeCtx = useContext(ThemeContext);
    const { count, page, rowsPerPage, onPageChange, total, loading } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(total / rowsPerPage) - 1));
    };

    return (
        <TablePaginationWrapper>
            <Box sx={{ flexShrink: 0, mr: 2.5 }}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {themeCtx.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                >
                    {themeCtx.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(total / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {themeCtx.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(total / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {themeCtx.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </Box>
            <Box sx={{ flexShrink: 0, pr: 2.5, display: 'flex', alignItems: 'center'}} >
                <PaginationData>{(page*rowsPerPage) + 1}</PaginationData>
                <PaginationData>-</PaginationData>
                <PaginationData>{ !loading ? ( (page*rowsPerPage) + count) : <CircularProgress size={14} /> }</PaginationData>
                <PaginationData className='divider' >{ t('of') }</PaginationData>
                <PaginationData>{total}</PaginationData>
            </Box>
        </TablePaginationWrapper>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default TablePaginationActions;