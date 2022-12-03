import React from "react";
import { Dialog, Zoom, Button, Divider } from "@mui/material";
import './styles.css'
import { typography } from "@mui/system";

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
