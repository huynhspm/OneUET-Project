import React from "react";
import { Box, Drawer, Toolbar } from '@mui/material';
import Main from "./Main";
import PrvDocView from "./PrvDocView";
import { useState, useEffect } from "react";
import { api_url, drawerWidth } from "../../../utils/config";
import { documentCardHeight } from "../../../utils/config";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PrivateDocument = (props) => {
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


    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [docIds, setDocIds] = useState([]);

    useEffect(() => {
        if (token !== '') {
            fetchData();
        }
    }, [token]);

    const fetchData = async () => {
        try {
            await axios
                .get(api_url + "/api/user/me", config)
                .then((res) => {
                    let docs = res.data.data.documents;
                    console.log(res);
                    let tmp = [];
                    for (let id in docs) {
                        tmp.push(docs[id].id);
                    }
                    setDocIds(tmp);
                });
        } catch (e) {
            console.log(e.response.data);
        }
    }

    const { docId } = useParams();

    return (
        <>
            {docId === "" && <Main />}
            {docIds.map((id, index) => (
                docId === String(id) && <PrvDocView key={id} id={id} />
            ))}
        </>
    );
};

export default PrivateDocument;
