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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Increment from '../../../../../../components/UI/Increment/Increment';
import { Grid, TextField, useMediaQuery } from '@mui/material';
import styled from 'styled-components';
import ThemeContext from '../../../../../../store/theme-context';

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

const CartItem = props => {

    const { t } = useTranslation()

    const { row, remove, increase, decrease, type, priceChangeHandler, changeEmployee, fetchedEmployees } = props;

    const { theme } = useContext(ThemeContext)

    const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

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

    let content = (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" sx={{ padding: '16px 8px' }} scope="row">
                <TableData>{row.name}</TableData>
            </TableCell>
            <TableCell align="center" sx={{ padding: '16px 8px' }}>
                <CustomTextField id="price" type='number' label={t('price')} variant="outlined" value={row.price} onChange={e => priceChangeHandler(type, row.id, e.target.value)} />
            </TableCell>
            <TableCell align="center" sx={{ padding: '16px 8px' }}>
                <Increment id={row.id} type={type} increment={increase} decrement={decrease} value={row.quantity} />
            </TableCell>
            <TableCell align="center" sx={{ padding: '16px 8px' }}>
                <TableData>{(row.quantity * row.price)}</TableData>
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
            </TableCell>
            <TableCell align="center" sx={{ padding: '16px 8px' }}>
                <Actions remove
                    removeHandler={(id) => remove(type, row.id)}
                />
            </TableCell>
        </TableRow>
    )

    if (isMobile) {
        content = (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Grid container spacing={2}>
                        <Grid item xs sx ={{ alignSelf: 'center' }}>
                            <TableData>{row.name}</TableData>
                        </Grid>
                        <Grid item xs sx ={{ alignSelf: 'center' }}>
                            <Increment id={row.id} type={type} increment={increase} decrement={decrease} value={row.quantity} />
                        </Grid>
                        <Grid item xs sx ={{ alignSelf: 'center' }}>
                            <TableData>{(row.quantity * row.price)}</TableData>
                        </Grid>
                        <Grid item xs sx ={{ alignSelf: 'center' }}>
                            <Actions remove
                                removeHandler={(id) => remove(type, row.id)}
                            />
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

    return (
        <>
            { content }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedEmployees: state.employees.employees,
    }
}

export default connect(mapStateToProps, null)(CartItem);