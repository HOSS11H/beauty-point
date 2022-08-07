import { Box, Tab, Tabs } from "@mui/material";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Users = ({ fetchedPermissions }) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    let location = useLocation();
    const { pathname } =location;


    const [ selected, setSelected ] = useState(pathname)

    const handleChange = ( event, newValue ) => {
        setSelected(newValue)
        navigate(newValue)
    }

    const permissions = fetchedPermissions.map(permission => {
        return permission.name
    })

    return (
        <Fragment>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={selected} onChange={handleChange} aria-label="basic tabs example">
                    {permissions.includes('read_employee') && <Tab label={t('employees')} value='/account/users' /> }
                    {permissions.includes('read_customer') && <Tab label={t('customers')} value='/account/users/customers'  /> }
                    {permissions.includes('read_report') && <Tab label={t('agents')} value='/account/users/agents' /> }
                </Tabs>
            </Box>
            <Outlet />
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedPermissions: state.permissions.permissions,
    }
}


export default connect(mapStateToProps, null)(Users);