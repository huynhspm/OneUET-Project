import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";

const Comment = (props) => {
    const [content, setContent] = useState("");

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
            >
                Post
            </Button>
        </Box>
    );
}

export default Comment;