import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Card } from "@mui/material";

export default function Sidebar() {
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
                    <Tab value="" label="General" />
                    <Tab value="vendor-page" label="Vendor page Settings" />
                    <Tab label="Email Settings" />
                    <Tab label="Booking Settings" />
                    <Tab label="Module Settings" />
                    <Tab label="Roles and Permissions" />
                </Tabs>
            </Box>
        </Card>
    );
}
