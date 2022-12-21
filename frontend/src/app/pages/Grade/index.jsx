import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbar,
} from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_url } from "../../utils/config";

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
    description: "Giá trị không thể sắp xếp.",
    sortable: false,
    // editable: true,
  },
  {
    field: "name",
    headerName: "Môn học",
    headerAlign: "center",
    description: "Giá trị không thể sắp xếp.",
    sortable: false,
    // width: 200,
    flex: 0.6,
  },
  {
    field: "grade_10",
    headerName: "Điểm hệ 10",
    type: "number",
    headerAlign: "center",
    align: "center",
    // width: 110,
    flex: 0.5,
  },
  {
    field: "grade_text",
    headerName: "Điểm chữ",
    headerAlign: "center",
    align: "center",
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

export default function Grade() {
  const [pageSize, setPageSize] = React.useState(5);
  const [isFetch, setIsFetch] = React.useState(false);
  const [isSetToken, setIsSetToken] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const navigate = useNavigate();

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton sx={{ color: "black" }} />
        <GridToolbarFilterButton sx={{ color: "black" }} />
        <GridToolbarExport sx={{ color: "black" }} />
      </GridToolbarContainer>
    );
  }

  const getUserData = async (token) => {
    console.log(token);
    token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoyLCJpYXQiOjE2NzA0ODk2NDgsImV4cCI6MTY3MzA4MTY0OH0.kKVgxO566QaVpvGbqtKBmr_I_Sl8RSlEk8Nhr-GWM74";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(api_url + "/api/user/me", config);
      console.log(response.data.data.classes.studiedClasses);
      return response.data.data.classes.studiedClasses;
    } catch (e) {
      console.log(e.response);
    }
  };

  // user token
  const [token, setToken] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // fetch user token
  const getToken = () => {
    if (token === "") {
      const lastToken = sessionStorage.getItem("token");
      if (lastToken !== null && lastToken !== undefined) {
        setToken(lastToken);
      } else {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getToken();
  }, [navigate, token]);

  useEffect(() => {
    if (token !== "") {
      getUserData(token).then((data) => {
        let rows2 = [];
        console.log(data);

        for (var i = 0; i < data.length; i++) {
          let grade = data[i].studentClass.total;
          let grade_text = "";
          let grade_4 = 0.0;
          if (grade < 4) {
            grade_text = "F";
            grade_4 = 0;
          }
          if (grade >= 4 && grade < 5.0) {
            grade_text = "D";
            grade_4 = 1.0;
          }
          if (grade >= 5.0 && grade < 5.5) {
            grade_text = "D+";
            grade_4 = 1.5;
          }
          if (grade >= 5.5 && grade < 6.5) {
            grade_text = "C";
            grade_4 = 2.0;
          }
          if (grade >= 6.5 && grade < 7.0) {
            grade_text = "C+";
            grade_4 = 2.5;
          }
          if (grade >= 7.0 && grade < 8.0) {
            grade_text = "B";
            grade_4 = 3.0;
          }
          if (grade >= 8.0 && grade < 8.5) {
            grade_text = "B+";
            grade_4 = 3.5;
          }
          if (grade >= 8.5 && grade < 9.0) {
            grade_text = "A";
            grade_4 = 3.7;
          }
          if (grade >= 9.0) {
            grade_text = "A+";
            grade_4 = 4.0;
          }
          rows2.push({
            id: i + 1,
            codeClass: data[i].code,
            name: data[i].course.name,
            grade_text: grade_text,
            grade_4: grade_4,
            grade_10: grade,
            midterm_grade: data[i].studentClass.midterm,
            final_grade: data[i].studentClass.final,
            total_grade: data[i].studentClass.total,
          });
        }

        setRows(rows2);
      });
    }
  }, [token]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          m: 3,
        }}>
        <h1>Bảng điểm học tập</h1>
      </Box>
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
            Toolbar: CustomToolbar,
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
    </>
  );
}
