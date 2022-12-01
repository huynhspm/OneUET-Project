import React from "react";
import Box from '@mui/material/Box';
import LeftDrawer from "../../../components/LeftDrawer";
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Input } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import Title from '../../../components/Title'
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Image from "mui-image";
import FromGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const drawerWidth = 240;

const Information = () => {

    const sex = false;
    const program = false;
    const academic = 0;
    const class_number = 2;
    const major = 0;

    const doan_vien = true;
    const dang_vien = false;

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
                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Divider />
                {/* <Container maxWidth="lg" sx={{ mt: 2, mg: 2 }}> */}
                <Box
                    component="div"
                    sx={{ flexGrow: 1, p: 1, m:1 }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Title>
                                    Thông tin Cá nhân
                                </Title>
                                <Box
                                    component="form"
                                    noValidate
                                    sx={{ mt: 1 }}
                                >
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Grid item xs={2}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    p: 1,
                                                    m: 1,
                                                    // minWidth: 160,
                                                    minHeight: 200,
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Image
                                                    src="https://randomuser.me/api/portraits/women/79.jpg"
                                                    sx={{
                                                        maxWidth: 120
                                                    }}
                                                    duration={0}
                                                />
                                                <Button component="div" variant="outlined">Cập nhật</Button>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        label="Mã số sinh viên"
                                                        defaultValue="20020001"
                                                        id="mssv"
                                                        type="text"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        label="Họ và tên"
                                                        defaultValue="Lương Sơn Bá"
                                                        id="name"
                                                        type="text"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        label="Ngày sinh"
                                                        defaultValue="08/07/2002"
                                                        id="date-of-birth"
                                                        type="text"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="sex-label">Giới tính</InputLabel>
                                                        <Select
                                                            labelId="sex-label"
                                                            id="sex"
                                                            value={sex}
                                                            label="Giới tính"
                                                            defaultValue={false}
                                                        >
                                                            <MenuItem value={false}>Nam</MenuItem>
                                                            <MenuItem value={true}>Nữ</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        label="Địa chỉ Email ĐHQGHN"
                                                        defaultValue="20020001@vnu.edu.vn"
                                                        id="email-vnu"
                                                        type="text"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        label="Địa chỉ Email khác"
                                                        defaultValue="luongsonba270@gmail.com"
                                                        id="email"
                                                        type="text"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Title>
                                    Thông tin Học tập
                                </Title>
                                <Box
                                    component="form"
                                    noValidate
                                    sx={{ mt: 1 }}
                                >
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="program-label">Chương trình đào tạo</InputLabel>
                                                <Select
                                                    disabled
                                                    labelId="program-label"
                                                    id="program"
                                                    value={program}
                                                    label="Chương trình đào tạo"
                                                    defaultValue={false}
                                                >
                                                    <MenuItem value={false}>Chuẩn</MenuItem>
                                                    <MenuItem value={true}>Chất lượng cao</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="academic-year-label">Khoá</InputLabel>
                                                <Select
                                                    disabled
                                                    labelId="academic-year-label"
                                                    id="academic-year"
                                                    value={academic}
                                                    label="Khoá"
                                                    defaultValue={0}
                                                >
                                                    <MenuItem value={0}>QH-2020-I/CQ</MenuItem>
                                                    <MenuItem value={1}>QH-2021-I/CQ</MenuItem>
                                                    <MenuItem value={2}>QH-2022-I/CQ</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="major-label">Ngành đào tạo</InputLabel>
                                                <Select
                                                    disabled
                                                    labelId="major-label"
                                                    id="major"
                                                    value={major}
                                                    label="Ngành đào tạo"
                                                    defaultValue={2}
                                                >
                                                    <MenuItem value={0}>Công nghệ thông tin CLC</MenuItem>
                                                    <MenuItem value={1}>Khoa học máy tính</MenuItem>
                                                    <MenuItem value={2}>Hệ thống thông tin</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="class-label">Lớp quản lý</InputLabel>
                                                <Select
                                                    disabled
                                                    labelId="class-label"
                                                    id="class"
                                                    value={class_number}
                                                    label="Lớp quản lý"
                                                    defaultValue={2}
                                                >
                                                    <MenuItem value={0}>QH-2020-I/CQ-CB</MenuItem>
                                                    <MenuItem value={1}>QH-2020-I/CQ-CC</MenuItem>
                                                    <MenuItem value={2}>QH-2020-I/CQ-C-CLC</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Title>
                                    Thông tin Đoàn - Hội
                                </Title>
                                <Box
                                    component="form"
                                    noValidate
                                    sx={{ mt: 1 }}
                                >
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Grid item xs={2}>
                                            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                                <FormLabel component="legend">Đã kết nạp</FormLabel>
                                                <FromGroup>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox checked={doan_vien} name="doan-vien" />
                                                        }
                                                        label="Đoàn viên"
                                                    />
                                                </FromGroup>
                                                <FromGroup>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox checked={dang_vien} name="dang-vien" />
                                                        }
                                                        label="Đảng viên"
                                                    />
                                                </FromGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        label="Chức vụ cao nhất (Đoàn Thanh niên)"
                                                        defaultValue="Phó Bí thư Chi đoàn K65CCLC"
                                                        id="position-doan"
                                                        type="text"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        label="Chức vụ cao nhất (Hội Sinh viên)"
                                                        defaultValue="Uỷ viên Ban chấp hành Hội Sinh viên Trường"
                                                        id="position-hoi"
                                                        type="text"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                <TextField
                                                        required
                                                        fullWidth
                                                        label="Các Câu lạc bộ tham gia"
                                                        defaultValue="Câu lạc bộ Thư viện Hội Sinh viên"
                                                        id="position-hoi"
                                                        type="text"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
                {/* </Container> */}
            </Box>
        </Box>
    );
};

export default Information;