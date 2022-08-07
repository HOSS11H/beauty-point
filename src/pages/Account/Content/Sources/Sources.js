import { Box, Tab, Tabs } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../../../store/auth-context";

const Sources = props => {
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

    return (
        <Fragment>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                <Tabs value={selected} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={t('settings')} value='/account/sources/settings' />
                    <Tab label={t('coupons')} value='/account/sources/coupons'  />
                    <Tab label={t('tickets')} value='/account/sources/tickets' />
                    <Tab label={t('plans')} value='/account/sources/plans' />
                    <Tab label={t('notifications')} value='/account/sources/notifications' />
                    {roleName !== 'artist' && <Tab label={t('seats')} value='/account/sources/seats' />}
                    {roleName === 'artist' && <Tab label={t('artist seats')} value='/account/sources/artist-seats' />}
                </Tabs>
            </Box>
            <Outlet />
        </Fragment>
    )
}



export default Sources;