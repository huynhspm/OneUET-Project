import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useEffect } from 'react';
// https://drive.google.com/file/d/1X2K2dE5pj5NeP0yOEvQ-8MCUhzd4Papz/view?usp=share_link

let t1 = "https://docs.google.com/viewer?srcid="; 
let t2 = "&pid=explorer&efh=false&a=v&chrome=false&embedded=true"; 

const pdf_link = t1.concat('1pRHDGYar6n85cSndPP0XYuBKNcBlqEqd', t2);

const getUserData = async token => {
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  }
  try {
      const response = await axios.get("http://localhost:2002/user/me", config);
      return response.data.data;
  } catch (e) {
      console.log(e.response);
  }
}

const columns = [
  { field: 'id', 
    headerName: 'STT', 
    width: 70,
    headerAlign: 'center',
    align: 'center',
    editable: true
  },
  {
    field: 'code',
    headerName: 'Mã sinh viên',
    // width: 150,
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    editable: true
  },
  {
    field: 'name',
    headerName: 'Họ và tên',
    headerAlign: 'center',
    // width: 200,
    flex: 0.8,
    editable: true
  },
  {
    field: 'date_of_birth',
    headerName: 'Ngày sinh',
    type: 'date',
    headerAlign: 'center',
    align: 'center',
    description: 'Không thể sắp xếp giá trị ở cột này.',
    sortable: false,
    // width: 110,
    flex: 0.7,
    editable: true
  },
  {
    field: 'classes',
    headerName: 'Lớp học',  
    headerAlign: 'center',
    align: 'left',
    description: 'Không thể sắp xếp giá trị ở cột này.',
    sortable: false,
    // width: 200,
    flex: 0.8,
    editable: true
  },
  {
    field: 'midterm_grade',
    headerName: 'Điểm thành phần',
    headerAlign: 'center',
    align: 'center',
    type: 'number',
    // width: 160,
    flex: 0.5,
    editable: true
  },
  {
    field: 'final_grade',
    headerName: 'Điểm cuối kỳ',
    headerAlign: 'center',
    align: 'center',
    type: 'number',
    // width: 160,
    flex: 0.5,
    editable: true
  },
  {
    field: 'total_grade',
    headerName: 'Tổng điểm',
    headerAlign: 'center',
    align: 'center',
    type: 'number',
    // width: 160,
    flex: 0.5,
    editable: true
  },
];

let codeClass = "";
let semester = "";
const rows = []

let getData = async () => {
	const url = "http://localhost:3000/data.json";
	const response = await fetch(url);
	const data = await response.json();
  for(var i = 0; i < data['students'].length; i++) {
    const obj = {}
    obj.code = data['students'][i]['0'];
    obj.name = 0;
    obj.date_of_birth = 0;
    obj.classes = 0;
    obj.id = i;
    obj.midterm_grade = data['students'][i]['1'];
    obj.final_grade = data['students'][i]['2'];
    obj.total_grade = data['students'][i]['3'];
    rows[i] = obj;
  }
  console.log(rows);
	return data;
};

const data = getData();

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject(new Error("Lỗi khi lưu: Tên không thể để trống."));
          } else {
            resolve({ ...user, name: user.name });
          }
        }, 200),
      ),
    [],
  );
};

export default function ValidationGrade() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZUlkIjoxLCJpYXQiOjE2NzA0ODk2ODEsImV4cCI6MTY3MzA4MTY4MX0.rSseHQSrXVyf_PyY3WAIoU07AKavd3-XP-RIXgXRgr4";

  const [code, setCode] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [classes, setClasses] = React.useState(null);
  const [date_of_birth, setBirthday] = React.useState(null);

  const fetchData = () => {
    getUserData(token).then((data) => {
      console.log(data)
      const user = data.profile.user;
      const student = data.profile.student;

      setCode(student.code);
      setName(user.name);
      setBirthday(user.birthday);
      setClasses(user.otherEmail);
    });
  }

  useEffect(() => {
    fetchData();
}, []);

  const [pageSize, setPageSize] = React.useState(5);
  const [snackbar, setSnackbar] = React.useState(null);
  
  const mutateRow = useFakeMutation();
  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'Dữ liệu đã được lưu', severity: 'success' });
      return response;
    },
    [mutateRow],
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  return (
    // Editable table grade
    <>
    
    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
      <Box component="nav"
					sx={{ width: '50%', flexShrink: { sm: 0 } }}>
      <DataGrid sx={{
      height: 900, width: '100%',
      ".MuiTablePagination-toolbar": {
        backgroundColor: "#dee2e6"
      },
      ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
        marginBottom:0,
        fontSize: 15
      },
  }}
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        componentsProps={{  
          pagination: {
            labelRowsPerPage: ("Số hàng hiển thị:")
          }
        }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        pagination
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
      </Box>


      <Box sx={{ flexGrow: 1, p: 3, width: '50%' }}>  
        <div className='pdf-viewer' align = 'right' >
          <iframe src={pdf_link} width = '100%' height='910px'></iframe>
        </div>
      </Box>
      </Box>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
}
