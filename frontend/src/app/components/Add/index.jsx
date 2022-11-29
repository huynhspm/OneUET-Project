import {
    Box,
    Button,
    Fab,
    Modal,
    styled,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';

const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const UserBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
});

const drawerWidth = 240;

const Add = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Tooltip
                onClick={(e) => setOpen(true)}
                title="Add new document"
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: { xs: 'calc(50% - 25px)', md: 30 },
                }}
            >
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Tooltip>
            <StyledModal
                open={open}
                onClose={(e) => setOpen(false)}
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
                        Create new document
                    </Typography>
                    {/* <UserBox>
                        <Avatar
                            src="https://images.pexels.com/photos/2383750/pexels-photo-2383750.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            sx={{ width: 30, height: 30 }}
                        />
                        <Typography fontWeight={500} variant="span">
                            Nadet LAMBI-BIDZIMOU
                        </Typography>
                    </UserBox> */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', top: 52 }}>
                        <Box
                            component="nav"
                            sx={{ width: { sm: 500 }, pt: 1, flexShrink: { sm: 0 } }}
                            aria-label="mailbox folders"
                        >
                            <TextField
                                sx={{ width: '100%' }}
                                id="standard-multiline-static"
                                multiline
                                rows={3}
                                placeholder="Type something"
                                variant="standard"
                            />
                        </Box>
                        <Box
                            component="main"
                            sx={{ flexGrow: 1, pl: 2, pt: 1, width: { sm: 500 } }}
                        >
                            abaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            abaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            abaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            abaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            abaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            abaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            {/* </Box> */}
                        </Box>
                    </Box>
                    {/* <Box sx={{
                        
                    }}> */}
                        <Button variant="contained" sx={{
                            borderRadius: 2,
                            width: '100px',
                            bottom: 20,
                            right: 20,
                            position: 'absolute',

                            // left: "50% - 500px",
                            // marginLeft: -100,
                        }}>
                            POST
                        </Button>
                    {/* </Box> */}
                </Box>
            </StyledModal>
        </>
    );
};

export default Add;
