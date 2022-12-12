import {
    Box,
    Button,
    Fab,
    Grid,
    Input,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import axios from "axios";
import { InputBox, InputButton } from './styles';
import { CenterModal } from '../../utils/styles';
import { faculties, majors, categories } from '../../utils/constant';

const Add = () => {
    const [open, setOpen] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const docName = data.get("docName");
        const docDescription = data.get("docDescription");
        const docFaculty = data.get("docfaculty");
        const docMajor = data.get("docMajor");
        const docLecturer = data.get("docLecturer");
        const docSubject = data.get("docSubject");
        const docType = data.get("docType");
        const docYear = data.get("docYear");

        try {
            const res = await axios.post("http://localhost:2002/file", {
                docName,
                docDescription,
                docFaculty,
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
            <CenterModal
                open={open}
                onClose={(e) => setOpen(false)}
            >
                <Box
                    bgcolor={'background.default'}
                    color={'text.primary'}
                    borderRadius={2}
                    sx={{
                        p: 3,
                        position: 'relative',
                        width: 'calc(60%)',
                        height: 'calc(80%)',
                        display: 'flex',
                        flexDirection: 'column'
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
                            sx={{ width: '50%', pt: 1, flexShrink: { sm: 0 }, mt: 1 }}
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
                                    <FormControl fullWidth>
                                        <InputLabel id="faculty-label">Khoa</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="faculty-label"
                                            id="docFaculty"
                                            // value={age}
                                            label="Khoa"
                                        >
                                            {faculties.map((faculty) => (
                                                <MenuItem key={faculty}>
                                                    {faculty}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="major-label">Ngành</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="major-label"
                                            id="docMajor"
                                            // value={age}
                                            label="Ngành"
                                        >
                                            {majors.map((major) => (
                                                <MenuItem key={major}>
                                                    {major}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
                                    <FormControl fullWidth>
                                        <InputLabel id="category-label">Loại</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="category-label"
                                            id="docCategory"
                                            // value={age}
                                            label="Loại"
                                        >
                                            {categories.map((category) => (
                                                <MenuItem key={category}>
                                                    {category}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
                        <Box sx={{ flexGrow: 1, pt: 2, pl: 2, height: 350 }}>
                            <InputBox>
                                <InputButton
                                    variant="outlined"
                                    component="label"
                                    fullWidth="true"
                                >
                                    Upload File
                                    <input
                                        type="file"
                                        hidden
                                    />
                                </InputButton>
                            </InputBox>
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
            </CenterModal>
        </>
    );
};

export default Add;
