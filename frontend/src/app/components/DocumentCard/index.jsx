import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";
import { Modal, Box, Button, Divider, TextField, Hidden } from '@mui/material';
import OptionsDialog from '../OpitonsDialog';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HTMLEllipsis from "react-lines-ellipsis/lib/html";

import { useState } from 'react';
import './styles.css'



import { defaultPost } from '../data';

const DocumentCard = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const [showCaption, setCaption] = useState(false);
    const [showOptionsDialog, setOptionsDialog] = useState(false);
    const { id, media, likes, user, caption, comments } = defaultPost;

    const open = Boolean(anchorEl);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        pt: 1,
        px: 2,
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} >
                        <article
                            class="article"
                            style={{ marginBottom: 30 }}
                        >
                            {/* Feed Post Header */}
                            <div className="postHeader">
                                {props.title}
                                <MoreVertIcon
                                    className="moreIcon"
                                    onClick={() => setOptionsDialog(true)}
                                />
                            </div>
                            {/* Feed Post Image */}
                            <div>
                                <img src={props.src_img} alt="Post media" className="image" />
                            </div>
                            {/* Feed Post Buttons */}
                            <div>
                                <div className="postButtons">
                                    <Link to={`/p/${id}`}>
                                    </Link>
                                </div>

                                {/* <div className={"showCaption" ? classes.expanded : classes.collapsed}> */}
                                <div className="showCaption">
                                    <Link to={`/${user.username}`}>
                                        <Typography
                                            variant="subtitle2"
                                            component="span"
                                            className="username"
                                        >
                                            {user.username}
                                        </Typography>
                                    </Link>
                                    {"showCaption" ? (
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            dangerouslySetInnerHTML={{ __html: caption }}
                                        />
                                    ) : (
                                        <div className="captionWrapper">
                                            <HTMLEllipsis
                                                unsafeHTML={caption}
                                                className="caption"
                                                maxLine="0"
                                                ellipsis="..."
                                                basedOn="letters"
                                            />
                                            <Button
                                                className="moreButton"
                                                onClick={() => setCaption(true)}
                                            >
                                                more
                                            </Button>
                                        </div>
                                    )}
                                </div>
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
                                                {comment.contet}
                                            </Typography>
                                        </Link>
                                    </div>
                                ))}
                                <Typography color="textSecondary" className="datePosted">
                                    5 DAYS AGO
                                </Typography>
                            </div>
                            <Hidden xsDown>
                                <Divider />
                                <Comment />
                            </Hidden>
                        </article>
                        {showOptionsDialog && (
                            <OptionsDialog onClose={() => setOptionsDialog(false)} />
                        )}
                    </Box>
                </Modal>
            </Card >
        </>
    )
}

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

export default DocumentCard;

