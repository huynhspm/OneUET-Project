import { Card, CardMedia, CardActions, CardContent, Typography, Button } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import PreviewDocument from '../PreviewDocument';
import axios from 'axios';
import { documentCardHeight } from '../../utils/config';

const DocumentCard = (props) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    return (
        <>
            <Card sx={{ m: 2, width: 250, height: 380 }} >
                <CardMedia
                    component="img"
                    height={documentCardHeight}
                    image={props.src_img}
                    alt="sorry about error"
                />
                <CardContent sx={{ maxHeight: 70 }}>
                    <Typography sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                    }} variant="h5" >
                        {props.name}
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} >
                    <Button component={Link} onClick={handleClick}><RemoveRedEyeIcon sx={{ mr: 1 }} />Xem tài liệu</Button>
                </CardActions>
            </Card >
            <PreviewDocument
                open={open}
                onClose={() => setOpen(false)}
                description={props.description}
                name={props.name}
                docID={props.docID}
                path={props.path}
                dateUploaded={props.dateUploaded}
                linkView={props.linkView}
            />
        </>
    )
}

export default DocumentCard;
