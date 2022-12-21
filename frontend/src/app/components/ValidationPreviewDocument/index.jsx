import { Modal, Box, Button, Divider, Zoom, Hidden, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import '../../utils/styles.css';
import { CenterModal } from '../../utils/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { api_url } from '../../utils/config';
import { refreshPage } from '../../utils/function';

const ValidationPreviewDocument = (props) => {
    const navigate = useNavigate();

	// user token
	const [token, setToken] = useState('');

	// fetch user token
	const getToken = (() => {
		if (token === '') {
			const lastToken = sessionStorage.getItem("token");
			if (lastToken !== null && lastToken !== undefined) {
				setToken(lastToken);
			} else {
				navigate('/login');
			}
		}
	})

    useEffect(() => {
		getToken();
	}, [navigate, token]);


    const approveDocument = async () => {
        console.log(props.docID);
        console.log("approveDocument");
        try {
            await axios({
                method: 'put',
                url: String(api_url + "/api/document/" + String(props.docID)),
                data: {
                    status: 'public'
                },
                headers: { Authorization: `Bearer ${token}` }
            }).then(() => {
                props.onClose(true);
            });
        } catch (e) {
            console.log(e.response.data);
        }
    }

    const declineDocument = async () => {
        console.log(props.docID);
        console.log("declineDocument");
        try {
            await axios({
                method: 'put',
                url: String(api_url + "/api/document/" + String(props.docID)),
                data: {
                    status: 'private'
                },
                headers: { Authorization: `Bearer ${token}` }
            }).then(() => {
                props.onClose(true);
            });
        } catch (e) {
            console.log(e.response.data);
        }
    }

    return (
        <>
            <CenterModal
                open={props.open}
                onClose={props.onClose}
            >
                <Box
                    bgcolor={'background.default'}
                    color={'text.primary'}
                    borderRadius={2}
                    sx={{
                        p: 3,
                        position: 'relative',
                        width: 'calc(60%)',
                        height: 'calc(80%)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography variant="h6" color="black" textAlign="left">
                        {props.name}
                    </Typography>
                    <Typography>
                        {props.description}
                    </Typography>
                    <Divider />
                    <Typography color="textSecondary" className="datePosted" sx={{ pt: 1 }}>
                        {props.dateUploaded}
                    </Typography>
                    <iframe src={props.linkView} className='pdf-viewer'></iframe>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant='contained' sx={{mt:3, mr:1, width: '50%'}} onClick={approveDocument}>APPROVE</Button>
                        <Button variant='contained' sx={{mt:3, ml:1, width: '50%'}} onClick={declineDocument}>DECLINE</Button>
                    </Box>
                </Box>
            </CenterModal>
        </>
    );
};

export default ValidationPreviewDocument;