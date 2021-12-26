import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Card } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Sidebar() {

    const {t} = useTranslation()

    const params = useParams();
    console.log(params)
    const [value, setValue] = useState(params['*'])
    const navigate = useNavigate();
    useEffect(() => {
        setValue(params['*'])
    }, [params])

    const handleChange = (event, newValue) => {
        setValue(newValue)
        navigate(newValue)
    };

    return (
        <Card>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} scrollButtons="auto" variant="scrollable" indicatorColor="secondary" textColor="secondary">
                    <Tab value="" label={t("General")} />
                    <Tab value="vendor-page" label={t("Vendor page Settings")} />
                    <Tab value="booking-settings" label={t("Booking Settings")} />
                    <Tab value="roles-permissions" label={t("roles & permissions")} />
                    {/* <Tab value="employee-settings" label={t("Employee Settings")} /> */}
                </Tabs>
            </Box>
        </Card>
    );
}
