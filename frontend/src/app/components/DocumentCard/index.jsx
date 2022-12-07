import { Card, CardMedia, CardActions, CardContent, Typography } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Viewer } from '@react-pdf-viewer/core';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import PreviewDocument from '../PreviewDocument';
import axios from 'axios';
import './styles.css'

const DocumentCard = (props) => {
    const [open, setOpen] = useState(null);
    const [tags, setTags] = useState([]);

    const handleClick = (event) => {
        setOpen(event.currentTarget);
        fetchData()
    };

    const fetchData = async () => {
        try {
            await axios
                .get("http://localhost:2002/document/" + String(props.index + 1))
                .then((res) => {
                    // console.log('--fetchData() - DocumentCard--');
                    // console.log(String(props.index));
                    // console.log(res);
                    // console.log('------------------------------');
                    
                    let tmp = [
                        props.faculty,
                        props.major,
                    ];
                    setTags(tmp);
                })
                .then(() => {
                    console.log(tags);
                });
        } catch (e) {
            console.log(e.response);
        }
    }

    const handleClose = () => {
        setOpen(null);
    };

    return (
        <>
            < Card class="doc_card" >
                <CardMedia
                    component="img"
                    height={props.height}
                    image={props.src_img}
                    alt="sorry about error"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link class="btn" onClick={handleClick}><RemoveRedEyeIcon />Xem tài liệu</Link>
                </CardActions>
            </Card >
            <PreviewDocument
                open={open}
                setOpen={setOpen}
                description={props.description}
                title={props.title}
                index={props.index}
                tags={tags}
            />
        </>
    )
}


export default DocumentCard;

