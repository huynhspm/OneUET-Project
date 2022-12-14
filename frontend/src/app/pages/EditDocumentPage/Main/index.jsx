import {
    Box,
    Divider,
    Typography,
    TextField,
    Button,
    InputLabel,
    Select,
    Grid,
    MenuItem,
    FormControl,

} from '@mui/material';

import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { units, majors, categories, years, api_url } from '../../../utils/config';
import { InputBox, InputButton } from '../../../utils/styles';
import "../../../utils/styles.css"
import { Link } from 'react-router-dom';
import { controlValue } from '../../../utils/function';
import { useNavigate } from 'react-router-dom';

const Main = (props) => {
    //document properties
    const [linkView, setLinkView] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [unit, setUnit] = useState(null);
    const [major, setMajor] = useState(null);
    const [teacherId, setTeacherId] = useState(null);
    const [courseId, setCourseId] = useState(null);
    const [category, setCategory] = useState(null);
    const [year, setYear] = useState(null);
    const docId = String(props.id);

    const [course, setCourse] = useState([]);
    const [teacher, setTeacher] = useState({});

    // navigate page
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

    useEffect(() => {
        if (token !== '') {
            fetchAllTeachers();
            fetchAllCourses();
            fetchData();
        }
    }, [token]);

    const fetchData = async () => {
        try {
            await axios
                .get(api_url + "/api/document/me/" + docId, config)
                .then((res) => {
                    let data = res.data.data;
                    console.log("----------");
                    console.log(data);
                    console.log("----------");
                    setLinkView(data.document.linkView);
                    setName(data.document.name);
                    setDescription(data.document.description);
                    setUnit(data.document.unit);
                    setTeacherId(data.document.teacherId);
                    setCourseId(data.document.courseId);
                    setMajor(data.document.major);
                    setCategory(data.document.category);
                    setYear(data.document.year);
                });
        } catch (e) {
            console.log(e.response.data);
        }
    }

    const fetchAllCourses = async () => {
        try {
            await axios
                .get(api_url + "/api/course", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((res) => {
                    let courses = res.data.data.courses;
                    let tmp = {};
                    for (let index in courses) {
                        let id = courses[index].id;
                        let name = courses[index].name;
                        course[id] = name;
                        tmp[id] = name;
                    }
                    setCourse(tmp);
                });
        } catch (e) {
            console.log(e.response.data);
        }
    };

    const fetchAllTeachers = async () => {
        try {
            await axios
                .get(api_url + "/api/teacher", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((res) => {
                    let teachers = res.data.data.teachers;
                    let tmp = {};
                    for (let index in teachers) {
                        let id = teachers[index].id;
                        let name = teachers[index].name;
                        teacher[id] = name;
                        tmp[id] = name;
                    }
                    setTeacher(tmp);
                });
        } catch (e) {
            console.log(e);
        }
    }

    const updateDocument = async () => {
        try {
            await axios({
                method: 'put',
                url: String(api_url + "/api/document/me/" + docId),
                data: {
                    name,
                    description,
                    unit,
                    major,
                    teacherId,
                    courseId,
                    category,
                    year
                },
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (e) {
            console.log(e.response.data);
        }
        navigate('/document/' + docId);
    }

    return (
        <>
            <Box p={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        id="outlined-description"
                        name="outlined-description"
                        label="Title"
                        variant="standard"
                        value={String(name)}
                        onChange={(event) => setName(event.target.value)}
                        sx={{
                            width: 'calc(30%)',
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box
                        sx={{
                            pt: 1,
                            position: 'relative',
                            width: 'calc(60%)',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <iframe src={linkView} height='700vh' />
                    </Box>
                    <Box
                        sx={{ flexGrow: 1, pl: 2, pt: 1, width: 'calc(40%)', position: 'relative' }}
                    >
                        <Box component="form" sx={{ display: 'flex', flexDirection: 'row', top: 52 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        id="docDescription"
                                        name="docDescription"
                                        type="text"
                                        row="3"
                                        value={String(description)}
                                        onChange={(event) => setDescription(event.target.value)}
                                        sx={{
                                            width: 'calc(100%)',
                                        }}
                                    />
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
                                        <InputLabel id="major-label">Ng??nh</InputLabel>
                                        <Select fullWidth labelId="major-label" id="docMajor" label="Ng??nh"
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
                                        <InputLabel id="teacher-label">Gi???ng vi??n</InputLabel>
                                        <Select fullWidth labelId="teacher-label" id="docTeacher" label="Gi???ng vi??n"
                                            value={controlValue(teacherId)}
                                            onChange={(event) => {
                                                setTeacherId(event.target.value);
                                            }}
                                        >
                                            {Object.keys(teacher).map((id, index) => (
                                                <MenuItem key={index} value={id}>
                                                    {teacher[id]}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="course-label">M??n</InputLabel>
                                        <Select fullWidth labelId="course-label" id="docCourse" label="M??n"
                                            value={controlValue(courseId)}
                                            onChange={(event) => {
                                                setCourseId(event.target.value);
                                            }}
                                        >
                                            {Object.keys(course).map((id, index) => (
                                                <MenuItem key={index} value={id}>
                                                    {course[id]}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="category-label">Lo???i</InputLabel>
                                        <Select fullWidth labelId="category-label" id="docCategory" label="Lo???i"
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
                                        <InputLabel id="year-label">N??m</InputLabel>
                                        <Select fullWidth labelId="category-label" id="docYear" label="N??m"
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
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 10,
                            }}
                        >
                            <Button sx={{ mr: 1 }} component={Link} to={String('/document/') + docId}> CANCEL </Button>
                            <Button variant='contained' onClick={updateDocument}> UPDATE </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Main;