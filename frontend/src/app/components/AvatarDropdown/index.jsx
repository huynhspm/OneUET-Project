import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api_url } from "../../utils/config";

const getUserData = async token => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await axios.get(api_url + "/api/user/me", config);
    return response.data.data;
  } catch (e) {
    console.log(e.response);
  }
}

const AvatarDropdown = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  useEffect(() => {
    if (token === '') {
      const lastToken = sessionStorage.getItem("token");
      if (lastToken !== null && lastToken !== undefined) {
        // console.log(lastToken);
        setToken(lastToken);
      } else {
        navigate('/login');
      }
    }
  }, [token, navigate]);

  const ControlAvatar = (value) => {
    if (value === undefined || value === null) {
      return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
    }
    return value;
  }

  useEffect(() => {
    if (token !== "" && token !== null && token !== undefined) {
      getUserData(token).then((data) => {
        setAvatar(data.profile.user.avatar);
      });
    }
  }, [token]);

  const [avatar, setAvatar] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar src={ControlAvatar(avatar)} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          className="menu-item"
          component={Link}
          to="/profile/information"
        >
          <AccountBoxIcon /> Cập nhật thông tin
        </MenuItem>
        <MenuItem className="menu-item" component={Link} to="/profile/schedule">
          <CalendarMonthIcon />
          Thời khóa biểu
        </MenuItem>
        <MenuItem
          className="menu-item"
          component={Link}
          to="/profile/learning-result"
        >
          <EmojiEventsIcon />
          Kết quả học tập
        </MenuItem>
        <MenuItem
          className="menu-item"
          component={Link}
          to="/profile/private-document"
        >
          <FolderSharedIcon />
          Tài liệu cá nhân
        </MenuItem>
        <MenuItem
          className="menu-item"
          component={Link}
          to="/profile/change-password"
        >
          <SyncLockIcon />
          Đổi mật khẩu
        </MenuItem>
        <MenuItem className="menu-item" component={Link} to="/logout">
          <LogoutIcon />
          Đăng xuất
        </MenuItem>
      </Menu>
    </div>
  );
};
export default AvatarDropdown;
