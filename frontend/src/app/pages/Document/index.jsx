import Header from "../../containers/Header";
import { useParams } from "react-router-dom";
import DocumentView from "./DocumentView";
import Main from "./Main";
import { useEffect } from "react";
import axios
    from "axios";
import { useState } from "react";

const Document = (props) => {
    const [doc_ids, setDoc_ids] = useState([]);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2ODU2LCJleHAiOjE2NzMwMjg4NTZ9.2G84rwn7b1FcD60TAbxcljmTylOZJ4VXz2Y932g55bo'
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            await axios
                .get("http://localhost:2002/document", config)
                .then((res) => {
                    let docs = res.data.data.documents;
                    let tmp = [];
                    for (let id in docs) {
                        tmp.push(id)
                    }
                    setDoc_ids(tmp);
                });
        } catch (e) {
            console.log(e.response.data);
        }
    }

    const { doc_id } = useParams();


    return (
        <>
            {doc_id === "" && <Main />}
            {doc_ids.map((id, index) => (
                doc_id === id && <DocumentView id={id} />
            ))}
        </>
    );
};

export default Document;