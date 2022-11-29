import React from "react";
import Box from '@mui/material/Box';
import LeftDrawer from "../../../components/LeftDrawer";

const drawerWidth = 240;

const Schedule = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <LeftDrawer />
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            ></Box>
        </Box>
    );
};

export default Schedule;