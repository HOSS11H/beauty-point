import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Switch, Button, Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';

const CustomAccordionSummary = styled(AccordionSummary)`
    & .MuiAccordionSummary-content {
        justify-content: space-between;
        padding-right: 15px;
    }
`

const RoleMembersBtn = styled.button`
    border:0;
    background-color: ${({ theme }) => theme.palette.error.main};
    border-radius: 8px;
    text-transform: uppercase;
    color: #fff;
`
const RolePermissionBtn = styled.button`
    border:0;
    background-color: ${({ theme }) => theme.palette.secondary.main};
    border-radius: 8px;
    text-transform: uppercase;
    color: #fff;
`

const Role = props => {

    const { roleData } = props;

    const {t} = useTranslation()

    const changeRolePermission = (id) => {
    
    }

    return (
        <Grid  item xs={12} md={16} >
            <Accordion>
                <CustomAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography sx={{ textTransform: 'capitalize' }}>{t(`${roleData.name}`)}</Typography>
                    <RoleMembersBtn>{`${roleData.users_count} ${t('members')}`}</RoleMembersBtn>
                </CustomAccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center">{t('add')}</TableCell>
                                    <TableCell align="center">{t('show')}</TableCell>
                                    <TableCell align="center">{t('update')}</TableCell>
                                    <TableCell align="center">{t('delete')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[].map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{t('role')}</TableCell>
                                        <TableCell align="center"><Switch
                                            checked={row.status === 'enabled'}
                                            onChange={(e) => changeRolePermission(row.id)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        /></TableCell>
                                        <TableCell align="center"><Switch
                                            checked={row.status === 'enabled'}
                                            onChange={(e) => changeRolePermission(row.id)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        /></TableCell>
                                        <TableCell align="center"><Switch
                                            checked={row.status === 'enabled'}
                                            onChange={(e) => changeRolePermission(row.id)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        /></TableCell>
                                        <TableCell align="center"><Switch
                                            checked={row.status === 'enabled'}
                                            onChange={(e) => changeRolePermission(row.id)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </Grid>
    )
}
export default Role;