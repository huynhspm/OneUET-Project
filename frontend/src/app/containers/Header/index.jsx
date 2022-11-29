import "/node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"

import { Link } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SchoolIcon from '@mui/icons-material/School';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import LogoutIcon from '@mui/icons-material/Logout';

import './index.css'
const Header = () => {
	return (
		<>
			<div className="header bg-light">
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
					<Link className="validation-button btn" to="/validation">
						<FactCheckIcon /> Validation Document
					</Link>
				</div>
				<div className="search-group">
					<InputBase className="input-search" placeholder="Search" />
					<IconButton type="button" aria-label="search">
						<SearchIcon />
					</IconButton>
				</div>
				<div className="profile-group dropdown">
					<button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						<Avatar src="https://randomuser.me/api/portraits/women/79.jpg"/>
					</button>
					<ul class="dropdown-menu">
						<li><Link class="dropdown-item" to="/profile/infomation"><AccountBoxIcon/> Cập nhật thông tin</Link></li>
						<li><Link class="dropdown-item" to="/profile/schedule"><CalendarMonthIcon/>Thời khóa biểu</Link></li>
						<li><Link class="dropdown-item" to="/profile/learning-result"><EmojiEventsIcon/>Kết quả học tập</Link></li>
						<li><Link class="dropdown-item" to="/profile/private-document"><FolderSharedIcon/>Tài liệu cá nhân</Link></li>
						<li><Link class="dropdown-item" to="/profile/change-password"><SyncLockIcon/>Đổi mật khẩu</Link></li>
						<li><Link class="dropdown-item" to="/login"><LogoutIcon/>Đăng xuất</Link></li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Header;
