import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { TableData } from '../../../../../../components/UI/Dashboard/Table/Table';
import Actions from '../../../../../../components/UI/Dashboard/Actions/Actions';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../../../../store/theme-context';
import { connect } from 'react-redux';
import { formatCurrency } from '../../../../../../shared/utility';
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


function getStyles(name, employeeName, theme) {
    return {
        fontWeight:
            employeeName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const CartItem = props => {

    const { fetchedEmployees } = props;

    const { t } = useTranslation()

    const themeCtx = useContext(ThemeContext)


    const { row, remove, increase, decrease, type } = props;

    const [employeeName, setEmployeeName] = useState([]);

    const handleEmployeesChange = (event) => {
        const {
            target: { value },
        } = event;
        setEmployeeName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" sx={{ padding: '16px 8px' }} scope="row">
                <TableData>{row.name}</TableData>
            </TableCell>
            <TableCell align="center">
                <TableData>{(row.price)}</TableData>
            </TableCell>
            <TableCell align="center">
                <Increment id={row.id} type={type} increment={increase} decrement={decrease} value={row.quantity} />
            </TableCell>
            <TableCell align="center">
                <TableData>{(row.quantity * row.price)}</TableData>
            </TableCell>
            {
                type === 'services' && (
                    <TableCell align="center">
                        <FormControl sx={{ width: '100%', minWidth: '90px'}}>
                            <InputLabel id="employee-label">{t('employee')}</InputLabel>
                            <Select
                                labelId="employee-label"
                                id="select-multiple-employees"
                                multiple
                                value={employeeName}
                                onChange={handleEmployeesChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {fetchedEmployees.length > 0 && selected.map((value) => {
                                            const selected = fetchedEmployees.find(user => user.id === value);
                                            return (
                                                <Chip key={selected.id} label={selected.name} />
                                            )
                                        })}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {fetchedEmployees.map((employee) => (
                                    <MenuItem
                                        key={employee.id}
                                        value={employee.id}
                                        style={getStyles(employee, employeeName, themeCtx.theme)}
                                    >
                                        {employee.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </TableCell>
                )
            }
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