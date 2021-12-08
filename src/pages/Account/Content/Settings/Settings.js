import { Fragment } from "react";
import { Outlet } from "react-router";
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Sidebar from "./Sidebar";
import { Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";

export default function Settings() {
    return (
        <Fragment>
            <CssBaseline />
            <Stack spacing={2}>
                <Sidebar />
                <Card>
                    <Box>
                        <CardContent sx={{padding: 5}}>
                            <Outlet />
                        </CardContent>
                    </Box>
                </Card>
            </Stack>
        </Fragment>
    );
}

