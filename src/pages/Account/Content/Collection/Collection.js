import { Box, Tab, Tabs } from "@mui/material";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Collection = ({ fetchedPermissions }) => {
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
                    {permissions.includes('read_product') && <Tab label={t('products')} value='/account/products' />}
                    {permissions.includes('read_product') && <Tab label={t('units')} value='/account/products/units'  />}
                    {permissions.includes('read_business_service') && <Tab label={t('services')} value='/account/products/services' />}
                    {permissions.includes('read_deal') && <Tab label={t('deals')} value='/account/products/deals' />}
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


export default connect(mapStateToProps, null)(Collection);