import { Cancel } from "@mui/icons-material";
import { FormControl, Stack, TextField, Typography, List, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useRef, useState } from "react";

const Tags = (props) => {
    return (
        <Box sx={{ flexGrow: 1, display: "flex", flexWrap: "wrap" }}>
            {props.data.map((tag, index) => (
                <Typography
                    sx={{
                        borderRadius: 50,
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