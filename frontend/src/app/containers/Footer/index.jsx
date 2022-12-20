import React from "react";
import "./footer.css"
import { SocialIcon } from 'react-social-icons';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = (props) => {
  return (
    <div className="footerContainer" style={{backgroundColor: props.location !== "/" ? "white" : "#FFA69E"}}>
      <div style={{height: 100}}></div>
      <div className="footerHeader">OneUET: Ứng dụng hỗ trợ sinh viên trường Đại học Công nghệ</div>
      <div className="footerContactContainer">
        <div className="footerContactHeader">Thông tin liên hệ</div>
        <a href="https://www.facebook.com/ngochuynh.trinh.16" className="footerContactElement"><FacebookIcon style={{ height: 30, width: 30 }} /><div className="footerIconText">Facebook</div></a>
        <a href="https://www.instagram.com/baluong.87/" className="footerContactElement"><InstagramIcon style={{ height: 30, width: 30 }} /><div className="footerIconText">Instagram</div></a>
        <a href="https://github.com/huynhspm" className="footerContactElement"><GitHubIcon network="github" style={{ height: 26, width: 26 }} /><div className="footerIconText">Github</div></a>
      </div>
    </div>
  );
};
export default Footer;