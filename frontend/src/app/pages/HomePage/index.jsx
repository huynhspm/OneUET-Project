import HorizontalDocumentList from "../../components/HorizontalDocumentList";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomePageLink from "../../components/HomePageLink";
import './homepage.css';

let func = [
  { name: "Document", info: "Xem và tra cứu tài liệu cho sinh viên UET", to: "/document", linkImage:"https://lh3.googleusercontent.com/u/1/drive-viewer/AFDK6gPeZKxWsi7J_3lKQWQFnEsCBKvpnGon8cRaOglk0DBvwCZcMj2kJpqpUjhEXr20PmLZL--262kbh124Q2SUOS-fAEbi0Q=w1920-h902"},
  { name: "Grade", info: "Xem điểm sinh viên toàn trường", to: "/grade", linkImage:"https://lh3.googleusercontent.com/u/1/drive-viewer/AFDK6gPeZKxWsi7J_3lKQWQFnEsCBKvpnGon8cRaOglk0DBvwCZcMj2kJpqpUjhEXr20PmLZL--262kbh124Q2SUOS-fAEbi0Q=w1920-h902"},
  { name: "Profile", info: "Xem thông tin của bản thân và tạo CV ưng ý", to: "/profile/information", linkImage:"https://lh3.googleusercontent.com/u/1/drive-viewer/AFDK6gPeZKxWsi7J_3lKQWQFnEsCBKvpnGon8cRaOglk0DBvwCZcMj2kJpqpUjhEXr20PmLZL--262kbh124Q2SUOS-fAEbi0Q=w1920-h902" },
  { name: "Schedule", info: "Xem thời khóa biểu và tạo thời gian biểu cho bản thân", to: "/profile/schedule", linkImage:"https://lh3.googleusercontent.com/u/1/drive-viewer/AFDK6gPeZKxWsi7J_3lKQWQFnEsCBKvpnGon8cRaOglk0DBvwCZcMj2kJpqpUjhEXr20PmLZL--262kbh124Q2SUOS-fAEbi0Q=w1920-h902" },
  { name: "Private Grade", info: "Xem kết quả học tập của bản thân", to: "/profile/learning-result", linkImage:"https://lh3.googleusercontent.com/u/1/drive-viewer/AFDK6gPeZKxWsi7J_3lKQWQFnEsCBKvpnGon8cRaOglk0DBvwCZcMj2kJpqpUjhEXr20PmLZL--262kbh124Q2SUOS-fAEbi0Q=w1920-h902" },
  { name: "Private Document", info: "Xem những tài liệu của bản thân và đưa chúng đến cộng đồng", to: "/profile/private-document", linkImage:"https://lh3.googleusercontent.com/u/1/drive-viewer/AFDK6gPeZKxWsi7J_3lKQWQFnEsCBKvpnGon8cRaOglk0DBvwCZcMj2kJpqpUjhEXr20PmLZL--262kbh124Q2SUOS-fAEbi0Q=w1920-h902" },
]

// const cards_json = [
//   {
//     name: "Du",
//     description: "đẹp trai",
//     src_img: "https://randomuser.me/api/portraits/women/79.jpg",
//     link: "/convert",
//   },
//   {
//     name: "Linh",
//     description: "xấu",
//     src_img: "https://randomuser.me/api/portraits/women/78.jpg",
//     link: "/document",
//   },
//   {
//     name: "Huỳnh",
//     description: "xấu",
//     src_img: "https://randomuser.me/api/portraits/women/77.jpg",
//     link: "/document",
//   },
//   {
//     name: "Bá",
//     description: "xấu",
//     src_img: "https://randomuser.me/api/portraits/women/76.jpg",
//     link: "/document",
//   },
//   {
//     name: "Lộc",
//     description: "xấu",
//     src_img: "https://randomuser.me/api/portraits/women/75.jpg",
//     link: "/document",
//   },
//   {
//     name: "Hà",
//     description: "xấu",
//     src_img: "https://randomuser.me/api/portraits/women/74.jpg",
//     link: "/document",
//   },
// ];

const HomePage = (props) => {
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
  
  const [currentPageRec, setCurrentPageRec] = useState(1);
  const [currentPageSeen, setCurrentPageSeen] = useState(1);

  const onPageChangeRec = (event, value) => {
    setCurrentPageRec(value);
  };
  const onPageChangeSeen = (event, value) => {
    setCurrentPageSeen(value);
  };
  return (
    <>
      <div className="headerContainer">
        <div className="headerTextContainer">
          <div className="headerText">ONE-UET</div>
          <div className="descriptionText">Đưa tất cả những gì bạn cần <br />tại UET về một nơi duy nhất</div>
        </div>
        <img className="logo" src="https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-DH-Cong-Nghe-UET.png" alt="logo UET" width="250" height="250" />
      </div>
      <div className="cardContainer">
        {func.map((value, index) => {
          return <HomePageLink key={index} index={index} name={value.name} info={value.info} to={value.to} linkImage={value.linkImage}/>
        })}
      </div>
      {/* <div className="newDocument">
        <h1>Những tài liệu mới</h1>
        <Pagination
          count={cards_json.length - 3}
          color="primary"
          onChange={onPageChangeSeen}
        />
        <HorizontalDocumentList
          data={cards_json.slice(currentPageSeen - 1, currentPageSeen + 3)}
          height="140px"
        />
      </div> */}
    </>
  );
};
export default HomePage;
