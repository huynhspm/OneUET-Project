import React, { useEffect } from 'react';
import Title from '../../../../components/Title';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { ProgramList, AcademicYearList, UnitList, ClassIDList } from '../../../../utils/information/education';
import { Box, Grid, FormControl, Select, MenuItem, InputLabel, IconButton } from '@mui/material';

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

    const programs = ProgramList;

    const academicYears = AcademicYearList;

    const units = UnitList;

    const classIDs = ClassIDList;

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