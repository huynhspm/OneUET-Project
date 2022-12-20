import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../utils/config";

const getUserData = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(api_url, config);
    return response.data.data;
  } catch (e) {
    console.log(e.response);
  }
};

const columns = [
  {
    field: "id",
    headerName: "STT",
    width: 70,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "codeClass",
    headerName: "Mã môn học",
    // width: 150,
    flex: 0.8,
    headerAlign: "center",
    align: "center",
    // editable: true,
  },
  {
    field: "name",
    headerName: "Môn học",
    headerAlign: "center",
    // width: 200,
    flex: 0.6,
  },
  {
    field: "grade_10",
    headerName: "Điểm hệ 10",
    type: "number",
    headerAlign: "center",
    align: "center",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    // width: 110,
    flex: 0.5,
  },
  {
    field: "grade_text",
    headerName: "Điểm chữ",
    headerAlign: "center",
    align: "left",
    // width: 200,
    flex: 0.5,
  },
  {
    field: "grade_4",
    headerName: "Điểm hệ 4",
    headerAlign: "center",
    align: "center",
    type: "number",
    // width: 160,
    flex: 0.5,
  },
  {
    field: "midterm_grade",
    headerName: "Điểm thành phần",
    headerAlign: "center",
    align: "center",
    type: "number",
    // width: 160,
    flex: 0.5,
  },
  {
    field: "final_grade",
    headerName: "Điểm cuối kỳ",
    headerAlign: "center",
    align: "center",
    type: "number",
    // width: 160,
    flex: 0.5,
  },
];

const rows = [];

let getData = async () => {
  const url = "http://localhost:3000/data.json";
  const response = await fetch(url);
  const data = await response.json();
  for (var i = 0; i < data["students"].length; i++) {
    const obj = {};
    obj.code = data["students"][i]["0"];
    obj.name = 0;
    obj.date_of_birth = 0;
    obj.classes = 0;
    obj.id = i;
    obj.midterm_grade = data["students"][i]["1"];
    obj.final_grade = data["students"][i]["2"];
    obj.total_grade = data["students"][i]["3"];
    rows[i] = obj;
  }
  console.log(rows);
  return data;
};

export default function DataGridDemo() {
  const [pageSize, setPageSize] = React.useState(5);
  const [isFetch, setIsFetch] = React.useState(false);
  const navigate = useNavigate();

  // user token
  const [token, setToken] = useState("");

  // fetch user token
  useEffect(() => {
    if (token === "") {
      const lastToken = sessionStorage.getItem("token");
      if (lastToken !== null && lastToken !== undefined) {
        //console.log(lastToken);
        setToken(lastToken);
      } else {
        navigate("/login");
      }
    }
  }, [token, navigate]);

  const fetchData = () => {
    getUserData(token).then((data) => {
      console.log("Data");
      console.log(data);
    });
  };

  useEffect(() => {
    console.log("Fetch", isFetch);
    if (!isFetch) {
      fetchData();
      setIsFetch(true);
      console.log("Set", isFetch);
    }
  }, [token, isFetch]);


  return (
    <Box sx={{ height: 910, width: "100%" }}>
      <DataGrid
        sx={{
          ".MuiTablePagination-toolbar": {
            backgroundColor: "#dee2e6",
          },
          ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
            {
              marginBottom: 0,
              fontSize: 15,
            },
        }}
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          pagination: {
            labelRowsPerPage: "Số hàng hiển thị:",
          },
        }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        pagination
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
