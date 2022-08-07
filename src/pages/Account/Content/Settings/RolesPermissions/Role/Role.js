import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Switch, Card, Grid, Backdrop, Snackbar, Alert } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useContext, useEffect } from 'react';
import v1 from '../../../../../../utils/axios-instance-v1';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback } from 'react';
import { fetchPermissions } from '../../../../../../store/actions/index';
import { connect } from 'react-redux';
import ThemeContext from '../../../../../../store/theme-context';
import AuthContext from '../../../../../../store/auth-context';

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
    color: ${({ theme }) => theme.palette.common.white};
    cursor: pointer;
`

const Role = props => {

    const { roleData, openMembersHandler, getPermissions } = props;

    const themeCtx = useContext(ThemeContext)
	const {  lang } = themeCtx;

	const authCtx = useContext(AuthContext)
    const { roleId } = authCtx;

    const [loading, setLoading] = useState(true)

    const [modulePermissions, setModulePermissions] = useState(null);

    const [permissions, setPermissions] = useState(null);

    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false)

    const { t } = useTranslation() 

    useEffect(() => {
        v1.get(`/vendors/settings/modules-permissions`)
            .then(res => {
                setLoading(false)
                setModulePermissions(res.data)
            })
            .catch(err => {
                //console.log(err)
            })
    }, [])

    
    function handleClose() {
        setSuccess(false)
    }
    
    const getModulePermissions = useCallback(() => {
        v1.get(`/vendors/settings/roles/${roleData.id}/permissions`)
        .then(res => {
            setPermissions(res.data)
        })
        .catch(err => {
            //console.log(err)
        })
    }, [roleData.id])
    useEffect(() => {
        getModulePermissions()
    }, [getModulePermissions])

    const changeStatusHandler = useCallback(( id) => {
        const newPermissionStatus = permissions.findIndex(permission => permission.id === id)
        const newPermissionNum = newPermissionStatus === -1 ? 1 : 0;
        setSuccess(false)
        setOpen(true)
        v1.post(`/vendors/settings/permissions`, {
            roleId: roleData.id,
            permissionId: id,
            assignPermission: newPermissionNum
        })
            .then(res => {
                getModulePermissions()
                setOpen(false)
                setSuccess(true)
                getPermissions(roleId, lang);
            })
    }, [getModulePermissions, getPermissions, lang, permissions, roleData.id, roleId])

    let content = (
        <Loader>
            <CircularProgress color="secondary" />
        </Loader>
    )
    if (!loading && modulePermissions && permissions) {
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
                                                checked={permissions.findIndex(role => role.id === permission.id) !== -1}
                                                onChange={changeStatusHandler.bind(null, permission.id)}
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
        <>
            <Grid item xs={12} md={12} >
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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={success}
                onClose={handleClose}
                key={'bottom-right'}
            >
                <Alert onClose={handleClose} severity="success">{t('Saved Successfuly')}</Alert>
            </Snackbar>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPermissions: (roleId, lang) => dispatch(fetchPermissions(roleId, lang)),
    }
}

export default connect(null, mapDispatchToProps)(Role);