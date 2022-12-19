import * as React from 'react';
import {
	Box,
	Drawer,
	Toolbar
} from '@mui/material';
import DocumentCard from '../../../components/DocumentCard';
import FilterSidebar from '../../../components/FilterSidebar';
import Add from '../../../components/Add';
import { useState, useEffect } from 'react';

import { drawerWidth, documentCardHeight, units, majors, unitsAndMajors } from '../../../utils/constant';
import axios from "axios";
import '../styles.css'


const Main = (props) => {
	const [card, setCard] = React.useState([]);
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2ODU2LCJleHAiOjE2NzMwMjg4NTZ9.2G84rwn7b1FcD60TAbxcljmTylOZJ4VXz2Y932g55bo'
	const [course, setCourse] = useState([]);
	const [teacher, setTeacher] = useState({});

	const controlValueDictionary = (value) => {

	}

	const [filterParams, setFilterParams] = React.useState({
		unit: [],
		major: [],
		teacherId: [],
		courseId: [],
		category: [],
		year: []
	});

	useEffect(() => {
		fetchData();
		fetchAllTeachers();
		fetchAllCourses();
	}, [filterParams]);
	
	// useEffect(() => {
	// 	fetchAllTeachers();
	// 	fetchAllCourses();
	// }, []);

	const fetchData = async () => {
		try {
			await axios
				.get("http://localhost:2002/api/document/public",
					{
						params: filterParams,
						headers: { Authorization: `Bearer ${token}` }
					})
				.then((res) => {
					let docs = res.data.data.documents;
					// console.log(res);
					let tmp = [];
					for (let id in docs) {
						let element = {
							name: docs[id].name,
							description: docs[id].description,
							src_img: "https://randomuser.me/api/portraits/women/2.jpg",
							unit: docs[id].unit,
							major: docs[id].major,
							fileID: docs[id].fileId,
							docID: docs[id].id,
						}
						tmp.push(element);
					}
					setCard(tmp);
				});
		} catch (e) {
			console.log(e.response.data);
		}
	}


	const fetchAllCourses = async () => {
		try {
			await axios
				.get("http://localhost:2002/api/course", {
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
				.get("http://localhost:2002/api/teacher", {
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

	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'row' }}>
				<Box sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} >
					<Drawer
						variant="permanent"
						sx={{
							display: { xs: 'none', sm: 'block', display: 'flex', flexDirection: 'row' },
							'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
						}}
						open
					>
						<Toolbar variant="dense" sx={{}} />
						<FilterSidebar filterParams={filterParams} setFilterParams={setFilterParams} course={course} teacher={teacher} />
					</Drawer>
				</Box>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						p: 3,
						width: { sm: `calc(100% - ${drawerWidth}px)` },
						display: 'flex',
					}}
				>
					{
						card.length > 0 &&
						<Box sx={{ display: 'flex', flexWrap: "wrap", alignItems: 'center', justifyContent: 'flex-start', }}>
							{card.map((card, index) => (
								<DocumentCard
									src_img={card.src_img}
									name={card.name}
									description={card.description}
									unit={card.unit}
									major={card.major}
									key={index}
									docID={card.docID} />
							))}
						</Box>
					}
				</Box>
			</Box>
			<Add course={course} teacher={teacher} />
		</>
	);
};

export default Main;
