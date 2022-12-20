import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../../utils/config";


const CommentPost = (props) => {

    const navigate = useNavigate();

	// user token
	const [token, setToken] = useState('');

	// fetch user token
	useEffect(() => {
		if (token === '') {
			const lastToken = sessionStorage.getItem("token");
			if (lastToken !== null && lastToken !== undefined) {
				setToken(lastToken);
			} else {
				navigate('/login');
			}
		}
	}, [token, navigate]);

    const [content, setContent] = useState("");

    const postComment = async () => {
        try {
            await axios( 
            {
                method: 'post',
                url: api_url + "/api/comment",
                data: {
                    content: content,
                    documentId: props.docId,
                    userId: 1
                },
                headers: { Authorization: `Bearer ${token}` }
            }).then(() => {
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