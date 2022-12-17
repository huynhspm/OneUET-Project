import HorizontalDocumentList from "../../components/HorizontalDocumentList";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    if (token === '') {
      const lastToken = sessionStorage.getItem("token");
      if (lastToken !== null && lastToken !== undefined) {
        console.log(lastToken);
        setToken(lastToken);
      } else {
        navigate('/login');
      }
    }
  }, [token, navigate]);
  
  const cards_json = [
    {
      name: "Du",
      description: "đẹp trai",
      src_img: "https://randomuser.me/api/portraits/women/79.jpg",
      link: "/convert",
    },
    {
      name: "Linh",
      description: "xấu",
      src_img: "https://randomuser.me/api/portraits/women/78.jpg",
      link: "/document",
    },
    {
      name: "Huỳnh",
      description: "xấu",
      src_img: "https://randomuser.me/api/portraits/women/77.jpg",
      link: "/document",
    },
    {
      name: "Bá",
      description: "xấu",
      src_img: "https://randomuser.me/api/portraits/women/76.jpg",
      link: "/document",
    },
    {
      name: "Lộc",
      description: "xấu",
      src_img: "https://randomuser.me/api/portraits/women/75.jpg",
      link: "/document",
    },
    {
      name: "Hà",
      description: "xấu",
      src_img: "https://randomuser.me/api/portraits/women/74.jpg",
      link: "/document",
    },
  ];
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
      <h1>Có thể bạn thích??????</h1>
      <Pagination
        count={cards_json.length - 3}
        color="primary"
        onChange={onPageChangeRec}
      />
      <HorizontalDocumentList
        data={cards_json.slice(currentPageRec - 1, currentPageRec + 3)}
        height="200px"
      />
      <h1>Bạn đã xem những tài liệu này????</h1>
      <Pagination
        count={cards_json.length - 3}
        color="primary"
        onChange={onPageChangeSeen}
      />
      <HorizontalDocumentList
        data={cards_json.slice(currentPageSeen - 1, currentPageSeen + 3)}
        height="140px"
      />
    </>
  );
};
export default HomePage;
