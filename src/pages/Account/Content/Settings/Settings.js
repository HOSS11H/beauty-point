import { Fragment, useEffect, useState } from "react";
import { Outlet } from "react-router";
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Sidebar from "./Sidebar";
import { Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import { useParams, useNavigate} from "react-router-dom";
import { usePrompt } from "../../../../hooks/useBlocker";
import { useTranslation } from "react-i18next";

export default function Settings() {

    const {t} = useTranslation()

    const params = useParams();
    const [value, setValue] = useState(params['*'])

    const navigate = useNavigate();

    const [formIsDirty, setFormIsDirty] = useState(false)

    usePrompt(
        t('Are you sure you want to leave this page?'),
        formIsDirty,
    );

    useEffect(() => {
        setValue(params['*'])
    }, [params])

    const handleFormChange = (val) => {
        setFormIsDirty(val)
    }

    const handleTabsChange = (newValue) => {
        navigate(newValue);
    };

    return (
        <Fragment>
            <CssBaseline />
            <Stack spacing={2}>
                <Sidebar value={value} onChange={handleTabsChange} />
                <Card>
                    <Box>
                        <CardContent sx={{padding: 5}}>
                            <Outlet context={[formIsDirty, handleFormChange]} />
                        </CardContent>
                    </Box>
                </Card>
            </Stack>
        </Fragment>
    );
}

