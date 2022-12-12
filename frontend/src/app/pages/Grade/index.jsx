import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LeftDrawer from "../../components/LeftDrawer";
import './styles.css';

const drawerWidth = 240;

function createData(
  code,
  subject,
  num,
  grade_10,
  grade_text,
  grade_4,
) {
  return {
    code,
    subject,
    num,
    grade_10,
    grade_text,
    grade_4,
    detail: [
      {
        GK: 'a',
        CK: 'b'
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderTop: 0 } }}>
        <TableCell sx={{ borderLeft: 1 }} align="center" component="th" scope="row">
          {row.code}
        </TableCell>
        <TableCell sx={{ borderLeft: 1 }} align="left">{row.subject}</TableCell>
        <TableCell sx={{ borderLeft: 1 }} align="center">{row.num}</TableCell>
        <TableCell sx={{ borderLeft: 1 }} align="center">{row.grade_10}</TableCell>
        <TableCell sx={{ borderLeft: 1 }} align="center">{row.grade_text}</TableCell>
        <TableCell sx={{ borderLeft: 1 }} align="center">{row.grade_4}</TableCell>
        <TableCell sx={{ borderLeft: 1 }} align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 0 }}>
              <Typography variant="h6" gutterBottom component="div">
                Chi tiết
              </Typography>
              <Table aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Giữa kỳ</TableCell>
                    <TableCell>Cuối kỳ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.detail.map((detail) => (
                    <TableRow key={detail.GK}>
                      <TableCell component="th" scope="row">
                        {detail.GK}
                      </TableCell>
                      <TableCell>{detail.CK}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('HIS1101', 'Lịch sử Đảng Cộng sản Việt Nam', 2, 7.3, 'B', 3),
  createData('POL1001', 'Tư tưởng Hồ Chí Minh', 2, 7, 'B', 3),
  createData('INT2208', 'Công nghệ phần mềm', 3, 9, 'A+', 4),
  createData('BSA2002', 'Nguyên lý marketing', 3, 9.6, 'A+', 4),
  createData('INT2211', 'Cơ sở dữ liệu', 4, 9.2, 'A+', 4),
  createData('INT2213', 'Mạng máy tính', 4, 9.6, 'A+', 4),
  createData('HIS1101', 'Lịch sử Đảng Cộng sản Việt Nam', 2, 7.3, 'B', 3),
  createData('POL1001', 'Tư tưởng Hồ Chí Minh', 2, 7, 'B', 3),
  createData('INT2208', 'Công nghệ phần mềm', 3, 9, 'A+', 4),
  createData('BSA2002', 'Nguyên lý marketing', 3, 9.6, 'A+', 4),
  createData('INT2211', 'Cơ sở dữ liệu', 4, 9.2, 'A+', 4),
  createData('HIS1101', 'Lịch sử Đảng Cộng sản Việt Nam', 2, 7.3, 'B', 3),
  createData('POL1001', 'Tư tưởng Hồ Chí Minh', 2, 7, 'B', 3),
  createData('INT2208', 'Công nghệ phần mềm', 3, 9, 'A+', 4),
  createData('BSA2002', 'Nguyên lý marketing', 3, 9.6, 'A+', 4),
  createData('INT2211', 'Cơ sở dữ liệu', 4, 9.2, 'A+', 4),
];

export default function Grade() {
  return (
      <Box sx={{ display: 'flex' }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <LeftDrawer />
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 1, m: 5, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Typography variant="h6">
            Sinh viên:
          </Typography>
          <Typography variant="h6">
            Mã số sinh viên:
          </Typography>
          <Typography variant="h6">
            Lớp quản lý:
          </Typography>
          <Typography variant="h4" align="center">
            Bảng điểm học tập
          </Typography>
          <br />
          <br />
          <TableContainer sx={{ maxHeight: 700 }} component={Paper}>
            <Table stickyHeader aria-label="grade_table">
              <TableHead>
                <TableRow sx={{ '& > *': { borderBottom: 0.5, borderLeft: 0.5, borderTop: 0.5, backgroundColor: "lightblue" } }}>
                  <TableCell align="center">Mã môn học</TableCell>
                  <TableCell align="left">Môn học</TableCell>
                  <TableCell align="center">Số tín chỉ</TableCell>
                  <TableCell align="center">Điểm hệ 10</TableCell>
                  <TableCell align="center">Điểm chữ</TableCell>
                  <TableCell align="center">Điểm hệ 4</TableCell>
                  <TableCell align="center"> Chi tiết</TableCell>
                </TableRow>
              </TableHead>

              <TableRow>
                <TableCell sx={{ borderBottom: 1, borderTop: 1 }} align="center" colSpan={8}>
                  Học kỳ 2 - Năm học 2022 - 2023
                </TableCell>
              </TableRow>

              <TableBody>
                {rows.map((row) => (
                  <Row key={row.code} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Box>
    </Box>
  );
}
