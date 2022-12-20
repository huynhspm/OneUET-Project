import {
  Box,
  Stack,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
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
import ValidationGrade from "../ValidationGrade";
import { toDateString } from "../../utils/function";

const ValidationPage = (props) => {
  const [card, setCard] = useState([]);
  const [linkPDF, setLinkPDF] = useState([]);

  const navigate = useNavigate();

  // user token
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZUlkIjoxLCJpYXQiOjE2NzA0ODk2ODEsImV4cCI6MTY3MzA4MTY4MX0.rSseHQSrXVyf_PyY3WAIoU07AKavd3-XP-RIXgXRgr4"
  );

  // fetch user token
  const getToken = () => {
    if (token === "") {
      const lastToken = sessionStorage.getItem("token");
      if (lastToken !== null && lastToken !== undefined) {
        console.log(lastToken);
        setToken(lastToken);
      } else {
        navigate("/login");
      }
    }
  };

  const [openValidGrade, setOpenValidGrade] = useState(true);
  const [openValidDoc, setOpenValidDoc] = useState(false);
  const [openGrade, setOpenGrade] = useState(false);

  useEffect(() => {
    // getToken();
  }, [navigate, token]);

  useEffect(() => {
    fetchData();
  }, [token, openValidDoc]);

  useEffect(() => {
    getValidGrade();
  }, [token, openValidGrade]);

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

  const getValidGrade = async () => {
    try {
      await axios
        .get("http://localhost:2002/api/grade/pdf", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          let link = res.data.data.linkPDFs;
          let tmp = [];
          for (let i in link) {
            tmp.push(link[i]);
          }
          setLinkPDF(tmp);
          console.log(linkPDF);
        });
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <ListItem
          disablePadding
          onClick={() => {
            setOpenValidDoc(false);
            setOpenValidGrade(true);
          }}>
          <ListItemButton component="a" href="#grades">
            <ListItemIcon>
              <Grade />
            </ListItemIcon>
            <ListItemText primary="Grade" />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => {
            setOpenValidDoc(true);
            setOpenValidGrade(false);
          }}>
          <ListItemButton component="a" href="#documents">
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
          display: "flex",
          minHeight: window.innerHeight,
          alignItems: "flex-start",
        }}>
        {openValidDoc && <ValidationDocuments card={card} />}
        {openValidGrade && (
          <Box>
            {linkPDF.map((link, index) => (
              <Button
                sx={{ width: "100%", height: "7vh", mt: 2 }}
                variant="contained"
                onClick={async () => {
                  console.log("DDDDD");
                  //   setOpenGrade(true);
                }}>
                {link.linkPDF}
              </Button>
            ))}
          </Box>
        )}

        {/* {openGrade && <ValidationGrade />} */}
      </Box>
    </Box>
  );
};

export default ValidationPage;
