import { useCallback, useState } from "react";
import { Web } from "@mui/icons-material";

export function useValidationPageHook() {
  const [valueAction, setValueAction] = useState("");
  let listSideBar = [
    {
      name: "Giáo trình xử lý ảnh",
      active: false,
      img: "https://i.imgur.com/A4ZWfZA.jpg",
      icon: <Web />,
      key: 1,
    },
    {
      name: "Giáo trình phát triển ứng dụng Web",
      active: false,
      img: "https://i.imgur.com/oa14QRZ.jpg",
      icon: <Web />,
      key: 2,
    },
    {
      name: "Giáo trình xử lý ảnh",
      active: false,
      img: "https://i.imgur.com/VSBKuY2.jpg",
      icon: <Web />,
      key: 3,
    },
    {
      name: "Giáo trình DSA",
      active: false,
      img: "https://i.imgur.com/wfRpwwx.jpg",
      icon: <Web />,
      key: 4,
    },
    {
      name: "Giáo trình Toán rời rạc",
      active: false,
      img: "https://i.imgur.com/EJrHlN3.jpg",
      icon: <Web />,
      key: 5,
    },
    {
      name: "Giáo trình Giải tích 1",
      active: false,
      img: "https://i.imgur.com/Qy80WlM.jpg",
      icon: <Web />,
      key: 6,
    },
  ];

  const handleOnClickSidebar = useCallback(
    (itemSideBar) => {
      setValueAction(itemSideBar.img);
      console.log(valueAction);
    },
    [valueAction]
  );

  return {
    listSideBar,
    handleOnClickSidebar,
    valueAction,
  };
}
