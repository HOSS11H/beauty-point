import { Box, Tab, Tabs } from "@mui/material";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Collection = props => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    let location = useLocation();
    const { pathname } =location;


    const [ selected, setSelected ] = useState(pathname)

    const handleChange = ( event, newValue ) => {
        setSelected(newValue)
        navigate(newValue)
    }

    return (
        <Fragment>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={selected} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={t('products')} value='/account/products' />
                    <Tab label={t('units')} value='/account/products/units'  />
                    <Tab label={t('services')} value='/account/products/services' />
                    <Tab label={t('deals')} value='/account/products/deals' />
                </Tabs>
            </Box>
            <Outlet />
        </Fragment>
    )
}
export default Collection;