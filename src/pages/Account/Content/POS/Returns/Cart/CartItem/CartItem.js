import DeleteIcon from '@mui/icons-material/Delete';
import { AccordionSummary, IconButton, Paper } from "@mui/material";
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { TableData } from '../../../../../../../components/UI/Dashboard/Table/Table';
import { formatCurrency } from '../../../../../../../shared/utility';
import Increment from './Increment/Increment';

const CustomAccordion = styled(Paper)`
        & .MuiAccordionSummary-root {
            padding: 0 4px;
            cursor: unset;
            & .MuiAccordionSummary-content {
                margin: 3px 0;
                gap: 8px;
                align-items: center;
            }
        }
`

const CartItem = props => {

    const { item, remove, increase, type} = props;

    return (
        <CustomAccordion >
            <AccordionSummary>
                <Box sx={{ flexBasis: '200px' }} >
                    <TableData>
                        {item.name}
                    </TableData>
                </Box>
                <Box>
                    <Increment id={item.id} type={type} increment={increase} value={item.quantity} />
                </Box>
                <Box sx={{ flexBasis: '75px' }} >
                    <TableData>{formatCurrency(item.quantity * item.price)}</TableData>
                </Box>
                <Box>
                    <IconButton color='error' onClick={() => remove(type, item.id)} >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </AccordionSummary>
        </CustomAccordion>
    )
}
export default CartItem;