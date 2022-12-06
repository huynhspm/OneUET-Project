import React from 'react';
import Title from '../../../../components/Title';
import { Box, Grid, FormControl, Select, MenuItem, InputLabel, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const Submit = () => {
    console.log("Education Information submited!");
}

const Education = (props) => {
    const [editable, setEditable] = React.useState(false);

    const [program, setProgram] = React.useState(0);
    const [academicYear, setAcademicYear] = React.useState(0);
    const [unit, setUnit] = React.useState(0);
    const [classID, setClassID] = React.useState(2);

    const programs = [
        "Chuẩn",
        "Chất lượng cao"
    ];

    const academicYears = [];
    for (let i = 2018; i < 2022; i++) {
        academicYears.push("QH-" + String(i) + "-I/CQ");
    }

    const units = [
        "Khoa Công nghệ Thông tin",
        "Khoa Điện tử Viễn thông",
        "Khoa Vật lý kỹ thuật & Công nghệ Nano",
        "Khoa Cơ học kỹ thuật & Tự động hoá",
        "Khoa Công nghệ Nông nghiệp",
        "Khoa Công nghệ Xây dựng - Giao thông",
        "Viện Công nghệ Hàng không Vũ trụ",
        "Viện Trí tuệ Nhân tạo"
    ];

    const classIDs = new Array(academicYears.length);
    for (let i = 0; i < academicYears.length; i++) {
        classIDs[i] = new Array(units.length);
        for (let j = 0; j < units.length; j++) {
            classIDs[i][j] = new Array(programs.length);
            classIDs[i][j][0] = new Array(0);
            classIDs[i][j][1] = new Array(0);
        }

        // CNTT - Chuan
        const CNTT_Chuan = ["CB", "CC", "CD", "CE", "C-CLC", "J", "N"];
        for (let j = 0; j < CNTT_Chuan.length; j++) {
            classIDs[i][0][0].push(academicYears[i] + "-" + CNTT_Chuan[j]);
        }
        // CNTT - CLC
        const CNTT_CLC = ["N-CLC", "CA-CLC1", "CA-CLC2", "CA-CLC3", "CA-CLC4", "T-CLC"];
        for (let j = 0; j < CNTT_CLC.length; j++) {
            classIDs[i][0][1].push(academicYears[i] + "-" + CNTT_CLC[j]);
        }

        // DTVT - Chuan
        const DTVT_Chuan = ["K", "K1", "K2", "R"];
        for (let j = 0; j < DTVT_Chuan.length; j++) {
            classIDs[i][1][0].push(academicYears[i] + "-" + DTVT_Chuan[j]);
        }
        // DTVT - CLC
        const DTVT_CLC = ["ĐA-CLC", "ĐA-CLC1", "ĐA-CLC2"];
        for (let j = 0; j < DTVT_CLC.length; j++) {
            classIDs[i][1][1].push(academicYears[i] + "-" + DTVT_CLC[j]);
        }

        // CHKT&TDH - Chuan
        const CHKT_TDH_Chuan = ["H", "AT"];
        for (let j = 0; j < CHKT_TDH_Chuan.length; j++) {
            classIDs[i][2][0].push(academicYears[i] + "-" + CHKT_TDH_Chuan[j]);
        }
        // CHKT&TDH - CLC
        const CHKT_TDH_CLC = ["M-CLC", "M-CLC1", "M-CLC2", "M-CLC3"];
        for (let j = 0; j < CHKT_TDH_CLC.length; j++) {
            classIDs[i][2][1].push(academicYears[i] + "-" + CHKT_TDH_CLC[j]);
        }
        // VLKT&CNNN - Chuẩn + CLC
        const VLKT_CNNN = ["E", "V"];
        for (let j = 0; j < VLKT_CNNN.length; j++) {
            classIDs[i][3][0].push(academicYears[i] + "-" + VLKT_CNNN[j]);
            classIDs[i][3][1].push(academicYears[i] + "-" + VLKT_CNNN[j]);
        }

        // NN - Chuẩn + CLC
        const NN = ["AG"];
        for (let j = 0; j < NN.length; j++) {
            classIDs[i][4][0].push(academicYears[i] + "-" + NN[j]);
            classIDs[i][4][1].push(academicYears[i] + "-" + NN[j]);
        }

        // XD-GT - Chuẩn + CLC
        const XD_GT = ["XD", "XD1", "XD2"];
        for (let j = 0; j < XD_GT.length; j++) {
            classIDs[i][5][0].push(academicYears[i] + "-" + XD_GT[j]);
            classIDs[i][5][1].push(academicYears[i] + "-" + XD_GT[j]);
        }

        // HKVT - Chuẩn + CLC
        const HKVT = ["AE"];
        for (let j = 0; j < HKVT.length; j++) {
            classIDs[i][6][0].push(academicYears[i] + "-" + HKVT[j]);
            classIDs[i][6][1].push(academicYears[i] + "-" + HKVT[j]);
        }

        // TTNT - Chuẩn + CLC
        const TTNT = ["AI1", "AI2"];
        for (let j = 0; j < TTNT.length; j++) {
            classIDs[i][7][0].push(academicYears[i] + "-" + TTNT[j]);
            classIDs[i][7][1].push(academicYears[i] + "-" + TTNT[j]);
        }
    }

    return (
        <React.Fragment>
            <Box sx={{ p: 1 }}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item xs={10}>
                        <Box sx={{ display: 'flex', justifyContent: "left", alignItems: "center" }}>
                            <Title>
                                Thông tin Học tập
                            </Title>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{ display: 'flex', justifyContent: "right", alignItems: "center" }}>
                            <IconButton
                                onClick={() => {
                                    if (editable) {
                                        Submit();
                                    }
                                    setEditable(!editable);
                                }}
                            >
                                {!editable ? (<EditIcon />) : (<CheckIcon />)}
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box component="form" noValidate sx={{ mt: 1 }} >
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
                                disabled={!editable}
                                labelId="program-label"
                                id="program"
                                value={program}
                                label="Chương trình đào tạo"
                                onChange={(event) => {
                                    setProgram(event.target.value);
                                    setClassID(undefined);
                                }}
                            >
                                {programs.map((name, index) => (
                                    <MenuItem key={name} value={index}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="academic-year-label">Khoá</InputLabel>
                            <Select
                                disabled={!editable}
                                labelId="academic-year-label"
                                id="academic-year"
                                value={academicYear}
                                label="Khoá"
                                onChange={(event) => {
                                    setAcademicYear(event.target.value);
                                    setClassID(undefined);
                                }}
                            >
                                {academicYears.map((name, index) => (
                                    <MenuItem key={name} value={index}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="unit-label">Ngành đào tạo</InputLabel>
                            <Select
                                disabled={!editable}
                                labelId="unit-label"
                                id="unit"
                                value={unit}
                                label="Ngành đào tạo"
                                onChange={(event) => {
                                    setUnit(event.target.value);
                                    setClassID(undefined);
                                }}
                            >
                                {units.map((name, index) => (
                                    <MenuItem key={name} value={index}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="class-label">Lớp quản lý</InputLabel>
                            <Select
                                disabled={!editable}
                                labelId="class-label"
                                id="class"
                                value={classID}
                                label="Lớp quản lý"
                                onChange={(event) => {
                                    setClassID(event.target.value);
                                }}
                            >
                                {classIDs[academicYear][unit][program].map((name, index) => (
                                    <MenuItem key={name} value={index}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment >
    );
}

export default Education;