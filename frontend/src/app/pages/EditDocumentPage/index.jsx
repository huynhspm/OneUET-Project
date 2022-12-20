import { useParams } from "react-router-dom";
import Main from "./Main";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../utils/config";
import { useNavigate } from "react-router-dom";

const EditDocumentPage = (props) => {
    const [doc_ids, setDoc_ids] = useState([]);

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
                    console.log(docs)
                    let tmp = [];
                    for (let index in docs) {
                        tmp.push(docs[index].id) //docs[index].id
                    }
                    console.log(tmp);
                    setDoc_ids(tmp);
                });
        } catch (e) {
            console.log(e.response.data);
        }
    }

    const { doc_id } = useParams();

    return (
        <>
            {/* {doc_id === "" && <Main />} */}
            {doc_ids.map((id, index) => (
                doc_id === String(id) && <Main key={index} id={id} />
            ))}

        </>
    );
};

export default EditDocumentPage;