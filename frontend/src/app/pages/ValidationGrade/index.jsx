import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useEffect } from 'react';

const getUserData = async token => {
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  }

  try {

    const response = await axios.get("http://localhost:2002/grade", 
    {
      // params: {linkPDF},
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data.data;
  } catch (e) {
      console.log('error to get database');
  }
}

const linkPDF = ""
let t1 = "https://docs.google.com/viewer?srcid=";   
let t2 = "&pid=explorer&efh=false&a=v&chrome=false&embedded=true"; 

const pdf_link = t1.concat('12YkwJaHsX1uDK35Np6b0MuqvCORO2qXV', t2);

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
    field: 'midterm',
    headerName: 'Điểm thành phần',
    headerAlign: 'center',
    align: 'center',
    type: 'number',
    // width: 160,
    flex: 0.5,
    editable: true
  },
  {
    field: 'final',
    headerName: 'Điểm cuối kỳ',
    headerAlign: 'center',
    align: 'center',
    type: 'number',
    // width: 160,
    flex: 0.5,
    editable: true
  },
  {
    field: 'total',
    headerName: 'Tổng điểm',
    headerAlign: 'center',
    align: 'center',
    type: 'number',
    // width: 160,
    flex: 0.5,
    editable: true
  },
];

let getData = async () => {
	const url = "http://localhost:3000/data.json";
	const response = await fetch(url);
	const data = await response.json();
  for(var i = 0; i < data['students'].length; i++) {
    const obj = {}
    obj.code = data['students'][i]['0'];
    obj.id = i;
    obj.midterm = data['students'][i]['1'];
    obj.final = data['students'][i]['2'];
    obj.total = data['students'][i]['3'];
    // rows[i] = obj;
  }
  // console.log(rows);
	return data;
};

const updateData = async (token, data) => {
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  }
  console.log(data);
  try {
      const response = await axios.put("http://localhost:2002/user/me", data, config);
      console.log(response);
  } catch (e) {
      console.log(e.response);
  }
}

// const data = getData();

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (user.code?.trim() === '') {
            reject(new Error("Lỗi khi lưu: Mã sinh viên không thể để trống."));
          } else {
            resolve({ ...user, code: user.code });
          }
        }, 200),
      ),
    [],
  );
};

export default function ValidationGrade() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZUlkIjoxLCJpYXQiOjE2NzA0ODk2ODEsImV4cCI6MTY3MzA4MTY4MX0.rSseHQSrXVyf_PyY3WAIoU07AKavd3-XP-RIXgXRgr4";

  const [codeClass, setCodeClass] = React.useState(null);
  const [semester, setSemester] = React.useState(null);
  const [code, setCode] = React.useState(null);
  const [midterm, setMidterm] = React.useState(null);
  const [final, setFinal] = React.useState(null);
  const [total, setTotal] = React.useState(null);
  const [rows, setRows] = React.useState([]);

  const [pageSize, setPageSize] = React.useState(50);
  const [snackbar, setSnackbar] = React.useState(null);

  const mutateRow = useFakeMutation();
  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    getUserData(token).then((data) => {
      let rows2 = []
      data = data.grade
      console.log(data)
      
      for(var i = 0; i < data.length; i++) {
        rows2.push({
          code: data[i].studentCode,
          id: i+1,
          midterm: data[i].midterm,
          final: data[i].final,
          total: data[i].total,
        });
      }

      setRows(rows2)
    });
}, []);


  const processRowUpdate = React.useCallback(
    async (newRow) => {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'Dữ liệu đã được sửa', severity: 'success' });
      console.log(response)
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
    
    <Box>
      <TextField sx={{m: 2,ml: 3,  width: 200}} 
        id="codeclass" 
        label="Mã môn học" 
        onChange={(event) => {
          setCodeClass(event.target.value);
        }}
        />
    </Box>

    <Box>
      <TextField sx={{m: 1,ml: 3,  width: 200}} 
        id="semester" 
        label="Học kỳ"
        helperText="Ví dụ: 2021-2022-1" 
        onChange={(event) => {
          setSemester(event.target.value);
        }}
        />
    </Box>

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
