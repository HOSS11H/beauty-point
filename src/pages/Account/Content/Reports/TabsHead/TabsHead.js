import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabsHead = props => {

    const {t} = useTranslation();

    const { current, onChange } = props


    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={current} onChange={onChange} aria-label="basic tabs example">
                <Tab label={t("Tabular Report")} {...a11yProps(0)} />
            </Tabs>
        </Box>
    )
}

export default TabsHead;