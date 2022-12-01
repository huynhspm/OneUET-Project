import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"

import { Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AvatarDropdown from "../../components/AvatarDropdown";
import "./styles.css";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Switch,
} from "@mui/material";
import { ModeNight } from "@mui/icons-material";

const Header = ({ mode, setMode }) => {
  return (
    <>
      <div className="header">
        <div class="btn-group button-group">
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
          <InputBase className="input-search" placeholder="Search" />
          <IconButton type="button" aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
        <div>
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#home">
                <ListItemIcon>
                  <ModeNight />
                </ListItemIcon>
                <Switch
                  onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
        <div className="profile-group">
          <AvatarDropdown />
        </div>
      </div>
    </>
  );
};

export default Header;
