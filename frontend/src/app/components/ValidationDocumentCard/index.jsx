import { Card, CardMedia, CardActions, CardContent, Typography, Button } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { documentCardHeight } from '../../utils/config';
import ValidationPreviewDocument from '../ValidationPreviewDocument';

const ValidationDocumentCard = (props) => {
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
                    <Typography sx={{ display: 'flex' }} variant="h5" >
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
            <ValidationPreviewDocument
                open={open}
                onClose={() => setOpen(false)}
                description={props.description}
                name={props.name}
                docID={props.docID}
                path={props.path}
                linkView={props.linkView}
            />
        </>
    )
}

export default ValidationDocumentCard;
