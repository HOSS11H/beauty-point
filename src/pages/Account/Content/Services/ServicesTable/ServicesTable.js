import { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchServices } from '../../../../../store/actions/index';
import ThemeContext from '../../../../../store/theme-context';
import AuthContext from '../../../../../store/auth-context';
import Actions from '../../../../../components/UI/Dashboard/Actions/Actions';
import EnhancedTableHead from './TableHead/TableHead';
import TablePaginationActions from './TablePagination/TablePagination';

const ServicesTableWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    max-width: 100%;
    box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
    margin-bottom: 40px;
    background-color: ${({ theme }) => theme.palette.background.default};
    border-radius:20px;
    &:last-child{
        margin-bottom:0;
    }
    .MuiPaper-root {
        border-radius: 0;
        border-radius:20px;
        padding: 20px;
    }
`

export const SkeletonsWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const ServiceImg = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    flex-shrink: 0;
    cursor: pointer;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const ServiceData = styled.p`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-bottom: 0px;
`
const ServiceEmployees = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    li {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        padding: 0 10px;
        border-radius: 12px;
        color: ${({ theme }) => theme.palette.common.white};
        font-size: 14px;
        text-transform: capitalize;
        font-weight: 500;
        background-color: ${({ theme }) => theme.palette.info.main};
        margin-right: 5px;
        margin-bottom: 5px;
    }
`
const ServiceStatus = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    padding: 0 10px;
    border-radius: 12px;
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 14px;
    text-transform: capitalize;
    font-weight: 500;
    background-color: ${({ theme }) => theme.palette.success.main};
`

function ServicesTable(props) {

    const { fetchedServices, fetchServicesHandler, loadingServices } = props;

    const themeCtx = useContext(ThemeContext)
    const authCtx = useContext(AuthContext)

    const { lang } = themeCtx
    const { token } = authCtx

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    useEffect(() => {
        fetchServicesHandler(lang, token, page);
    }, [fetchServicesHandler, lang, token, page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Avoid a layout jump when reaching the last page with empty rows & On Initialize
    const emptyRows = (rowsPerPage - fetchedServices.data.length);
    console.log('services returned')
    return (
        <ServicesTableWrapper>
            <Paper sx={{ width: '100%', boxShadow: 'none' }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size='medium'
                    >
                        <EnhancedTableHead
                            rowCount={fetchedServices.data.length}
                        />
                        <TableBody>
                            {fetchedServices.data.map((row, index) => {
                                const labelId = `enhanced-table-Image-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                        >
                                            <ServiceImg>
                                                <img src={row.service_image_url} alt="" />
                                            </ServiceImg>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ServiceData>
                                                {row.name}
                                            </ServiceData>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ServiceData>
                                                {row.location.name}
                                            </ServiceData>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ServiceData>
                                                {row.category.name}
                                            </ServiceData>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ServiceData>
                                                {row.formated_price}
                                            </ServiceData>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ServiceData>
                                                {row.formated_discounted_price}
                                            </ServiceData>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ServiceEmployees>
                                                {
                                                    row.users.map((employee, index) => {
                                                        let loadedEmployees;
                                                        if (employee) {
                                                            loadedEmployees = (
                                                                <li key={employee.id}>{employee.name}</li>
                                                            )
                                                        }
                                                        return loadedEmployees;
                                                    })
                                                }
                                            </ServiceEmployees>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ServiceStatus>{row.status}</ServiceStatus>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Actions edit remove view editHandler={() => { }} removeHandler={() => { }} viewHandler={() => { }} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (133) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={9} >
                                        <SkeletonsWrapper>
                                        </SkeletonsWrapper>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePaginationActions
                    component="div"
                    count={fetchedServices.data.length}
                    total={fetchedServices.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    loading={loadingServices}
                />
            </Paper>
        </ServicesTableWrapper>
    );
}

const mapStateToProps = state => {
    return {
        fetchedServices: state.services.services,
        loadingServices: state.services.fetchingServices,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchServicesHandler: (language, token, page) => dispatch(fetchServices(language, token, page)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ServicesTable);