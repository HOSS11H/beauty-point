import Box from '@mui/material/Box';
import * as React from 'react';
import TabsContent from './TabsContent/TabsContent';
import TabsHead from './TabsHead/TabsHead';



const Reports = (props) => {
    const [current, setCurrent] = React.useState(0);

    const handleChange = (event, newValue) => {
        setCurrent(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <TabsHead current={current} onChange={handleChange} />
            <TabsContent current={current} />
        </Box>
    );
}

export default Reports;