import { Card, CardMedia, CardActions, CardContent, Typography } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Viewer } from '@react-pdf-viewer/core';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import PreviewDocument from '../PreviewDocument';
// Import styles
import './styles.css'



const DocumentCard = (props) => {
    const [open, setOpen] = useState(null);

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

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
            />
        </>
    )
}


export default DocumentCard;

