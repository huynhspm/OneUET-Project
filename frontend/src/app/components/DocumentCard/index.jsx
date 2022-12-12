import { Card, CardMedia, CardActions, CardContent, Typography, Button } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import PreviewDocument from '../PreviewDocument';
import axios from 'axios';
import { documentCardHeight } from '../../utils/constant';

const DocumentCard = (props) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    return (
        <>
            <Card sx={{ m: 2 }} >
                <CardMedia
                    component="img"
                    height={documentCardHeight}
                    image={props.src_img}
                    alt="sorry about error"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} >
                    <Button component={Link} onClick={handleClick}><RemoveRedEyeIcon sx={{mr:1}} />Xem tài liệu</Button>
                </CardActions>
            </Card >
            <PreviewDocument
                open={open}
                onClose={() => setOpen(false)}
                description={props.description}
                name={props.name}
                docID={props.docID}
            />
        </>
    )
}

export default DocumentCard;
