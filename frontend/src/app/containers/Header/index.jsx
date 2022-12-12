import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"

import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
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
  List,
  Switch,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { ModeNight } from "@mui/icons-material";


import "./styles.css";

const documents = [
  { name: 'Giáo trình xử lý ảnh', link: "" },
  { name: 'Giáo trình data mining', link: "" },
  { name: 'Đề thi Vật lý đại cương kỳ 1 năm học 2021-2022', link: "" },
  { name: 'Đề thi Vật lý đại cương kỳ 2 năm học 2021-2022', link: "" },
  { name: 'Đề thi Vật lý đại cương kỳ 1 năm học 2020-2021', link: "" },
  { name: 'Đề thi Vật lý đại cương kỳ 2 năm học 2020-2021', link: "" },
  { name: 'Slide trí tuệ nhân tạo phần 1', link: "" },
  { name: 'Slide trí tuệ nhân tạo phần 2', link: "" },
  { name: 'Slide trí tuệ nhân tạo phần 3', link: "" },
  { name: 'Slide trí tuệ nhân tạo phần 4', link: "" },
  { name: 'Slide trí tuệ nhân tạo phần 5', link: "" },
  { name: 'Slide trí tuệ nhân tạo phần 6', link: "" },
  { name: 'Slide trí tuệ nhân tạo phần 7', link: "" },

];


const Header = (props) => {
  return (
    <>
      <div className="header">
        <div className="btn-group button-group">
          <Link className="homepage-button btn" to="/">
            <HomeIcon /> Trang chủ
          </Link>
          <Link className="convert-button btn" to="/convert">
            <AutoAwesomeIcon /> Convert
          </Link>
          <Link className="document-button btn" to="/document">
            <SummarizeIcon /> Document
          </Link>
          <Link className="grade-button btn" to="/grade">
            <SchoolIcon /> Grade
          </Link>
          <Link className="validation-button btn" to="/validation-document">
            <FactCheckIcon /> Validation Document
          </Link>
        </div>
        <div className="search-group">
          <Autocomplete
            className="search-input"
            freeSolo
            getOptionLabel={(option) => option.name}
            options={documents.map((option) => option)}
            onChange={(event, option) => {
              window.location.href = "/document";
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Link className="validation-button btn" to="/document">
            <SearchIcon />
          </Link>
        </div>
        {/* <div>
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#home">
                <ListItemIcon>
                  <ModeNight disablePadding />
                </ListItemIcon>
                <Switch
                  onChange={(e) =>
                    props.setMode(props.mode === "light" ? "dark" : "light")
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        </div> */}
        <div className="profile-group">
          <AvatarDropdown />
        </div>
      </div>
    </>
  );
};

export default Header;
  