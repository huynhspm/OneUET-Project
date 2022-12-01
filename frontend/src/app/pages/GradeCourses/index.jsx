import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { fontSize, fontWeight } from '@mui/system';


// id, code, name, date_of_birth, classes, midterm_grade, final_grade, total_grade

const columns = [
  { field: 'id', 
    headerName: 'STT', 
    width: 70,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'code',
    headerName: 'Mã sinh viên',
    // width: 150,
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    // editable: true,
  },
  {
    field: 'name',
    headerName: 'Họ và tên',
    headerAlign: 'center',
    // width: 200,
    flex: 0.8,
  },
  {
    field: 'date_of_birth',
    headerName: 'Ngày sinh',
    type: 'dateTime',
    headerAlign: 'center',
    align: 'center',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    // width: 110,
    flex: 0.7,
  },
  {
    field: 'classes',
    headerName: 'Lớp học',  
    headerAlign: 'center',
    align: 'left',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    // width: 200,
    flex: 0.8,
  },
  {
    field: 'midterm_grade',
    headerName: 'Điểm thành phần',
    headerAlign: 'center',
    align: 'center',
    type: 'number',
    // width: 160,
    flex: 0.5,
  },
  {
    field: 'final_grade',
    headerName: 'Điểm cuối kỳ',
    headerAlign: 'center',
    align: 'center',
    type: 'number',
    // width: 160,
    flex: 0.5,
  },
  {
    field: 'total_grade',
    headerName: 'Tổng điểm',
    headerAlign: 'center',
    align: 'center',
    type: 'number',
    // width: 160,
    flex: 0.5,
  },
];

const rows = [
  {id: 1, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
  {id: 2, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
  {id: 3, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
  {id: 4, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
  {id: 5, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
  {id: 6, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
  {id: 7, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
  {id: 8, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
  {id: 9, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
  {id: 10, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
  {id: 11, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
  {id: 12, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
  {id: 13, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
  {id: 14, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
  {id: 15, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},
  {id: 16, code: "20020057", name: "Đặng Xuân Lộc", date_of_birth: "06/04/2002", classes: "QH-2020-I/CQ-C-CLC", midterm_grade: 8.5, final_grade: 9.5, total_grade: 9.1},

  // { id: 2, lastName: 'Snow', firstName: 'Jon', age: 35 },
  // { id: 3, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  // { id: 4, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridDemo() {

  const [pageSize, setPageSize] = React.useState(5);





  return (
    <Box sx={{ height: 910, width: '100%' }}>
      <DataGrid sx={{
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
  );
}