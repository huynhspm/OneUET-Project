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
	const [data, setData] = React.useState([]);
	const [card, setCard] = React.useState([]);
	const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2ODU2LCJleHAiOjE2NzMwMjg4NTZ9.2G84rwn7b1FcD60TAbxcljmTylOZJ4VXz2Y932g55bo'
	const config = {
		headers: { Authorization: `Bearer ${token}` }
	};

	function getDocuments(data) {
		let docs = data.data;
		return docs?.documents;
	}

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			await axios
				.get("http://localhost:2002/document/public", config)
				.then((res) => {
					let docs = getDocuments(res.data);
					console.log(res);
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
					console.log("--fetchData() - Document--");
					console.log(tmp);
					console.log("-------------------------");

					setCard(tmp);
				});
		} catch (e) {
			console.log(e.response.data);
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
						<FilterSidebar />
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
			<Add></Add>
		</>
	);
};

export default Main;
