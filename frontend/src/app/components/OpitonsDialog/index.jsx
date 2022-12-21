import React from "react";
import { Dialog, Zoom, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import './styles.css'
import { typography } from "@mui/system";
import axios from "axios";
import { OptionButton, RedButton } from "./styles";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function OptionsDialog({ onClose, documentID, linkDownload, belongToMe, status }) {
    const navigate = useNavigate();    

	// user token
	const [token, setToken] = useState('');

	// fetch user token
	useEffect(() => {
		if (token === '') {
			const lastToken = sessionStorage.getItem("token");
			if (lastToken !== null && lastToken !== undefined) {
				console.log(lastToken);
				setToken(lastToken);
			} else {
				navigate('/login');
			}
		}
	}, [token, navigate]);

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const deleteDocument = async () => {
        try {
            await axios
                .delete("http://localhost:2002/api/document/me/" + String(documentID), config);

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
                {
                    belongToMe && 
                    <RedButton
                        onClick={deleteDocument}
                        component={Link}
                        to="/profile/private-document/"
                    >
                        DELETE
                    </RedButton>
                }
                <Divider />
                {
                    belongToMe &&
                    <OptionButton
                        component={Link}
                        to={"/document/edit/" + documentID}
                    >
                        EDIT
                    </OptionButton>
                }
                <Divider />
                <OptionButton href={linkDownload}> DOWNLOAD </OptionButton>
                <Divider />
                {
                    belongToMe && status === "private" &&
                    <OptionButton
                        onClick={setToPublic}
                    >
                        SET TO PUBLIC
                    </OptionButton>
                }
                <Divider />
                <OptionButton onClick={() => {onClose(false)}}>
                    Cancel
                </OptionButton>
            </Dialog>
        </>
    );
}

export default OptionsDialog;
