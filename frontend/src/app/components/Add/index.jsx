import {
    Box,
    Button,
    Checkbox,
    Fab,
    FormControlLabel,
    Grid,
    Link,
    Modal,
    styled,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import axios from "axios";

const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const Add = () => {
    const [open, setOpen] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const docName = data.get("docName");
        const docDescription = data.get("docDescription");
        const docFalculty = data.get("docFalculty");
        const docMajor = data.get("docMajor");
        const docLecturer = data.get("docLecturer");
        const docSubject = data.get("docSubject");
        const docType = data.get("docType");
        const docYear = data.get("docYear");

        try {
            const res = await axios.post("http://localhost:2002/register", {
                docName,
                docDescription,
                docFalculty,
                docMajor,
                docLecturer,
                docSubject,
                docType,
                docYear,
            });
            console.log(res.data);
        } catch (e) {
            console.log(e.response.data);
        }
    };

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
                    <Box sx={{ display: 'flex', flexDirection: 'row', top: 52 }}>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ width: { sm: 500 }, pt: 1, flexShrink: { sm: 0 }, mt: 1 }}
                            aria-label="mailbox folders"
                        >
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Document Name"
                                        id="docName"
                                        name="docName"
                                        type="text"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Description"
                                        id="docDescription"
                                        name="docDescription"
                                        type="text"
                                        row="3"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Khoa"
                                        id="docFalculty"
                                        name="docFalculty"
                                        type="text"
                                        row="3"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        fullWidth 
                                        label="Ngành"
                                        id="docMajor"
                                        name="docMajor"
                                        type="text"
                                        row="3"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Giảng viên"
                                        id="docLecturer"
                                        name="docLecturer"
                                        type="text"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Môn"
                                        id="docSubject"
                                        name="docSubject"
                                        type="text"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Loại"
                                        id="docType"
                                        name="docType"
                                        type="text"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Năm"
                                        id="docYear"
                                        name="docYear"
                                        type="text"
                                    />
                                </Grid>
                            </Grid>
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
                        </Box>
                    </Box>                        
                    <Button variant="contained" sx={{
                        borderRadius: 2,
                        width: '100px',
                        bottom: 20,
                        right: 20,
                        position: 'absolute',
                    }}>
                        POST
                    </Button>
                </Box>
            </StyledModal>
        </>
    );
};

export default Add;
