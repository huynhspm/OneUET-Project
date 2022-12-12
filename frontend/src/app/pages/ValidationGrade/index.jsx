import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// https://drive.google.com/file/d/1X2K2dE5pj5NeP0yOEvQ-8MCUhzd4Papz/view?usp=share_link

let t1 = "https://docs.google.com/viewer?srcid="; 
let t2 = "&pid=explorer&efh=false&a=v&chrome=false&embedded=true"; 

const pdf_link = t1.concat('1pRHDGYar6n85cSndPP0XYuBKNcBlqEqd', t2);

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


let getData = async () => {
	const url = "http://localhost:3000/data.json";
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

const data = getData();

columns['id'] = data['index'];
columns['code'] = data['0'];
columns['midterm_grade'] = data['1'];
columns['final_grade'] = data['2'];
columns['total_grade'] = data['3'];

console.log(data['0'])


const rows = [];

// const rows = [
//   {id: 1, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
//   {id: 2, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
//   {id: 3, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
//   {id: 4, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
//   {id: 5, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
//   {id: 6, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
//   {id: 7, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
//   {id: 8, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
//   {id: 9, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
//   {id: 10, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
//   {id: 11, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
//   {id: 12, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
//   {id: 13, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
//   {id: 14, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
//   {id: 15, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
//   {id: 16, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
// ];

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

  const [pageSize, setPageSize] = React.useState(5);
  const mutateRow = useFakeMutation();

  const [snackbar, setSnackbar] = React.useState(null);

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
        components={{
          Toolbar: GridToolbar,
        }}
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
