import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Switch, Card, Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import v1 from '../../../../../../utils/axios-instance-v1';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = styled(Card)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 100px;
    flex-grow: 1;
`

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
    color: ${ ( { theme } ) => theme.palette.common.white};
    cursor: pointer;
`

const Role = props => {

    const { roleData, openMembersHandler, changeStatusHandler, successRefetch } = props;

    const [loading, setLoading] = useState(true)

    const [modulePermissions, setModulePermissions] = useState(null);

    const [ permissions, setPermissions] = useState(null);

    const { t } = useTranslation()

    const changeRolePermission = (id) => {
        const newPermissionStatus = permissions.findIndex( role => role.id === id)
        const newPermissionNum = newPermissionStatus === -1 ? 1 : 0;
        changeStatusHandler(roleData.id, id, newPermissionNum)
    }

    useEffect(() => {
        v1.get(`/vendors/settings/modules-permissions`)
            .then(res => {
                setLoading(false)
                setModulePermissions(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (modulePermissions || successRefetch ) {
            v1.get(`/vendors/settings/roles/${roleData.id}/permissions`)
            .then(res => {
                setPermissions(res.data)
            })
            .catch( err => {
                console.log(err)
            })
        }
    }, [modulePermissions, roleData.id, successRefetch])

    let content = (
        <Loader>
            <CircularProgress color="secondary" />
        </Loader>
    )
    if (!loading && modulePermissions && permissions)  {
        content = (
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
                        {modulePermissions.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{t(row.display_name)}</TableCell>
                                {
                                    row.permissions.map((permission) => (
                                        <TableCell key={permission.id} align="center">
                                            <Switch
                                                checked={permissions.findIndex( role => role.id === permission.id) !== -1}
                                                onChange={changeRolePermission.bind(null, permission.id )}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <Grid item xs={12} md={16} >
            <Accordion>
                <CustomAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography sx={{ textTransform: 'capitalize' }}>{t(`${roleData.name}`)}</Typography>
                    <RoleMembersBtn onClick={openMembersHandler} >{`${roleData.users_count} ${t('members')}`}</RoleMembersBtn>
                </CustomAccordionSummary>
                <AccordionDetails>
                    {content}
                </AccordionDetails>
            </Accordion>
        </Grid>
    )
}
export default Role;