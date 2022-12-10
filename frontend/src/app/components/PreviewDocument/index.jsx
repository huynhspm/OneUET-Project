import { Modal, Box, Button, Divider, TextField, Hidden, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import OptionsDialog from '../OpitonsDialog';
import '../../utils/styles.css';
import Tags from '../Tags';
import Comment from '../Comment';
import { CenterModal } from '../../utils/styles';

const PreviewDocument = (props) => {
    const [showOptionsDialog, setOptionsDialog] = useState(false);
    const handleClose = () => {
        props.setOpen(false);
    }

    // const { id, media, likes, user, caption, comments } = defaultPost;
    const comments = ['abc', 'def', 'ghi'];

    const open = props.open;

    let t1 = "https://docs.google.com/viewer?srcid=";
    let t2 = "&pid=explorer&efh=false&a=v&chrome=false&embedded=true";

    const pdf_link = t1.concat('1pRHDGYar6n85cSndPP0XYuBKNcBlqEqd', t2);

    return (
        <>
            <CenterModal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                    <iframe src={pdf_link} class='pdf-viewer'></iframe>
                    <Button variant='contained' sx={{mt:3}} component={Link} to={"/document/" + String(props.index + 1)}>View Full Page</Button>
                    {showOptionsDialog && (
                        <OptionsDialog onClose={() => setOptionsDialog(false)} />
                    )}
                </Box>
            </CenterModal>
        </>
    );
};

export default PreviewDocument;