import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { api_url } from "../../utils/config";
import { useLocation, useNavigate } from "react-router-dom";

const columns = [
  {
    field: "id",
    headerName: "STT",
    width: 70,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "studentCode",
    headerName: "Mã sinh viên",
    // width: 150,
    flex: 0.5,
    headerAlign: "center",
    align: "center",
    editable: true,
  },
  {
    field: "midterm",
    headerName: "Điểm thành phần",
    headerAlign: "center",
    align: "center",
    type: "number",
    // width: 160,
    flex: 0.5,
    editable: true,
  },
  {
    field: "final",
    headerName: "Điểm cuối kỳ",
    headerAlign: "center",
    align: "center",
    type: "number",
    // width: 160,
    flex: 0.5,
    editable: true,
  },
  {
    field: "total",
    headerName: "Tổng điểm",
    headerAlign: "center",
    align: "center",
    type: "number",
    // width: 160,
    flex: 0.5,
    editable: true,
  },
];

const updateData = async (token, data) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.put(
      api_url + "/api/class/grade",
      data,
      config
    );
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
    if (e.response.data.message == "Class not existed") return e.response;
  }
};

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (user.studentCode?.trim() === "") {
            reject(new Error("Lỗi khi lưu: Mã sinh viên không thể để trống."));
          } else {
            resolve({ ...user, studentCode: user.studentCode });
          }
        }, 200)
      ),
    []
  );
};

export default function ValidationGrade(props) {
  const [codeClass, setCodeClass] = React.useState(null);
  const [semester, setSemester] = React.useState(null);
  const [code, setCode] = React.useState(null);
  const [rows, setRows] = React.useState([]);

  const [pageSize, setPageSize] = React.useState(50);
  const [snackbar, setSnackbar] = React.useState(null);

  const mutateRow = useFakeMutation();
  const handleCloseSnackbar = () => setSnackbar(null);

  const navigate = useNavigate();

  // // user token
  // const [token, setToken] = useState("");

  // // fetch user token
  // useEffect(() => {
  //   console.log(token);
  //   if (token === "") {
  //     const lastToken = sessionStorage.getItem("token");
  //     if (lastToken !== null && lastToken !== undefined) {
  //       console.log(lastToken);
  //       setToken(lastToken);
  //     } else {
  //       navigate("/login");
  //     }
  //   }
  // }, [token, navigate]);

  const getUserData = async (token) => {
    console.log();
    try {
      const response = await axios.get(api_url + "/api/grade", {
        params: { linkPDF },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  };

  const location = useLocation();
  const linkPDF = location.state.linkPDF;

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZUlkIjoxLCJpYXQiOjE2NzA0ODk2ODEsImV4cCI6MTY3MzA4MTY4MX0.rSseHQSrXVyf_PyY3WAIoU07AKavd3-XP-RIXgXRgr4";

  useEffect(() => {
    if (token !== "") {
      getUserData(token).then((data) => {
        let rows2 = [];
        data = data.grade;

        for (var i = 0; i < data.length; i++) {
          rows2.push({
            studentCode: data[i].studentCode,
            id: i + 1,
            midterm: data[i].midterm,
            final: data[i].final,
            total: data[i].total,
          });
        }

        setRows(rows2);
      });
    }
  }, [token]);

  const processRowUpdate = async (newRow) => {
    const response = await mutateRow(newRow);
    let tmp = [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].id == response.id) {
        rows[i].studentCode = response.studentCode;
        rows[i].midterm = response.midterm;
        rows[i].final = response.final;
        rows[i].total = response.total;
      }
      tmp.push(rows[i]);
    }
    setRows(tmp);
    setSnackbar({ children: "Dữ liệu đã được sửa", severity: "success" });
    return response;
  };

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  return (
    // Editable table grade
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "30vw",
        }}>
        <Box>
          <Box>
            <TextField
              sx={{ m: 2, ml: 3, width: 200 }}
              id="codeclass"
              label="Mã môn học"
              onChange={(event) => {
                setCode(event.target.value);
              }}
            />
          </Box>

          <Box>
            <TextField
              sx={{ m: 1, ml: 3, width: 200 }}
              id="semester"
              label="Học kỳ"
              helperText="Ví dụ: 2021-2022-1"
              onChange={(event) => {
                setSemester(event.target.value);
              }}
            />
          </Box>
        </Box>
        <Box>
          <Button
            sx={{ mt: 8 }}
            variant="contained"
            onClick={async () => {
              console.log(rows);
              let change = {
                semester,
                code,
                grades: rows,
              };
              const response = await updateData(token, change);
              if (response.data.message == "Class not existed")
                setSnackbar({
                  children: "Tên lớp hoặc kỳ không đúng",
                  severity: "error",
                });
              else navigate("/validation-document", {});
            }}>
            Xác nhận
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box component="nav" sx={{ width: "40vw", flexShrink: { sm: 0 } }}>
          <DataGrid
            sx={{
              height: 900,
              width: "100%",
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
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
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

        <Box sx={{ flexGrow: 1, p: 3, width: "40vw" }}>
          <div className="pdf-viewer" align="right">
            <iframe src={linkPDF} width="100%" height="910px"></iframe>
          </div>
        </Box>
      </Box>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
}
