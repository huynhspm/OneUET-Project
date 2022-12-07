import { Modal, Box, Button, Divider, TextField, Hidden, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import OptionsDialog from '../OpitonsDialog';
import './styles.css';
import Tags from '../Tags';
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
                                <iframe src={pdf_link} width="600px" height="500px"></iframe>
                            </div>
                        </Box>
                        <Box
                            sx={{ flexGrow: 1, pl: 2, pt: 1, width: { sm: 500 }, position: 'relative' }}
                        >
                            <Typography>
                                {props.description}
                            </Typography>
                            <Divider />
                            <Tags data={props.tags}></Tags>
                            <Typography color="textSecondary" className="datePosted" sx={{ pt: 1 }}>
                                5 DAYS AGO
                            </Typography>
                            {/* <Link to={`/p/${id}`}>
                                <Typography
                                    className="commentsLink"
                                    variant="body2"
                                    component="div"
                                >
                                    View all {comments.length} comments
                                </Typography>
                            </Link> */}
                            <Divider />
                            {comments.map(comment => (
                                <Box sx={{}}>
                                    <Typography variant="body2" component="span">
                                        {comment}
                                    </Typography>
                                    <Divider />
                                </Box>
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
            </CenterModal>
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
                sx={{
                    pb: 0
                }}
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