import { Fragment, useCallback, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Outlet } from "react-router";
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Sidebar from "./Sidebar";

export default function Settings() {
    const { t } = useTranslation()
    return (
        <Fragment>
            <CssBaseline />
            <Stack spacing={5}>
                <Sidebar />
                <Outlet/>
            </Stack>
        </Fragment>
    );
}

