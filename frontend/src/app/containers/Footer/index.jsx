import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyle";
  
const Footer = () => {
  return (
    <Box>
      <h2 style={{ color: "White", 
                   textAlign: "center", 
                   marginTop: "-50px",
				   marginBottom: "50px" }}>
        OneUET: Ứng dụng hỗ trợ sinh viên trường Đại học Công nghệ
      </h2>
      <Container>
        <Row>
          <Column>
            <Heading>Thông tin</Heading>
            <FooterLink href="#">Giới thiệu</FooterLink>
            <FooterLink href="#">Điều khoản sử dụng</FooterLink>
            <FooterLink href="#">Hòm thư góp ý</FooterLink>
			<FooterLink href="#">Chính sách bảo mật</FooterLink>
			<FooterLink href="#">Hòm thư góp ý</FooterLink>
			<FooterLink href="#">Donate</FooterLink>
			
          </Column>
          <Column>
            <Heading>Hỗ trợ</Heading>
            <FooterLink href="#">Hướng dẫn tìm kiếm tài liệu</FooterLink>
            <FooterLink href="#">Hướng dẫn xem trước tài liệu</FooterLink>
            <FooterLink href="#">Hướng dẫn gửi tài liệu</FooterLink>
          </Column>
          <Column>
            <Heading>Liên hệ</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Website
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Số điện thoại
                </span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;