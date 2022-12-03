import React from 'react';
import Box from '@mui/material/Box';
import LeftDrawer from "../../../components/LeftDrawer";
import Basic from './Basic';
import Education from './Education';
import Activities from './Activities';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const drawerWidth = 240;

const Information = () => {

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
            >
                <Divider />
                <Box
                    component="div"
                    sx={{ flexGrow: 1, p: 1, m: 1 }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Basic />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Education />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Activities />
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box >
    );
};

export default Information;