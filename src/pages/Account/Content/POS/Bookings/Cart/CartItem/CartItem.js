import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Grid } from "@mui/material";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { TableData } from '../../../../../../../components/UI/Dashboard/Table/Table';
import ValidationMessage from '../../../../../../../components/UI/ValidationMessage/ValidationMessage';

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

    const { item, type, changeEmployee, employees, lastElementRef } = props;

    const { t } = useTranslation()

    const [expanded, setExpanded] = useState(false)

    const handleEmployeesChange = (event) => {
        const { target: { value }, } = event;

        if (value === '') return;
        changeEmployee(type, item.id, value)
    };

    const toggleAcordion = () => {
        setExpanded((prev) => !prev);
    };

    const employeeNotVisible = item.employee_id !== 'none' && !employees.find(employee => employee.id === item.employee_id)

    return (
        <CustomAccordion expanded={expanded} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ cursor: 'pointer' }} onClick={toggleAcordion} />}
            >
                <Box sx={{ flexBasis: '200px' }} >
                    <TableData>
                        {item.name}
                    </TableData>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ alignSelf: 'center' }}>
                        <FormControl variant="standard" sx={{ minWidth: '100%' }}>
                            <InputLabel id="employee-label">{t('employee')}</InputLabel>
                            <Select
                                labelId="employee-label"
                                id="select-multiple-employees"
                                value={item.employee_id}
                                onChange={handleEmployeesChange}
                                label={t('employee')}
                            >
                                <MenuItem value="none">
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
                        {employeeNotVisible && <ValidationMessage exist small>{t('scroll to bottom to check all employees')}</ValidationMessage>}
                    </Grid>
                </Grid>
            </AccordionDetails>
        </CustomAccordion>
    )
}
export default CartItem;