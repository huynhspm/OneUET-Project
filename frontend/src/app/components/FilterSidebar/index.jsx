import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Box,
    Collapse,
    Divider,
    FormGroup,
    FormControlLabel,
    Typography,
    Checkbox
} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FilterBox, CategoryBox } from "../../utils/styles";
import { useEffect, useState } from "react";
import React from "react";
import { categories, units, majors, years, api_url } from "../../utils/config";
import axios from "axios";
import { getFilterPair } from "../../utils/function";
import { useNavigate } from "react-router-dom";

const FilterSidebar = (props) => {

    const navigate = useNavigate();

    // user token
	const [token, setToken] = useState('');

    const getToken = () => {
		if (token === '') {
			const lastToken = sessionStorage.getItem("token");
			if (lastToken !== null && lastToken !== undefined) {
				setToken(lastToken);
			} else {
				navigate('/login');
			}
		}
    }

	// fetch user token
	useEffect(() => {
        getToken();
	}, [token, navigate]);

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [filterData, setFilterData] = useState({
        "Khoa": units,
        "Ngành": majors,
        "Giảng viên": props.teacher,
        "Môn": props.course,
        "Loại": categories,
        "Năm": years
    });

    const [openUnits, setOpenUnits] = useState(false);
    const [openMajors, setOpenMajors] = useState(false);
    const [openTeachers, setOpenTeachers] = useState(false);
    const [openCourses, setOpenCourses] = React.useState(false);
    const [openCategories, setOpenCategories] = React.useState(false);
    const [openYears, setOpenYears] = React.useState(false);

    const open = [
        openUnits,
        openMajors,
        openTeachers,
        openCourses,
        openCategories,
        openYears
    ];

    const setOpen = [
        setOpenUnits,
        setOpenMajors,
        setOpenTeachers,
        setOpenCourses,
        setOpenCategories,
        setOpenYears
    ];

    // all documents that consist of teacherId and courseId 
    const [filterTeacherId, setfilterTeacherId] = useState([]);
	const [filterCourseId, setfilterCourseId] = useState([]);

    useEffect(() => {
        if (token !== '') {
            fetchData();
        }
    }, [token]);
    
    const fetchData = async () => {
        try {
            await axios
                .get(api_url + "/api/document/public", config)
                .then((res) => {
                    let docs = res.data.data.documents;
                    let tmpTeacherId = [];
					let tmpCourseId = [];
                    for (let index in docs) {
                        tmpTeacherId.push(docs[index].teacherId);
						tmpCourseId.push(docs[index].courseId);
                    }
                    setfilterCourseId(tmpCourseId);
					setfilterTeacherId(tmpTeacherId);
                });
        } catch (e) {
            console.log(e.response.data);
        }
    }


    function handleClick(index) {
        return (() => {
            setOpen[index](!open[index]);
        });
    };

    function toVariable(str) {
        if (str === "Khoa") return "unit";
        if (str === "Ngành") return "major";
        if (str === "Loại") return "category";
        if (str === "Năm") return "year";
    }

    const handleCheck = (event) => {
        let param = event.nativeEvent.path[7].childNodes[1].innerText;
        let value = event.nativeEvent.path[2].innerText;

        let clone = { ...props.filterParams };
        // let x = props.filterParams[toVariable(param)].push(event.nativeEvent.path[2].innerText);
        // props.setFilterParams(props.filterParams);

        if (event.target.checked) {
            clone[toVariable(param)].push(value);
            props.setFilterParams(clone);
        } else {
            let index = props.filterParams[toVariable(param)].indexOf(value);
            clone[toVariable(param)].splice(index, 1);
            props.setFilterParams(clone);
        }

    }

    const handleCheckTeacher = (event) => {
        let clone = { ...props.filterParams };
        let value = event.target.defaultValue;

        if (event.target.checked) {
            clone['teacherId'].push(value);
            props.setFilterParams(clone);
        } else {
            let index = props.filterParams['teacherId'].indexOf(value);
            clone['teacherId'].splice(index, 1);
            props.setFilterParams(clone);
        }
    }

    const handleCheckCourse = (event) => {
        let clone = { ...props.filterParams };
        let value = event.target.defaultValue;

        if (event.target.checked) {
            clone['courseId'].push(value);
            props.setFilterParams(clone);
        } else {
            let index = props.filterParams['courseId'].indexOf(value);
            clone['courseId'].splice(index, 1);
            props.setFilterParams(clone);
        }
    }

    return (
        <>
            <Divider />
            <List>
                <ListItem>
                    <FilterBox>Filter</FilterBox>
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
                                {data !== "Giảng viên" && data !== 'Môn' && filterData[data].map((text, index) => (
                                    <FormControlLabel
                                        key={index}
                                        label={<Typography sx={{ fontSize: 14 }}>{text}</Typography>}
                                        control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} />}
                                        onChange={handleCheck}
                                        sx={{ pl: 1 }} />
                                ))}
                                {data === "Giảng viên" && Object.keys(getFilterPair(filterTeacherId, props.teacher)).map((id, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={id}
                                        label={<Typography sx={{ fontSize: 14 }}>{props.teacher[id]}</Typography>}
                                        control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} />}
                                        onChange={handleCheckTeacher}
                                        sx={{ pl: 1 }} />
                                ))}
                                {data === "Môn" && Object.keys(getFilterPair(filterCourseId, props.course)).map((id, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={id}
                                        label={<Typography sx={{ fontSize: 14 }}>{props.course[id]}</Typography>}
                                        control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} />}
                                        onChange={handleCheckCourse}
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