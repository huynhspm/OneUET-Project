import React from "react";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import LogoutIcon from '@mui/icons-material/Logout';

const UpperTexts = ['Cập nhật thông tin', 'Thời khóa biểu', 'Kết quả học tập', 'Tài liệu cá nhân'];
const UpperIcons = [<AccountBoxIcon />, <CalendarMonthIcon />, <EmojiEventsIcon />, <FolderSharedIcon />];
const UpperHrefs = ["/profile/information", "/profile/schedule", "/profile/learning-result", "/profile/private-document"];

const LowerTexts = ['Đổi mật khẩu', 'Đăng xuất'];
const LowerIcons = [<SyncLockIcon />, <LogoutIcon />];
const LowerHrefs = ["/profile/change-password", "/login"];

const LeftDrawer = () => {
  return (
    <div>
      <Divider />
      <List>
        {UpperTexts.map((text, index) => (
          <ListItem button component={Link} to={UpperHrefs[index]} key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {UpperIcons[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider variant="middle" />
      <List>
        {LowerTexts.map((text, index) => (
          <ListItem button component={Link} to={LowerHrefs[index]} key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {LowerIcons[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LeftDrawer;