import * as React from 'react';
import {
	Box,
	Drawer,
	Toolbar
} from '@mui/material';
import Add from '../../../components/Add';
import DocumentCard from '../../../components/DocumentCard';
import FilterSidebar from '../../../components/FilterSidebar';
import { getFilterPair, getDocumentThumbnail, toDateString } from '../../../utils/function';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { drawerWidth, documentCardHeight, units, majors, unitsAndMajors, api_url, ui_avatar_api } from '../../../utils/config';
import axios from "axios";
import '../styles.css'

const Main = (props) => {
	const [card, setCard] = React.useState([]);
	const navigate = useNavigate();

	// user token
	const [token, setToken] = useState('');

	// fetch user token
	const getToken = (() => {
		if (token === '') {
			const lastToken = sessionStorage.getItem("token");
			if (lastToken !== null && lastToken !== undefined) {
				// console.log(lastToken);
				setToken(lastToken);
			} else {
				navigate('/login');
			}
		}
	})

	const [course, setCourse] = useState([]);
	const [teacher, setTeacher] = useState({});

	const [filterParams, setFilterParams] = React.useState({
		unit: [],
		major: [],
		teacherId: [],
		courseId: [],
		category: [],
		year: []
	});

	useEffect(() => {
		getToken();
	}, [navigate]);

	useEffect(() => {
		getToken();
		if (token !== '') {
			fetchData();
			fetchAllTeachers();
			fetchAllCourses();
		}
	}, [filterParams, token]);

	const fetchData = async () => {
		try {
			await axios
				.get(api_url + "/api/document/public",
					{
						params: filterParams,
						headers: { Authorization: `Bearer ${token}` }
					})
				.then((res) => {
					let docs = res.data.data.documents;
					console.log(res);
					let tmpCard = [];
					for (let id in docs) {
						let element = {
							name: docs[id].name,
							description: docs[id].description,
							linkView: docs[id].linkView,
							src_img: getDocumentThumbnail(docs[id].name),
							unit: docs[id].unit,
							major: docs[id].major,
							fileID: docs[id].fileId,
							docID: docs[id].id,
							dateUploaded: toDateString(docs[id].updatedAt)
						}
						tmpCard.push(element);
					}
					setCard(tmpCard.reverse());
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
						minHeight: window.innerHeight,
						alignItems: 'flex-start',
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
									path='/document/'
									linkView={card.linkView}
									dateUploaded={card.dateUploaded}
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
