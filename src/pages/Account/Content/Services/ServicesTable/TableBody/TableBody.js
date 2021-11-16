import styled from 'styled-components';
import Actions from '../../../../../../components/UI/Dashboard/Actions/Actions';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


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

const EnhancedTableBody = props => {

    const {fetchedServices, emptyRows, deleteModalOpenHandler} = props;


    return (
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
                            <Actions edit remove view
                                editHandler={() => { }}
                                removeHandler={deleteModalOpenHandler.bind(null, row.id)}
                                viewHandler={() => { }}
                            />
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
                    <TableCell colSpan={9} />
                </TableRow>
            )}
        </TableBody>
    )
}
export default EnhancedTableBody;