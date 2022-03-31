import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Card } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Sidebar(props) {

    const {t} = useTranslation()

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
                    <Tab id='roles-settings' value="roles-permissions" label={t("roles & permissions")} />
                    <Tab value="employee-settings" label={t("Employee Settings")} />
                </Tabs>
            </Box>
        </Card>
    );
}
