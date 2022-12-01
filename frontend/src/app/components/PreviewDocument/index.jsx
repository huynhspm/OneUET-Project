

const PreviewDocument = (props) => {
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    bgcolor={'background.default'}
                    color={'text.primary'}
                    width={1000}
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
                            sx={{ width: { sm: 500 }, pt: 1, flexShrink: { sm: 0 } }}
                            aria-label="mailbox folders"
                        >
                            <div>
                                <img src={props.src_img} alt="Post media" className="image" />
                            </div>
                        </Box>
                        <Box
                            sx={{ flexGrow: 1, pl: 2, pt: 1, width: { sm: 500 }, position: 'relative' }}
                        >
                            <Typography>
                                {props.description}
                            </Typography>
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
                                </div>
                            )}
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
            </Modal>
        </>
    );
};

export default PreviewDocument;