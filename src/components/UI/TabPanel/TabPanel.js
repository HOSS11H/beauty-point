import { Box } from "@mui/material";


export default function TabPanel(props) {
    const { children, value, index, padding,  ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: padding || 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}