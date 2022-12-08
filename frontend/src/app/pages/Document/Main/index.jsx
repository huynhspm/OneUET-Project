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

import { drawerWidth, documentCardHeight } from '../../../utils/constant';
import axios from "axios";
import '../styles.css'


const Document = (props) => {
	const [data, setData] = React.useState([]);
	const [card, setCard] = React.useState([]);
	// const [filter, setFilter] = React.useState([]);

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
				.get("http://localhost:2002/document")
				.then((res) => {
					let docs = getDocuments(res.data);
					console.log(res);
					let tmp = [];
					for (let id in docs) {
						let element = {
							title: docs[id].title,
							description: docs[id].description,
							src_img: "https://randomuser.me/api/portraits/women/2.jpg",
							faculty: docs[id].faculty,
							major: docs[id].major,
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

	const filterData = {
		Khoa: ['Inbox', 'Starred', 'Send email', 'Drafts'],
		Ngành: ['Công nghệ thông tin', 'Khoa học máy tính', 'Send email', 'Drafts', "Nganh A"]
	}

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
						<FilterSidebar filterData={filterData} />
					</Drawer>
				</Box>
				<Box
					component="main"
					sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
				>
					{
						card.length > 0 &&
						<div>
							<Box sx={{ display: 'flex', flexWrap: "wrap", }}>
								{card.map((card, index) => (
									<DocumentCard
										height={documentCardHeight}
										src_img={card.src_img}
										title={card.title}
										description={card.description}
										faculty={card.faculty}
										major={card.major}
										index={index} />
								))}
							</Box>
						</div>
					}

				</Box>
			</Box>
			<Add></Add>
		</>
	);
};

export default Document;
