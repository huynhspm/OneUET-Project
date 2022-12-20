import { Box, 
  Stack, 
  Typography, 
  ListItem, 
  ListItemButton,
  ListItemText,
  ListItemIcon
 } from "@mui/material";
import Main from "../../components/Main";
import Sidebar from "../../components/SidebarVali";
import { Grade, Assignment } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { api_url, drawerWidth } from "../../utils/config";
import DocumentCard from "../../components/DocumentCard";
import ValidationDocuments from "../../components/ValidationDocuments";
import { toDateString } from "../../utils/function";

const ValidationPage = (props) => {
	const [card, setCard] = useState([]);
	
	const navigate = useNavigate();

	// user token
	const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZUlkIjoxLCJpYXQiOjE2NzA0ODk2ODEsImV4cCI6MTY3MzA4MTY4MX0.rSseHQSrXVyf_PyY3WAIoU07AKavd3-XP-RIXgXRgr4');

	// fetch user token
	const getToken = (() => {
		if (token === '') {
			const lastToken = sessionStorage.getItem("token");
			if (lastToken !== null && lastToken !== undefined) {
				console.log(lastToken);
				setToken(lastToken);
			} else {
				navigate('/login');
			}
		}
	})

  useEffect(() => {
		// getToken();
	}, [navigate, token]);

  useEffect(() => {
		fetchData();
	}, [token]);

  const fetchData = async () => {
		try {
			await axios
				.get(api_url + "/api/document",
					{
						params: {
							status: "pending"
						},
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
							src_img: "https://randomuser.me/api/portraits/women/2.jpg",
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


  const [openValidGrade, setOpenValidGrade] = useState(true);
  const [openValidDoc, setOpenValidDoc] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
				<Box sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} >
          <ListItem disablePadding 
            onClick={() => {
              setOpenValidDoc(false);
              setOpenValidGrade(true);
            }}
          >
              <ListItemButton component="a" href="#grades">
                <ListItemIcon>
                  <Grade />
                </ListItemIcon>
                <ListItemText primary="Grade" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding 
              onClick={() => {
                setOpenValidDoc(true);
                setOpenValidGrade(false);
              }}
            >
              <ListItemButton component="a" href='#documents'>
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary="Documents" />
              </ListItemButton>
            </ListItem>
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
					{openValidDoc && <ValidationDocuments card={card} />}
				</Box>
			</Box>
  );
};

export default ValidationPage;
