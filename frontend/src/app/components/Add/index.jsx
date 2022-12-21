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

import { InputBox, InputButton } from '../../utils/styles';
import { CenterModal } from '../../utils/styles';
import { units, majors, categories, years } from '../../utils/config';
import { fileToDataUri, controlValue } from '../../utils/function';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api_url } from '../../utils/config';

const Add = (props) => {
    const [open, setOpen] = useState(false);

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

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [name, setName] = useState('');
    const [dataUri, setDataUri] = useState('');
    const [description, setDescription] = useState(null);
    const [unit, setUnit] = useState(null);
    const [major, setMajor] = useState(null);
    const [teacherId, setTeacherId] = useState(null);
    const [courseId, setCourseId] = useState(null);
    const [category, setCategory] = useState(null);
    const [year, setYear] = useState(null);

    const [fileName, setFileName] = useState('UPLOAD FILE');

    const onChangeFilePDF = (file) => {
        if (!file) {
            setDataUri('');
            return;
        }

        fileToDataUri(file)
            .then(dataUri => {
                setDataUri(dataUri);
                console.log(dataUri);
            })
    }

    const postProcess = async () => {
        setOpen(false);
        setName('');
        setDataUri('');
        setDescription(null);
        setUnit(null);
        setMajor(null);
        setTeacherId(null);
        setCourseId(null);
        setCategory(null);
        setYear(null);
        setFileName('UPLOAD FILE');
    }

    const postDocument = async () => {
        let data = {
            name,
            description,
            unit,
            major,
            category,
            year,
            status: 'private',
            dataUri: { dataUri },
            userId: 1,
            courseId: parseInt(courseId),
            teacherId: parseInt(teacherId)
        }
        try {
            await axios.post(api_url + "/api/document", data, config);
        } catch (e) {
            console.log(e.response.data);
        }
        postProcess();
    }

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
            <CenterModal open={open} onClose={(e) => setOpen(false)}>
                <Box
                    bgcolor={'background.default'}
                    color={'text.primary'}
                    borderRadius={2}
                    sx={{
                        p: 3,
                        position: 'relative',
                        width: 'calc(60%)',
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
                            sx={{ width: '100%', pt: 1, flexShrink: { sm: 0 }, mt: 1 }}
                        >
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField required fullWidth label="Document Name" id="docName" name="docName" type="text" autoFocus
                                        value={controlValue(name)} onChange={(e) => { setName(e.target.value) }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Description" id="docDescription" name="docDescription" type="text" row="3"
                                        value={controlValue(description)} onChange={(e) => { setDescription(e.target.value) }} />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="unit-label">Khoa</InputLabel>
                                        <Select fullWidth labelId="unit-label" id="docunit" label="Khoa"
                                            value={controlValue(unit)}
                                            onChange={(event) => {
                                                setUnit(event.target.value);
                                            }}
                                        >
                                            {units.map((unit, index) => (
                                                <MenuItem key={index} value={unit}>
                                                    {unit}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="major-label">Ngành</InputLabel>
                                        <Select fullWidth labelId="major-label" id="docMajor" label="Ngành"
                                            value={controlValue(major)}
                                            onChange={(event) => {
                                                setMajor(event.target.value);
                                            }}
                                        >
                                            {majors.map((major, index) => (
                                                <MenuItem key={index} value={major}>
                                                    {major}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="teacher-label">Giảng viên</InputLabel>
                                        <Select fullWidth labelId="teacher-label" id="docTeacher" label="Giảng viên"
                                            value={controlValue(teacherId)}
                                            onChange={(event) => {
                                                setTeacherId(event.target.value);
                                            }}
                                        >
                                            {Object.keys(props.teacher).map((id, index) => (
                                                <MenuItem key={index} value={id}>
                                                    {props.teacher[id]}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="course-label">Môn</InputLabel>
                                        <Select fullWidth labelId="course-label" id="docCourse" label="Môn"
                                            value={controlValue(courseId)}
                                            onChange={(event) => {
                                                setCourseId(event.target.value);
                                            }}
                                        >
                                            {Object.keys(props.course).map((id, index) => (
                                                <MenuItem key={index} value={id}>
                                                    {props.course[id]}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="category-label">Loại</InputLabel>
                                        <Select fullWidth labelId="category-label" id="docCategory" label="Loại"
                                            value={controlValue(category)}
                                            onChange={(event) => {
                                                setCategory(event.target.value);
                                            }}
                                        >
                                            {categories.map((category, index) => (
                                                <MenuItem key={index} value={category}>
                                                    {category}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="year-label">Năm</InputLabel>
                                        <Select fullWidth labelId="category-label" id="docYear" label="Năm"
                                            value={controlValue(year)}
                                            onChange={(event) => {
                                                setYear(event.target.value);
                                            }}
                                        >
                                            {years.map((year, index) => (
                                                <MenuItem key={index} value={year}>
                                                    {year}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1, p: 2, height: 350 }}>
                        <InputBox>
                            <InputButton
                                variant="outlined"
                                component="label"
                                fullWidth
                            >
                                <Typography variant='h6'>
                                    {fileName}
                                </Typography>
                                <input
                                    type="file"
                                    hidden
                                    onChange={(event) => {
                                        onChangeFilePDF(event.target.files[0] || null);
                                        let name = event.target.value.split('\\');
                                        let len = name.length;
                                        setFileName(name[len - 1]);
                                    }} />
                            </InputButton>
                        </InputBox>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: 2,
                            width: '100px',
                            bottom: 20,
                            right: 20,
                            position: 'absolute',
                        }}
                        onClick={postDocument}
                    >
                        POST
                    </Button>
                </Box>
            </CenterModal>
        </>
    );
};

export default Add;
