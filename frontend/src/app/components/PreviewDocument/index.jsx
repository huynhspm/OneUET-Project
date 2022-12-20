import { Modal, Box, Button, Divider, Zoom, Hidden, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import '../../utils/styles.css';
import { CenterModal } from '../../utils/styles';

const PreviewDocument = (props) => {
    return (
        <>
            <CenterModal
                open={props.open}
                onClose={props.onClose}
            >
                <Box
                    bgcolor={'background.default'}
                    color={'text.primary'}
                    borderRadius={2}
                    sx={{
                        p: 3,
                        position: 'relative',
                        width: 'calc(60%)',
                        height: 'calc(80%)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography variant="h6" color="black" textAlign="left">
                        {props.name}
                    </Typography>
                    <Typography>
                        {props.description}
                    </Typography>
                    <Divider />
                    <Typography color="textSecondary" className="datePosted" sx={{ pt: 1 }}>
                        5 DAYS AGO
                    </Typography>
                    <iframe src={props.linkView} className='pdf-viewer'></iframe>
                    <Button variant='contained' sx={{mt:3}} component={Link} to={String(props.path) + String(props.docID)}>View Full Page</Button>
                </Box>
            </CenterModal>
        </>
    );
};

export default PreviewDocument;