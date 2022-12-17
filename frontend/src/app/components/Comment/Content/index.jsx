import { Typography, Box, Divider } from "@mui/material";

const CommentContent = (props) => {

    const comments = props.comments

    return (
        <>
            {comments.map(comment => (
                <Box key={comment.id}>
                    <Typography variant="body2" component="span" sx={{ p: 1 }}>
                        {<Typography variant="button">{comment.user.email}</Typography>} {comment.content}
                    </Typography>
                    <Divider />
                </Box>
            ))}
        </>
    );
};

export default CommentContent;
