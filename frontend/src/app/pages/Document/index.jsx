import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import Add from '../../components/Add';
import Pagination from '@mui/material/Pagination';
import HorizontalDocumentList from "../../components/HorizontalDocumentList";
import { useState } from 'react';
import Header from '../../containers/Header';
import './styles.css'

const drawerWidth = 240;

const Document = (props) => {

	const cards_json = [
		{ title: "Du", description: "đẹp trai", src_img: "https://randomuser.me/api/portraits/women/79.jpg", link: "/convert" },
		{ title: "Linh", description: "xấu", src_img: "https://randomuser.me/api/portraits/women/78.jpg", link: "/document" },
		{ title: "Huỳnh", description: "xấu", src_img: "https://randomuser.me/api/portraits/women/77.jpg", link: "/document" },
		{ title: "Bá", description: "xấu", src_img: "https://randomuser.me/api/portraits/women/76.jpg", link: "/document" },
		{ title: "Lộc", description: "xấu", src_img: "https://randomuser.me/api/portraits/women/75.jpg", link: "/document" },
		{ title: "Hà", description: "xấu", src_img: "https://randomuser.me/api/portraits/women/74.jpg", link: "/document" },
	];

	const [currentPageRec, setCurrentPageRec] = useState(1)
	const [currentPageSeen, setCurrentPageSeen] = useState(1)

	const onPageChangeRec = (event, value) => {
		setCurrentPageRec(value);
	}
	const onPageChangeSeen = (event, value) => {
		setCurrentPageSeen(value);
	}

	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<List>
				<ListItem >
					<Box sx={{ height: 21, fontSize: 18, fontWeight: 'bold', fontFamily: 'Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif' }}>Filter</Box>
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem disablePadding>
					<Box sx={{ pl:2, height: 21, fontSize: 14, fontWeight: 'bold', fontFamily: 'Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif' }}>Category</Box>
				</ListItem>
			</List>
			<FormGroup sx={{ml:2}}>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<FormControlLabel 
						label={<Typography sx = {{fontSize:14}}>{text}</Typography>}
						control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} /> }  
						sx ={{pl:1}}/>
				))}
			</FormGroup>
			<Divider />
			<List>
				<ListItem disablePadding>
					<Box sx={{ pl:2, height: 21, fontSize: 14, fontWeight: 'bold', fontFamily: 'Canva Sans,Noto Sans Variable,Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif' }}>Category</Box>
				</ListItem>
			</List>
			<FormGroup sx={{ml:2}}>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<FormControlLabel 
						label={<Typography sx = {{fontSize:14}}>{text}</Typography>}
						control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} /> }  
						sx ={{pl:1}}/>
				))}
			</FormGroup>
		</div >
	);

	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'row', top:52 }}>
				{/* <CssBaseline /> */}
				<Box
					component="nav"
					sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
					aria-label="mailbox folders"
				>
					<Drawer
						variant="permanent"
						sx={{
							display: { xs: 'none', sm: 'block', display: 'flex', flexDirection: 'row'  },
							'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
						}}
						open
					>
						<Toolbar variant="dense" sx={{}} />
						{drawer}
					</Drawer>
				</Box>
				<Box
					component="main"
					sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
				>
					<div className='flex'>
						<Pagination className='pagination' count={cards_json.length - 3} color="primary" variant="outlined" shape="rounded" onChange={onPageChangeRec} />
					</div>
					<HorizontalDocumentList data={cards_json.slice(currentPageRec - 1, currentPageRec + 3)} height="200px" />
					<HorizontalDocumentList data={cards_json.slice(currentPageRec - 1, currentPageRec + 3)} height="200px" />
					<HorizontalDocumentList data={cards_json.slice(currentPageRec - 1, currentPageRec + 3)} height="200px" />
					<HorizontalDocumentList data={cards_json.slice(currentPageRec - 1, currentPageRec + 3)} height="200px" />
				</Box>
			</Box>
			<Add></Add>
		</>
	);
};

export default Document;
