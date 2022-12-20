import Header from "../../containers/Header";
import { useParams } from "react-router-dom";
import EditDocumentView from "../EditDocumentPage/Main";
import DocumentView from "./DocumentView";
import Main from "./Main";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Document = (props) => {
    const [doc_ids, setDoc_ids] = useState([]);
    
	// user token
	const [token, setToken] = useState('');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const navigate = useNavigate();    

	// fetch user token
	useEffect(() => {
		if (token === '') {
			const lastToken = sessionStorage.getItem("token");
			if (lastToken !== null && lastToken !== undefined) {
				setToken(lastToken);
			} else {
				navigate('/login');
			}
		}
	}, [token, navigate]);


    useEffect(() => {
        if (token !== '') {
            fetchData();
        }
    }, [token]);
    
    const fetchData = async () => {
        try {
            await axios
                .get("http://localhost:2002/api/document/public", config)
                .then((res) => {
                    console.log(res)
                    let docs = res.data.data.documents;
                    let tmp = [];
                    for (let index in docs) {
                        tmp.push(docs[index].id) 
                    }
                    setDoc_ids(tmp);
                });
        } catch (e) {
            console.log(e.response.data);
        }
    }

    const { doc_id, type } = useParams();

    return (
        <>
            {doc_id === "" && <Main/>}
            {doc_ids.map((id) => (
                doc_id === String(id) && <DocumentView key={id} id={id} />
            ))}
        </>
    );
};

export default Document;