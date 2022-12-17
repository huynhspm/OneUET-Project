import React, { useEffect } from 'react';
import Title from '../../../../components/Title';
import { Box, Grid, FormControl, Select, MenuItem, InputLabel, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const ControlValue = (value) => {
    if (value === undefined || value === null) {
        return '';
    }
    return value;
}

const Extract = (classID, classIDs) => {
    for (let ac = 0; ac < classIDs.length; ac++) {
        for (let u = 0; u < classIDs[ac].length; u++) {
            for (let pr = 0; pr < classIDs[ac][u].length; pr++) {
                for (let cl = 0; cl < classIDs[ac][u][pr].length; cl++) {
                    if (classIDs[ac][u][pr][cl] === classID) {
                        return [ac, u, pr, cl];
                    }
                }
            }
        }
    }
    return [undefined, undefined, undefined, undefined];
}

const Education = (props) => {
    const [editable, setEditable] = React.useState(false);
    const [isGood, setIsGood] = React.useState(false);

    const [classIndex, setClassIndex] = React.useState();

    const Submit = () => {
        console.log("Education Information submited!");
        props.updateUserData(props.token, {
            program: props.program,
            academicYear: props.academicYear,
            unit: props.unit
        });
    }

    const programs = [
        "Chuẩn",
        "Chất lượng cao"
    ];

    const academicYears = [];
    for (let i = 2018; i <= 2022; i++) {
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

    const getClassIDs = (academicYear, unit, program) => {
        if (academicYear !== null && unit !== null && program !== null) {
            const unit_index = units.findIndex((element) => {
                return element === unit;
            });
            return classIDs[academicYear][unit_index][program];
        } else {
            return ["Khác"];
        }
    }

    useEffect(() => {
        if (props.academicYear == null || props.unit == null || props.program == null || props.classID == null) {
            setIsGood(false);
        } else {
            setIsGood(true);
            if (props.classID !== undefined) {
                const result = Extract(props.classID, classIDs);
                setClassIndex(result[3]);
            } else {
                setClassIndex(0);
            }
        }
    }, [props.academicYear, props.unit, props.program, props.classID]);

    useEffect(() => {
        if (!isGood) {
            if (props.academicYear == null || props.unit == null || props.program == null) {
                const [ac, u, pr, cl] = Extract(props.classID, classIDs);
                if (cl !== undefined) {
                    if (props.academicYear !== ac) {
                        props.setAcademicYear(ac);
                    }
                    if (props.unit !== units[u]) {
                        props.setUnit(units[u]);
                    }
                    if (props.program !== pr) {
                        props.setProgram(pr);
                    }
                    setClassIndex(cl);
                }
            }
        }
    }, [classIndex, isGood, props.academicYear, props.unit, props.program, props.classID]);

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
                                value={ControlValue(props.program)}
                                label="Chương trình đào tạo"
                                onChange={(event) => {
                                    props.setProgram(event.target.value);
                                    setClassIndex(undefined);
                                    props.setClassID(undefined);
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
                                value={ControlValue(props.academicYear)}
                                label="Khoá"
                                onChange={(event) => {
                                    props.setAcademicYear(event.target.value);
                                    setClassIndex(undefined);
                                    props.setClassID(undefined);
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
                            <InputLabel id="unit-label">Đơn vị đào tạo</InputLabel>
                            <Select
                                disabled={!editable}
                                labelId="unit-label"
                                id="unit"
                                value={ControlValue(props.unit)}
                                label="Đơn vị đào tạo"
                                onChange={(event) => {
                                    props.setUnit(event.target.value);
                                    setClassIndex(undefined);
                                    props.setClassID(undefined);
                                }}
                            >
                                {units.map((name) => (
                                    <MenuItem key={name} value={name}>
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
                                value={ControlValue(classIndex)}
                                label="Lớp quản lý"
                                onChange={(event) => {
                                    setClassIndex(event.target.value);
                                }}
                            >
                                {
                                    getClassIDs(props.academicYear, props.unit, props.program).map((name, index) => (
                                        <MenuItem key={name} value={index}>
                                            {name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment >
    );
}

export default Education;