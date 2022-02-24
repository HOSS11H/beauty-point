import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { TableData } from '../../../../../../components/UI/Dashboard/Table/Table';
import Actions from '../../../../../../components/UI/Dashboard/Actions/Actions';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { formatCurrency } from '../../../../../../shared/utility';
import Increment from '../../../../../../components/UI/Increment/Increment';
import { useState } from 'react';
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

const CartItem = props => {

    const { t } = useTranslation()


    const { row, remove, increase, decrease, type, changeEmployee, fetchedEmployees } = props;

    const [employeeName, setEmployeeName] = useState( row.employee ? row.employee.id : '');

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
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <TableData>{row.item.name}</TableData>
            </TableCell>
            <TableCell align="center">
                <TableData>{formatCurrency(row.price)}</TableData>
            </TableCell>
            <TableCell align="center">
                <Increment id={row.id} type={type} increment={increase} decrement={decrease} value={row.quantity} />
            </TableCell>
            <TableCell align="center">
                <TableData>{formatCurrency(row.quantity * row.price)}</TableData>
            </TableCell>
            <TableCell align="center" sx={{ padding: '16px 8px' }}>
                <FormControl sx={{ width: '100%', minWidth: '90px' }}>
                    <InputLabel id="employee-label">{t('employee')}</InputLabel>
                    <Select
                        label={t('employee')}
                        labelId="employee-label"
                        id="select-multiple-employees"
                        value={employeeName}
                        onChange={handleEmployeesChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={ (val) => {
                            if(fetchedEmployees.length > 0) {
                                const selected = fetchedEmployees?.find(user => user.id === val);
                                return (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        <Chip key={selected.id} label={selected.name} />
                                    </Box>
                                )
                            }
                        }}
                        MenuProps={MenuProps}
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
            </TableCell>
            <TableCell align="center">
                <Actions remove
                    removeHandler={(id) => remove(type, row.id)}
                />
            </TableCell>
        </TableRow>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedEmployees: state.employees.employees,
    }
}

export default connect(mapStateToProps, null)(CartItem);