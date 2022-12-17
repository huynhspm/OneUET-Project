import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const CommentPost = (props) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2ODU2LCJleHAiOjE2NzMwMjg4NTZ9.2G84rwn7b1FcD60TAbxcljmTylOZJ4VXz2Y932g55bo';
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const [content, setContent] = useState("");

    const postComment = async () => {
        try {
            let data = {
                content: content,
                documentId: props.docId,
                userId: 1
            };
            await axios.post("http://localhost:2002/comment", data, config).then(() => {
                    setContent("");
                }).then(() => props.onClick());
        } catch (e) {
            console.log(e.response.data);
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <TextField
                value={content}
                placeholder="Add a comment..."
                multiline
                onChange={event => setContent(event.target.value)}
                sx={{
                    pb: 0,
                    width: 'calc(100%)',
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
                onClick={postComment}
            >
                Post
            </Button>
        </Box>
    );
}

export default CommentPost;