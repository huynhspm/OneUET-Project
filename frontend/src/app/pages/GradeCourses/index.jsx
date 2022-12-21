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
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api_url } from "../../utils/config";
import axios from "axios";

const columns = [
  {
    field: "id",
    headerName: "STT",
    width: 70,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "code",
    headerName: "Mã sinh viên",
    // width: 150,
    flex: 0.5,
    headerAlign: "center",
    align: "center",
    // editable: true,
  },
  {
    field: "name",
    headerName: "Họ và tên",
    headerAlign: "center",
    // width: 200,
    flex: 0.8,
  },
  {
    field: "classes",
    headerName: "Lớp học",
    headerAlign: "center",
    align: "left",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    // width: 200,
    flex: 0.8,
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
  {
    field: "total_grade",
    headerName: "Tổng điểm",
    headerAlign: "center",
    align: "center",
    type: "number",
    // width: 160,
    flex: 0.5,
  },
];

const rows = [
  {
    id: 1,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
  {
    id: 2,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
  {
    id: 3,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
  {
    id: 4,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
  {
    id: 5,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
  {
    id: 6,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
  {
    id: 7,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
  {
    id: 8,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
  {
    id: 9,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
  {
    id: 10,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
  {
    id: 11,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
  {
    id: 12,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
  {
    id: 13,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
  {
    id: 14,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
  {
    id: 15,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
  {
    id: 16,
    code: "20020057",
    name: "Đặng Xuân Lộc",
    date_of_birth: "06/04/2002",
    classes: "QH-2020-I/CQ-C-CLC",
    midterm_grade: 8.5,
    final_grade: 9.5,
    total_grade: 9.1,
  },
];

export default function DataGridDemo() {
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const id = useLocation().state.id;
  console.log(id);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton sx={{ color: "black" }} />
        <GridToolbarFilterButton sx={{ color: "black" }} />
        <GridToolbarExport sx={{ color: "black" }} />
      </GridToolbarContainer>
    );
  }

  // user token
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZUlkIjoxLCJpYXQiOjE2NzA0ODk2ODEsImV4cCI6MTY3MzA4MTY4MX0.rSseHQSrXVyf_PyY3WAIoU07AKavd3-XP-RIXgXRgr4"
  );

  // fetch user token
  const getToken = () => {
    if (token === "") {
      const lastToken = sessionStorage.getItem("token");
      if (lastToken !== null && lastToken !== undefined) {
        // console.log(lastToken);
        setToken(lastToken);
      } else {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    // getToken();
  }, [navigate, token]);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      await axios
        .get(api_url + "/api/class/" + id, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data.data.students);
          let data = res.data.data.students;
          let rows2 = [];

          for (var i = 0; i < data.length; i++) {
            rows2.push({
              code: data[i].code,
              id: i + 1,
              name: data[i].name,
              classes: data[i].class,
              midterm_grade: data[i].studentClass.midterm,
              final_grade: data[i].studentClass.final,
              total_grade: data[i].studentClass.total,
            });
          }

          setRows(rows2);
        });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <>
      <Box sx={{ height: window.innerHeight - 100, width: "100%" }}>
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
      <div style={{ height: "100px", width: "100%" }}></div>
    </>
  );
}
