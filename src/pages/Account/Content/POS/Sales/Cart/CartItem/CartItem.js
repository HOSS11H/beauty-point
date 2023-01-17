import DeleteIcon from '@mui/icons-material/Delete';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { TableData } from '../../../../../../../components/UI/Dashboard/Table/Table';
import { formatCurrency } from '../../../../../../../shared/utility';
import Increment from './Increment/Increment';


const CustomTextField = styled(TextField)`
    width: 80px;
    & .MuiInputBase-input {
        -moz-appearance: textfield;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
`

const CustomAccordion = styled(Accordion)`
    &.MuiAccordion-root {
        & .MuiAccordionSummary-root {
            padding: 0 4px;
            cursor: unset;
            & .MuiAccordionSummary-content {
                margin: 3px 0;
                gap: 8px;
                align-items: center;
            }
        }
        & .MuiAccordionDetails-root {
            padding: 0 8px 8px;
        }
    }
`

const CartItem = props => {

    const { item, remove, increase, decrease, type, changePrice, changeEmployee, employees, lastElementRef } = props;

    const { t } = useTranslation()

    const [expanded, setExpanded] = useState(false)

    const [employeeName, setEmployeeName] = useState([]);

    const handleEmployeesChange = (event) => {
        const {
            target: { value },
        } = event;
        setEmployeeName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        if (value === '') return;
        changeEmployee(type, item.id, value)
    };

    const toggleAcordion = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <CustomAccordion expanded={expanded} >
            <AccordionSummary
                expandIcon={<Tooltip title={t('click to change price and add employee')}>
                    <ExpandCircleDownIcon sx={{ cursor: 'pointer' }} onClick={toggleAcordion} />
                </Tooltip>
                }
            >
                <Box sx={{ flexBasis: '200px' }} >
                    <TableData>
                        {item.name}
                    </TableData>
                </Box>
                <Box>
                    <Increment id={item.id} type={type} increment={increase} decrement={decrease} value={item.quantity} />
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
            <AccordionDetails>
                <Grid container spacing={2}>
                    <Grid item xs={6} sx={{ alignSelf: 'center' }}>
                        <CustomTextField id="price" type='number' label={t('price')} variant="standard" value={item.price} onChange={e => changePrice(type, item.id, e.target.value)} />
                    </Grid>
                    <Grid item xs={6} sx={{ alignSelf: 'center' }}>
                        <FormControl variant="standard" sx={{ minWidth: 120 }}>
                            <InputLabel id="employee-label">{t('employee')}</InputLabel>
                            <Select
                                labelId="employee-label"
                                id="select-multiple-employees"
                                value={employeeName}
                                onChange={handleEmployeesChange}
                                label={t('employee')}
                            >
                                <MenuItem value="">
                                    {t('none')}
                                </MenuItem>
                                {employees.map((employee, index) => {
                                    if (employees.length - 1 === index) {
                                        return (
                                            <MenuItem key={index} value={employee.id} ref={lastElementRef}>
                                                {employee.name}
                                            </MenuItem>
                                        )
                                    }
                                    return (
                                        <MenuItem key={index} value={employee.id} >
                                            {employee.name}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </CustomAccordion>
    )
}
export default CartItem;