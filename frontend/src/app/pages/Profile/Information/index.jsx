import React from "react";
import Box from '@mui/material/Box';
import LeftDrawer from "../../../components/LeftDrawer";
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

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
                    sx={{ flexGrow: 1, p: 2 }}
                >
                    <Typography variant="h6" component="div">Cập nhật Thông tin</Typography>
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Họ và tên"
                            defaultValue=""
                        />
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default Information;