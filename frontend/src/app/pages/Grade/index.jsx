
import './styles.css'


// const Grade = () => {
//     return (
//         <>
//         <div class = "center">
//             <h2>Kết quả học tập</h2>
//         </div>
//         <p>Sinh viên: </p>
//         <p>Mã số sinh viên: </p>
//         <p>Lớp quản lý: </p>
//         </>
//     );
// };

// export default Grade;

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
  
function createData(code, subject, num, grade_10, grade_text, grade_4) {
    return { code, subject, num, grade_10, grade_text, grade_4 };
}
  
const rows = [
    createData('HIS1101', 'Lịch sử Đảng Cộng sản Việt Nam', 2, 7.3, 'B', 3),
    createData('POL1001', 'Tư tưởng Hồ Chí Minh', 2, 7, 'B', 3),
    createData('INT2208', 'Công nghệ phần mềm', 3, 9, 'A+', 4),
    createData('BSA2002', 'Nguyên lý marketing', 3, 9.6, 'A+', 4),
    createData('INT2211', 'Cơ sở dữ liệu', 4, 9.2, 'A+', 4),
    createData('INT2213', 'Mạng máy tính', 4, 9.6, 'A+', 4),
];
  
export default function Grade() {
    return (
        <>
        <div class = "center">
        <h2>Kết quả học tập</h2>
        </div>
        <p>Sinh viên: </p>
        <p>Mã số sinh viên: </p>
        <p>Lớp quản lý: </p>
        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            Mã môn học
                        </TableCell>
                        <TableCell align="center">
                            Môn học
                        </TableCell>
                        <TableCell align="center">
                            Số tín chỉ
                        </TableCell>
                        <TableCell align="center">
                            Điểm hệ 10
                        </TableCell>
                        <TableCell align="center">
                            Điểm chữ
                        </TableCell>
                        <TableCell align="center">
                            Điểm hệ 4
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            sx={{border:1}}
                        >
                            <TableCell class = "cell" align="left">
                                {row.code}
                            </TableCell>
                            <TableCell class = "cell" align="left">
                                {row.subject}
                            </TableCell>
                            <TableCell align="center">
                                {row.num}
                            </TableCell>
                            <TableCell align="center">
                                {row.grade_10}
                            </TableCell>
                            <TableCell align="center">
                                {row.grade_text}
                            </TableCell>
                            <TableCell align="center">
                                {row.grade_4}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}