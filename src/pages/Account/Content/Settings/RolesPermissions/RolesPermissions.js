import { Fragment, useEffect, useState } from "react";
import v1 from '../../../../../utils/axios-instance-v1'
import { useTranslation } from 'react-i18next';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { Alert, Backdrop, CircularProgress, Grid, Skeleton, Snackbar } from "@mui/material";
import Role from "./Role/Role";



export default function RolesPermissions(props) {
    const { t } = useTranslation()
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false)
    const [ roles , setRoles ] = useState([])
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


    const content = roles && (
        roles.map((role, index) => {
            return (
                <Role key={index} roleData={role} />
            )
        })
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
                            <Alert onClose={handleClose} severity="success" fullWidth>{t('Saved Successfuly')}</Alert>
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