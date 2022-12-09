import { TextField, Button } from "@mui/material";
import { useState } from "react";

const Comment = (props) => {
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

export default Comment;