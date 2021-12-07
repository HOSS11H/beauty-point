import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabsHead from './TabsHead/TabsHead';
import TabsBody from './TabsBody/TabsBody';



const Reports = (props) => {
    const [current, setCurrent] = React.useState(0);

    const handleChange = (event, newValue) => {
        setCurrent(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <TabsHead current={current} onChange={handleChange} />
            <TabsBody current={current} />
        </Box>
    );
}

export default Reports;