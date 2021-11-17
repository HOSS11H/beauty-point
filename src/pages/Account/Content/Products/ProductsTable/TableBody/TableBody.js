import styled from 'styled-components';
import Actions from '../../../../../../components/UI/Dashboard/Actions/Actions';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


const ProductImg = styled.div`
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
        border-radius: 10px;
    }
`
const ProductData = styled.p`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-bottom: 0px;
`
const ProductStatus = styled.div`
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

    const {fetchedProducts, emptyRows, deleteModalOpenHandler} = props;


    return (
        <TableBody>
            {fetchedProducts.data.map((row, index) => {
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
                            <ProductImg>
                                <img src={row.product_image_url} alt="" />
                            </ProductImg>
                        </TableCell>
                        <TableCell align="center">
                            <ProductData>
                                {row.name}
                            </ProductData>
                        </TableCell>
                        <TableCell align="center">
                            <ProductData>
                                {row.location_id}
                            </ProductData>
                        </TableCell>
                        <TableCell align="center">
                            <ProductData>
                                {row.formated_price}
                            </ProductData>
                        </TableCell>
                        <TableCell align="center">
                            <ProductData>
                                {row.formated_discounted_price}
                            </ProductData>
                        </TableCell>
                        <TableCell align="center">
                            <ProductStatus>{row.status}</ProductStatus>
                        </TableCell>
                        <TableCell align="center">
                            <ProductData>{row.quantity}</ProductData>
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