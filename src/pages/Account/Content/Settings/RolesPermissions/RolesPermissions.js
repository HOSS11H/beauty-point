import { Fragment, useEffect, useState, useCallback } from "react";
import v1 from '../../../../../utils/axios-instance-v1'
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import {Grid, Skeleton } from "@mui/material";
import Role from "./Role/Role";
import MembersModal from "./MembersModal/MembersModal";



export default function RolesPermissions(props) {
    const [show, setShow] = useState(true);
    const [ roles , setRoles ] = useState([])
    const [ membersModalOpened, setMembersModalOpened ] = useState(false);
    const [ selectedRoleId, setSelectedRoleId ] = useState(null);
    useEffect(() => {
        v1.get('/vendors/settings/roles')
            .then(res => {
                setRoles(res.data)
                setShow(false)
            })
    }, []);
    const membersModalOpenHandler = useCallback((id) => {
        setSelectedRoleId(id);
        setMembersModalOpened(true);
    }, [])
    const membersModalCloseHandler = useCallback(() => {
        setMembersModalOpened(false);
        setSelectedRoleId(null);
    }, [])


    const content = roles && (
        <Fragment>
            {
                roles.map((role, index) => {
                    return (
                        <Role key={index} roleData={role} openMembersHandler={membersModalOpenHandler.bind(null, role.id)} />
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