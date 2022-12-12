import React from "react";
import { Dialog, Zoom, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import './styles.css'
import { typography } from "@mui/system";
import axios from "axios";

function OptionsDialog({ onClose, documentID }) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2ODU2LCJleHAiOjE2NzMwMjg4NTZ9.2G84rwn7b1FcD60TAbxcljmTylOZJ4VXz2Y932g55bo'
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    const deleteDocument = async () => {
        console.log(documentID);
        try {
            await axios
                .delete("http://localhost:2002/document/" + String(documentID), config);

        } catch (e) {
            console.log(e.response.data);
        }
    };

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
                <Button
                    class="redButton"
                    onClick={deleteDocument}
                    sx={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                >
                    DELETE
                </Button>
                <Divider />
                <Button class="button">EDIT</Button>
                <Divider />
                <Button class="button">SET TO PUBLIC</Button>
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
