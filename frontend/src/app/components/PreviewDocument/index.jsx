import { Modal, Box, Button, Divider, TextField, Hidden, styled, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { defaultPost } from '../data';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import OptionsDialog from '../OpitonsDialog';
import './styles.css';

const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const PreviewDocument = (props) => {
    const [showOptionsDialog, setOptionsDialog] = useState(false);
    
    const { id, media, likes, user, caption, comments } = defaultPost;

    const open = props.open;
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const handleClose = () => {
        props.setOpen(false);
    }

    return (
        <>
            <StyledModal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    bgcolor={'background.default'}
                    color={'text.primary'}
                    width={1200}
                    height={600}
                    p={3}
                    borderRadius={2}
                    sx={{
                        position: 'relative'
                    }}
                >
                    <Typography variant="h6" color="gray" textAlign="left">
                        {props.title}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', top: 52 }}>
                        <Box
                            sx={{ width: { sm: 600 }, pt: 1, flexShrink: { sm: 0 } }}
                            aria-label="mailbox folders"
                        >
                            <div class='pdf-viewer'>
                                <Viewer
                                    fileUrl="https://arxiv.org/pdf/2003.13401.pdf"
                                    plugins={[
                                        defaultLayoutPluginInstance
                                    ]}
                                />
                            </div>
                        </Box>
                        <Box
                            sx={{ flexGrow: 1, pl: 2, pt: 1, width: { sm: 500 }, position: 'relative' }}
                        >
                            <Typography>
                                {props.description}
                            </Typography>
                            <Divider />
                            <Typography color="textSecondary" className="datePosted" sx={{ pt: 1 }}>
                                5 DAYS AGO
                            </Typography>
                            <Link to={`/p/${id}`}>
                                <Typography
                                    className="commentsLink"
                                    variant="body2"
                                    component="div"
                                >
                                    View all {comments.length} comments
                                </Typography>
                            </Link>
                            {comments.map(comment => (
                                <div key={comment.id}>
                                    <Link to={`/${comment.user.username}`}>
                                        <Typography
                                            variant="subtitle2"
                                            component="span"
                                            className="commentUsername"
                                        >
                                            {comment.user.username}
                                        </Typography>{" "}
                                        <Typography variant="body2" component="span">
                                            {comment.content}
                                        </Typography>
                                    </Link>
                                </div>
                            ))}

                            <Box sx={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%'
                            }}>
                                <Divider />
                                <Comment />
                            </Box>
                        </Box>
                    </Box>

                    {showOptionsDialog && (
                        <OptionsDialog onClose={() => setOptionsDialog(false)} />
                    )}
                </Box>
            </StyledModal>
        </>
    );
};

function Comment() {
    const [content, setContent] = useState("");

    return (
        <div class="commentContainer">
            <TextField
                fullWidth
                value={content}
                placeholder="Add a comment..."
                multiline
                rowsMax={2}
                rows={1}
                onChange={event => setContent(event.target.value)}
                class="textField"
                InputProps={{
                    classes: {
                        root: ".root",
                        underline: "underline"
                    }
                }}
            />
            <Button
                color="primary"
                disabled={!content.trim()}
            >
                Post
            </Button>
        </div>
    );
}


export default PreviewDocument;