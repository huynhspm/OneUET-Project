import React from "react";
import { Dialog, Zoom, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import './styles.css'
import { typography } from "@mui/system";
import axios from "axios";
import { OptionButton, RedButton } from "./styles";
import { useNavigate } from "react-router-dom";

function OptionsDialog({ onClose, documentID, linkDownload }) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2ODU2LCJleHAiOjE2NzMwMjg4NTZ9.2G84rwn7b1FcD60TAbxcljmTylOZJ4VXz2Y932g55bo'
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const navigate = useNavigate();

    const deleteDocument = async () => {
        console.log(documentID);
        try {
            await axios
                .delete("http://localhost:2002/api/document/" + String(documentID), config);

        } catch (e) {
            console.log(e.response.data);
        }
    };

    const setToPublic = async () => {
        try {
            await axios({
                method: 'put',
                url: String("http://localhost:2002/api/document/me/" + String(documentID)),
                data: {
                    status: 'pending'
                },
                headers: { Authorization: `Bearer ${token}` }
            }).then(() => {
                onClose(false);
            });
        } catch (e) {
            console.log(e.response.data);
        }
    }

    return (
        <>
            <Dialog
                open
                classes={{
                    scrollPaper: "dialogScrollPaper"
                }}
                sx={{
                    typography: typography,
                    display: "grid !important",
                }}
                PaperProps={{
                    style: { borderRadius: 20 }
                }}
                onClose={onClose}
                TransitionComponent={Zoom}
            >
                <RedButton
                    onClick={deleteDocument}
                    component={Link}
                    to="/document/"
                >
                    DELETE
                </RedButton>
                <Divider />
                <OptionButton
                    component={Link}
                    to={"/document/edit/" + documentID}
                >
                    EDIT
                </OptionButton>
                <Divider />
                <OptionButton href={linkDownload}> DOWNLOAD </OptionButton>
                <Divider />
                <OptionButton
                    onClick={setToPublic}
                >
                    SET TO PUBLIC
                </OptionButton>
                <Divider />
                <OptionButton onClick={() => {onClose(false)}}>
                    Cancel
                </OptionButton>
            </Dialog>
        </>
    );
}

export default OptionsDialog;
