import { Fragment, useEffect, useState, useCallback } from "react";
import v1 from '../../../../../utils/axios-instance-v1'
import { useTranslation } from 'react-i18next';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { Alert, Backdrop, CircularProgress, Grid, Skeleton, Snackbar } from "@mui/material";
import Role from "./Role/Role";
import MembersModal from "./MembersModal/MembersModal";



export default function RolesPermissions(props) {
    const { t } = useTranslation()
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false)
    const [ roles , setRoles ] = useState([])
    const [ membersModalOpened, setMembersModalOpened ] = useState(false);
    const [ selectedRoleId, setSelectedRoleId ] = useState(null);
    const [ successRefetch, setSuccessRefetch ] = useState(false);
    useEffect(() => {
        v1.get('/vendors/settings/roles')
            .then(res => {
                setRoles(res.data)
                setShow(false)
            })
    }, []);

    function handleClose() {
        setSuccess(false)
    }
    const membersModalOpenHandler = useCallback((id) => {
        setSelectedRoleId(id);
        setMembersModalOpened(true);
    }, [])
    const membersModalCloseHandler = useCallback(() => {
        setMembersModalOpened(false);
        setSelectedRoleId(null);
    }, [])

    const changeStatusHandler = useCallback((roleId, permissionId, assignPermission) => {
        setSuccessRefetch(false)
        setOpen(true)
        v1.post(`/vendors/settings/permissions`, {
            roleId: roleId,
            permissionId: permissionId,
            assignPermission: assignPermission
        })
            .then(res => {
                setOpen(false)
                setSuccess(true)
                setSuccessRefetch(true)
            })
    }, [])


    const content = roles && (
        <Fragment>
            {
                roles.map((role, index) => {
                    return (
                        <Role key={index} roleData={role} openMembersHandler={membersModalOpenHandler.bind(null, role.id)} changeStatusHandler={changeStatusHandler} successRefetch={successRefetch} />
                    )
                })
            }
            {
                membersModalOpened && (
                    <MembersModal show={membersModalOpened} id={selectedRoleId} fetchedRoles={roles}
                        onClose={membersModalCloseHandler} 
                        heading='view members details' />
                )
            }
        </Fragment>
    )

    return (
        <>
            {
                show ?
                    <SkeletonForm />
                    :
                    <Fragment >
                        <CssBaseline />
                        <Stack spacing={3}>
                            <Grid container spacing={3}>
                                {content}
                            </Grid>
                        </Stack>
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
                    </Fragment>
            }
        </>
    );
}
function SkeletonForm() {
    return (
        <Fragment>
            <Stack spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Skeleton variant="rectangular" height={50} />
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton variant="rectangular" height={50} />
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton variant="rectangular" height={50} />
                    </Grid>
                </Grid>
            </Stack>
        </Fragment>
    );
}