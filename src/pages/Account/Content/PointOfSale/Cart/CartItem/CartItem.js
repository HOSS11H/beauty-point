import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Actions from '../../../../../../components/UI/Dashboard/Actions/Actions';
import { TableData } from '../../../../../../components/UI/Dashboard/Table/Table';
import Increment from '../../../../../../components/UI/Increment/Increment';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};


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
const DataCell = styled.div`
    display: flex;
    flex-direction: column;
    gap:20px;
    justify-content: center;
    align-items: center;
    span {
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.5rem;
        text-align: center;
    }
`

const CartItem = props => {

    const { t } = useTranslation()

    const { row, remove, increase, decrease, type, priceChangeHandler, changeEmployee, fetchedEmployees } = props;

    const [employeeName, setEmployeeName] = useState([]);

    const handleEmployeesChange = (event) => {
        const {
            target: { value },
        } = event;
        setEmployeeName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        changeEmployee(type, row.id, value)
    };

    return (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Grid container spacing={2}>
                        <Grid item xs sx ={{ alignSelf: 'center' }}>
                            <DataCell>
                                <span>{t(type)}</span>
                                <TableData>
                                    {row.name}
                                </TableData>
                            </DataCell>
                        </Grid>
                        <Grid item xs sx ={{ alignSelf: 'center' }}>
                            <DataCell>
                                <span>{t('quantity')}</span>
                                <Increment id={row.id} type={type} increment={increase} decrement={decrease} value={row.quantity} />
                            </DataCell>
                        </Grid>
                        <Grid item xs sx ={{ alignSelf: 'center' }}>
                            <DataCell>
                                <span>{t('price')}</span>
                                <TableData>{(row.quantity * row.price)}</TableData>
                            </DataCell>
                        </Grid>
                        <Grid item xs sx ={{ alignSelf: 'center' }}>
                            <DataCell>
                                <span>{t('action')}</span>
                                <Actions remove
                                    removeHandler={(id) => remove(type, row.id)}
                                />
                            </DataCell>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sx ={{ alignSelf: 'center' }}>
                            <CustomTextField id="price" type='number' label={t('price')} variant="outlined" value={row.price} onChange={e => priceChangeHandler(type, row.id, e.target.value)} />
                        </Grid>
                        <Grid item xs={6} sx ={{ alignSelf: 'center' }}>
                            <FormControl sx={{ width: '100%', minWidth: '90px' }}>
                                <InputLabel id="employee-label">{t('employee')}</InputLabel>
                                <Select
                                    label={t('employee')}
                                    labelId="employee-label"
                                    id="select-multiple-employees"
                                    value={employeeName}
                                    onChange={handleEmployeesChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    MenuProps={MenuProps}
                                    renderValue={(val) => {
                                        const selected = fetchedEmployees?.find(employee => employee.id === val);
                                        return (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                <Chip key={selected.id} label={selected.name} />
                                            </Box>
                                        )
                                    }}
                                >
                                    {fetchedEmployees.map((employee) => (
                                        <MenuItem
                                            key={employee.id}
                                            value={employee.id}
                                        >
                                            {employee.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
    )
}


export default CartItem;