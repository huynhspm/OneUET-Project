import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

const AvatarDropdown = () => {
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
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar src="https://randomuser.me/api/portraits/women/79.jpg" />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem className='menu-item' component={Link} to="/profile/information"><AccountBoxIcon /> Cập nhật thông tin</MenuItem>
                <MenuItem className='menu-item' component={Link} to="/profile/schedule" ><CalendarMonthIcon />Thời khóa biểu</MenuItem>
                <MenuItem className='menu-item' component={Link} to="/profile/learning-result" ><EmojiEventsIcon />Kết quả học tập</MenuItem>
                <MenuItem className='menu-item' component={Link} to="/profile/private-document" ><FolderSharedIcon />Tài liệu cá nhân</MenuItem>
                <MenuItem className='menu-item' component={Link} to="/profile/change-password" ><SyncLockIcon />Đổi mật khẩu</MenuItem>
                <MenuItem className='menu-item' component={Link} to="/login" ><LogoutIcon />Đăng xuất</MenuItem>
            </Menu>
        </div>
    )
}
export default AvatarDropdown;