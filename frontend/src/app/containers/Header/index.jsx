import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"

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
import { Box, Typography } from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";

const Header = (props) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2ODU2LCJleHAiOjE2NzMwMjg4NTZ9.2G84rwn7b1FcD60TAbxcljmTylOZJ4VXz2Y932g55bo";

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  function getDocuments(data) {
    let docs = data.data;
    return docs?.documents;
  }

  const fetchData = async () => {
    try {
      await axios
        .get("http://localhost:2002/api/document/public", {
          // params: filterParams,
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          let docs = getDocuments(res.data);
          console.log(res);
          let tmp = [];
          for (let id in docs) {
            let element = {
              name: docs[id].name,
              docID: docs[id].id,
            };
            tmp.push(element);
          }
          console.log("--fetchData() - Header--");
          console.log(tmp);
          console.log("-------------------------");

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
          <Link className="homepage-button btn" to="/">
            <HomeIcon />
            <Typography>Trang chủ</Typography>
          </Link>
          <Link className="convert-button btn" to="/convert">
            <AutoAwesomeIcon />
            <Typography>Convert</Typography>
          </Link>
          <Link className="document-button btn" to="/document">
            <SummarizeIcon />
            <Typography>Document</Typography>
          </Link>
          <Link className="grade-button btn" to="/grade">
            <SchoolIcon />
            <Typography>Grade</Typography>
          </Link>
          <Link className="validation-button btn" to="/validation-document">
            <FactCheckIcon />
            <Typography>Validation Document</Typography>
          </Link>
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
            popupIndicator
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
