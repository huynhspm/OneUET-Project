import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemButton,
    Box,
    Collapse,
    Divider,
    FormGroup,
    FormControlLabel,
    Typography,
    Checkbox
} from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { FilterBox, CategoryBox } from "../../utils/styles";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { categories, faculties, majors } from "../../utils/constant";

const FilterSidebar = (props) => {
    const [filterData, setFilterData] = useState({
        Khoa: faculties, //Object.keys(facultiesAndMajors),
        Ngành: majors,
        "Giảng viên": [],
        Môn: [],
        Loại: categories,
        Năm: [2021, 2022]
    });
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2ODU2LCJleHAiOjE2NzMwMjg4NTZ9.2G84rwn7b1FcD60TAbxcljmTylOZJ4VXz2Y932g55bo'
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [openFaculties, setOpenFaculties] = React.useState(false);
    const [openMajors, setOpenMajors] = React.useState(false);
    const [openTeachers, setOpenTeachers] = React.useState(false);
    const [openCourses, setOpenCourses] = React.useState(false);
    const [openCategories, setOpenCategories] = React.useState(false);
    const [openYears, setOpenYears] = React.useState(false);

    const open = [
        openFaculties,
        openMajors,
        openTeachers,
        openCourses,
        openCategories,
        openYears
    ];

    const setOpen = [
        setOpenFaculties,
        setOpenMajors,
        setOpenTeachers,
        setOpenCourses,
        setOpenCategories,
        setOpenYears
    ];

    function handleClick(index) {
        return (() => {
            setOpen[index](!open[index]);
        });
    };

    useEffect(() => {
        fetchAllCourses();
        fetchAllTeachers();
    }, []);

    const fetchAllCourses = async () => {
        try {
            await axios
                .get("http://localhost:2002/course", config)
                .then((res) => {
                    let courses = res.data.data.courses;
                    for (let index in courses) {
                        filterData['Môn'].push(courses[index].name);
                    }
                });
        } catch (e) {
            console.log(e.response.data);
        }
    };

    const fetchAllTeachers = async () => {
        try {
            await axios
            .get("http://localhost:2002/teacher", config)
            .then((res) => {
                let teachers = res.data.data.teachers;
                for (let index in teachers) {
                    filterData['Giảng viên'].push(teachers[index].name);
                }
            });
        } catch (e) {
            console.log(e.response.data);
        }
    }

    const handleCheck = (event) => {
        console.log(event);
    }

    return (
        <>
            <Divider />
            <List>
                <ListItem>
                    <FilterBox> Filter </FilterBox>
                </ListItem>
            </List>
            <List>
                {Object.keys(filterData).map((data, index) => (
                    <Box key={String(data)}>
                        <Divider />
                        <ListItemButton onClick={handleClick(index)}>
                            <ListItemText primary={<CategoryBox> {data} </CategoryBox>} />
                            {open[index] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open[index]} timeout="auto" unmountOnExit>
                            <FormGroup sx={{ ml: 2 }}>
                                {filterData[data].map((text, index) => (
                                    <FormControlLabel
                                        key={index}
                                        label={<Typography sx={{ fontSize: 14 }}>{text}</Typography>}
                                        control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} />}
                                        onChange={handleCheck}
                                        sx={{ pl: 1 }} />
                                ))}
                            </FormGroup>
                        </Collapse>
                    </Box>
                ))}
            </List>
            <Divider />
        </>
    );
};

export default FilterSidebar;