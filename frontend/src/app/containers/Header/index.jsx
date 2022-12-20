import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import styled from "styled-components";
import { Link } from "react-router-dom";
//import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AvatarDropdown from "../../components/AvatarDropdown";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import {
  Box,
  List,
  Switch,
  ListItem,
  ListItemButton,
  ListItemIcon,
  colors,
} from "@mui/material";
import { ModeNight } from "@mui/icons-material";
import { Typography } from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const [isFetch, setIsFetch] = useState(false);

  const navigate = useNavigate();    

	// user token
	const [token, setToken] = useState('');

	// fetch user token
	useEffect(() => {
		if (token === '') {
			const lastToken = sessionStorage.getItem("token");
			if (lastToken !== null && lastToken !== undefined) {
				setToken(lastToken);
        setIsFetch(true);
			} else {
				navigate('/login');
			}
		}
	}, [token, navigate]);


  const [docs, setDocs] = useState([]);

  useEffect(() => {
    if (isFetch) {
      fetchData();
    }
  }, [token]);

  function getDocuments(data) {
    let docs = data.data;
    return docs?.documents;
  }

  const fetchData = async () => {
    try {
      await axios
        .get("http://localhost:2002/api/document/public", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          let docs = getDocuments(res.data);
          // console.log(res);
          let tmp = [];
          for (let id in docs) {
            let element = {
              name: docs[id].name,
              docID: docs[id].id,
            };
            tmp.push(element);
          }
          setDocs(tmp);
        });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <>
      <div className="header" color="white">
        <div className="btn-group button-group">
          {props.location !== "/" ?
            <Link className="homepage-button btn" to="/" >
              <HomeIcon /> Trang chủ
            </Link> :
            <Link className="homepage-button btn btn-primary" to="/" >
              <HomeIcon /> Trang chủ
            </Link>
          }
          {props.location !== "/convert" ?
            <Link className="convert-button btn" to="/convert">
              <AutoAwesomeIcon /> Convert
            </Link> :
            <Link className="convert-button btn btn-primary" to="/convert">
              <AutoAwesomeIcon /> Convert
            </Link>
          }
          {props.location !== "/document" ?
            <Link className="document-button btn" to="/document">
              <SummarizeIcon /> Document
            </Link> :
            <Link className="document-button btn btn-primary" to="/document">
              <SummarizeIcon /> Document
            </Link>
          }
          {props.location !== "/grade" ?
            <Link className="grade-button btn" to="/grade">
              <SchoolIcon /> Grade
            </Link> :
            <Link className="grade-button btn btn-primary" to="/grade">
              <SchoolIcon /> Grade
            </Link>
          }
          {props.location !== "/validation-document" ?
            <Link className="validation-button btn" to="/validation-document">
              <FactCheckIcon /> Validation Document
            </Link> :
            <Link className="validation-button btn btn-primary" to="/validation-document">
              <FactCheckIcon /> Validation Document
            </Link>
          }
        </div>
        <Box
          sx={{
            width: "30%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Autocomplete
            sx={{
              p: 0,
              width: "100%",
              display: "flex",
              alignItems: "center",
              ".MuiOutlinedInput-root .MuiAutocomplete-input": {
                p: "7.5px 10px 7.5px 20px",
              },
              ".MuiOutlinedInput-root": {
                p: 0,
                pr: 1,
                borderRadius: 50,
              },
            }}
            freeSolo
            getOptionLabel={(option) => option.name}
            options={docs.map((option) => option)}
            onChange={(event, option) => {
              window.location.href = "/document/" + option.docID;
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Link className="validation-button btn" to="/document">
            <SearchIcon />
          </Link>
        </Box>

        <div className="profile-group">
          <AvatarDropdown />
        </div>
      </div>
    </>
  );
};

export default Header;
