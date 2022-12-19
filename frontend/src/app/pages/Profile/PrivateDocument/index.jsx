import React from "react";
import { Box, Drawer, Toolbar } from '@mui/material';
import DocumentCard from "../../../components/DocumentCard";
import Add from "../../../components/Add";
import { useState, useEffect } from "react";
import { drawerWidth } from "../../../utils/constant";
import { documentCardHeight } from "../../../utils/constant";
import axios from "axios";

const PrivateDocument = (props) => {
    const [card, setCard] = React.useState([]);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2ODU2LCJleHAiOjE2NzMwMjg4NTZ9.2G84rwn7b1FcD60TAbxcljmTylOZJ4VXz2Y932g55bo'
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };  
    
    function getDocuments(data) {
        let docs = data.data;
        return docs?.documents;
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await axios
                .get("http://localhost:2002/api/document/me", config)
                .then((res) => {
                    let docs = getDocuments(res.data);
                    console.log(res);
                    let tmp = [];
                    for (let id in docs) {
                        let element = {
                            name: docs[id].name,
                            description: docs[id].description,
                            src_img: "https://randomuser.me/api/portraits/women/2.jpg",
                            unit: docs[id].unit,
                            major: docs[id].major,
							fileID: docs[id].fileId,
                        }
                        tmp.push(element);
                    }
                    setCard(tmp);
                });
        } catch (e) {
            console.log(e.response.data);
        }
    }
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    {
                        card.length > 0 &&
                        <div>
                            <Box sx={{ display: 'flex', flexWrap: "wrap", }}>
                                {card.map((card, index) => (
                                    <DocumentCard
                                        key={index}
                                        height={documentCardHeight}
                                        src_img={card.src_img}
                                        name={card.name}
                                        description={card.description}
                                        unit={card.unit}
                                        major={card.major}
                                        fileID={card.fileID} />
                                ))}
                            </Box>
                        </div>
                    }

                </Box>
            </Box>
        </>
    );
};

export default PrivateDocument;
