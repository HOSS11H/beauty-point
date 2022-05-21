import { Card } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useContext } from 'react';
import { useTranslation } from "react-i18next";

import AuthContext from '../../../../store/auth-context';

export default function Sidebar(props) {

    const {t} = useTranslation()

    const authCtx = useContext(AuthContext)

    const { roleName } = authCtx

    const { value, onChange } = props;

    const handleChange = (event, newValue) => {
        onChange(newValue)
    };
    

    return (
        <Card>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} scrollButtons="auto" variant="scrollable" indicatorColor="secondary" textColor="secondary">
                    <Tab id='general-settings' value="" label={t("General")} />
                    <Tab id='vendor-settings' value="vendor-page" label={t("Vendor page Settings")} />
                    <Tab id='booking-settings' value="booking-settings" label={t("Booking Settings")} />
                    {roleName !== 'artist' && <Tab id='roles-settings' value="roles-permissions" label={t("roles & permissions")} />}
                    {roleName !== 'artist' && <Tab value="employee-settings" label={t("Employee Schedule")} />}
                </Tabs>
            </Box>
        </Card>
    );
}
