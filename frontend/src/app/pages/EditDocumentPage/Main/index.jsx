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
import { units, majors, categories } from '../../../utils/constant';
import { InputBox, InputButton } from '../../../utils/styles';
import "../../../utils/styles.css"
import { Link } from 'react-router-dom';

const Main = (props) => {
    // let t1 = "https://docs.google.com/viewer?srcid=";
    // let t2 = "&pid=explorer&efh=false&a=v&chrome=false&embedded=true";
    // const pdf_link = t1.concat(String(props.id), t2);

    const [pdf_link, set_pdf_link] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [tags, setTags] = useState([]);
    const docId = props.id;

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2ODU2LCJleHAiOjE2NzMwMjg4NTZ9.2G84rwn7b1FcD60TAbxcljmTylOZJ4VXz2Y932g55bo'
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await axios
                .get("http://localhost:2002/api/document/public/" + String(props.id), config)
                .then((res) => {
                    let data = res.data.data;
                    set_pdf_link(data.file.link);
                    setName(data.document.name);
                    setDescription(data.document.description);
                    setTags([
                        data.document.unit,
                        data.document.major,
                        data.course.name,
                        data.document.category,
                        data.document.year,
                    ]);
                });
        } catch (e) {
            console.log(e.response.data);
        }
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
                        <iframe src={pdf_link} height='700vh' />
                    </Box>
                    <Box
                        sx={{ flexGrow: 1, pl: 2, pt: 1, position: 'relative' }}
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
                                        <Select
                                            fullWidth
                                            labelId="unit-label"
                                            id="docunit"
                                            // value={age}
                                            label="Khoa"
                                        >
                                            {units.map((unit) => (
                                                <MenuItem key={unit}>
                                                    {unit}
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
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 10,
                            }}
                        >
                            <Button sx={{ mr: 1 }} component={Link} to={String('/document/') + docId}> CANCEL </Button>
                            <Button variant='contained'> UPDATE </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Main;