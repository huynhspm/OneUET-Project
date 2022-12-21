import React from "react";
import { Box, Drawer, Toolbar } from '@mui/material';
import Main from "./Main";
import PrvDocView from "./PrvDocView";
import { useState, useEffect } from "react";
import { drawerWidth } from "../../../utils/config";
import { documentCardHeight } from "../../../utils/config";
import axios from "axios";
import { useParams } from "react-router-dom";

const PrivateDocument = (props) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2ODU2LCJleHAiOjE2NzMwMjg4NTZ9.2G84rwn7b1FcD60TAbxcljmTylOZJ4VXz2Y932g55bo'
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [docIds, setDocIds] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await axios
                .get("http://localhost:2002/api/user/me", config)
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
