import React from "react";
import { Dialog, Zoom, Button, Divider, createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import { defaultPost } from "../data";
import './styles.css'
import { typography } from "@mui/system";
import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button"

function OptionsDialog({ onClose }) {
    return (
        <>

            <Dialog
                open
                classes={{
                    scrollPaper: "dialogScrollPaper"
                }}
                sx={{
                    typography: typography
                }}
                PaperProps={{
                    style: { borderRadius: 20 }
                }}
                onClose={onClose}
                TransitionComponent={Zoom}
            >
                <Button class="redButton" ig>DELETE</Button>
                <Divider />
                <Button class="button" ig>EDIT</Button>
                <Divider />
                <Button class="button" ig>SET TO PUBLIC</Button>
                <Divider />
                {/* <Button class="button" ig>CANCEL</Button>
                    <Divider /> */}
                <Button onClick={onClose} class="button">
                    Cancel
                </Button>
            </Dialog>
        </>
    );
}

export default OptionsDialog;
