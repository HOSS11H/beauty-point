import { Fragment, useCallback, useState } from "react";
import { useTranslation } from 'react-i18next';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Sidebar from "./Sidebar";

export default function General(props) {
    const { t } = useTranslation()
    return (
        <Fragment>
            <h1>General</h1>
        </Fragment>
    );
}
