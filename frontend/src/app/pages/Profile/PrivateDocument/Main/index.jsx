import React from "react";
import { Box, Drawer, Toolbar } from "@mui/material";
import DocumentCard from "../../../../components/DocumentCard";
import { useState, useEffect } from "react";
import { drawerWidth, documentCardHeight, api_url } from "../../../../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getDocumentThumbnail, toDateString } from "../../../../utils/function";
import Add from "../../../../components/Add";


const PrivateDocument = (props) => {
    const [card, setCard] = React.useState([]);
	const [course, setCourse] = useState([]);
	const [teacher, setTeacher] = useState({});

    const navigate = useNavigate();    

	// user token
	const [token, setToken] = useState('');

	// fetch user token
	useEffect(() => {
		if (token === '') {
			const lastToken = sessionStorage.getItem("token");
			if (lastToken !== null && lastToken !== undefined) {
				setToken(lastToken);
			} else {
				navigate('/login');
			}
		}
	}, [token, navigate]);

    useEffect(() => {
        if (token !== "") {
            fetchData();
			fetchAllTeachers();
        	fetchAllCourses();
        }
    }, [token]);

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const fetchData = async () => {
        try {
            await axios
                .get(api_url + "/api/user/me", config)
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

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", minHeight: window.innerHeight}}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}>
          {card.length > 0 && (
            <div>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {card.map((card, index) => (
                  <DocumentCard
                    src_img={card.src_img}
                    name={card.name}
                    description={card.description}
                    unit={card.unit}
                    major={card.major}
                    key={index}
                    path="/profile/private-document/"
                    linkView={card.linkView}
                    docID={card.docID}
                    dateUploaded={card.dateUploaded}
                  />
                ))}
              </Box>
            </div>
          )}
        </Box>
      </Box>
			<Add course={course} teacher={teacher} />
    </>
  );
};

export default PrivateDocument;
