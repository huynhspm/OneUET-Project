import { Cancel } from "@mui/icons-material";
import { FormControl, Stack, TextField, Typography, List, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";

const Tags = () => {
    return (
        <Box sx={{ flexGrow: 1, display: "flex" }}>
            {['Khoa', 'Ngành', 'Giảng viên', 'Môn', 'Loại', 'Năm'].map((tag, index) => (
                <Typography
                    sx={{
                        maxWidth: '50%',
                        borderRadius: 50,
                        flexWrap: "wrap",
                        background: "#283240",
                        display: "inline-block",
                        paddingTop: "0.1rem",
                        paddingBottom: "0.1rem",
                        paddingRight: "1.2rem",
                        paddingLeft: "1.2rem",
                        margin: "0 0.5rem 0.4rem 0",
                        justifyContent: "center",
                        alignContent: "center",
                        color: "#ffffff",
                    }}
                noWrap
                >
                    {tag}
                </Typography>
            ))
            }
        </Box>
    );
}

export default Tags;