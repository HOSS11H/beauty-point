import { Box, Tab, Tabs } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../../../store/auth-context";

const Sources = ({ fetchedPermissions }) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    let location = useLocation();
    const { pathname } =location;

    const authCtx = useContext(AuthContext);

    const { roleName } = authCtx;

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
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                <Tabs value={selected} onChange={handleChange} aria-label="basic tabs example">
                    {permissions.includes('manage_settings') && <Tab label={t('settings')} value='/account/sources/settings' />}
                    {permissions.includes('manage_settings') && <Tab label={t('tickets')} value='/account/sources/tickets' />}
                    {permissions.includes('manage_settings') && <Tab label={t('plans')} value='/account/sources/plans' />}
                    {permissions.includes('read_coupon') && <Tab label={t('coupons')} value='/account/sources/coupons'  />}
                    <Tab label={t('notifications')} value='/account/sources/notifications' />
                    {permissions.includes('manage_settings') && roleName !== 'artist' && <Tab label={t('seats')} value='/account/sources/seats' />}
                    {permissions.includes('manage_settings') && roleName === 'artist' && <Tab label={t('artist seats')} value='/account/sources/artist-seats' />}
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


export default connect(mapStateToProps, null)(Sources);
