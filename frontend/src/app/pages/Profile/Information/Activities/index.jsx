import React from 'react';
import Title from '../../../../components/Title';
import { Box, Grid, IconButton, FormControl, FormGroup, FormLabel, FormControlLabel, Checkbox, Select, TextField, InputLabel, ListItemText, OutlinedInput, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ControlValue = (value, type = 0) => {
    if (value === undefined || value == null) {
        if (type === 0) {
            return '';
        }
        if (type === 1) {
            return false;
        }
    }
    return value;
}

const Activities = (props) => {
    const [editable, setEditable] = React.useState(false);
    
    const [club, setClub] = React.useState([]);

    const Submit = () => {
        console.log("Activities Information submited!");
        props.updateUserData(props.token, {
            unionJoint: props.unionJoint,
            partyJoint: props.partyJoint,
            unionPossition: props.unionPossition,
            associationPossition: props.associationPossition
        });
    }

    const ClubsList = [
        "Câu lạc bộ Thư viện Hội Sinh viên",
        "Câu lạc bộ Nghệ thuật",
        "Câu lạc bộ nguồn nhân lực HRTech",
        "Câu lạc bộ Tiếng Anh",
        "Câu lạc bộ Đá Bóng",
        "Câu lạc bộ Điện tử và Tự động hóa",
        "Câu lạc bộ Thuyết trình",
        "Câu lạc bộ Sinh viên vận động hiến máu",
        "Câu lạc bộ Robotics",
        "Câu lạc bộ Tiếng Nhật",
        "Câu lạc bộ Lý luận trẻ",
        "Câu lạc bộ Hỗ trợ sinh viên",
        "Câu lạc bộ Truyền thông UETLC",
        "Câu lạc bộ Nhảy cổ động",
        "Câu lạc bộ Cầu Lông",
        "Câu lạc bộ Bóng rổ",
        "Câu lạc bộ Hàng không Vũ trụ"
    ];

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
                                Thông tin Đoàn - Hội
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
                        <FormControl disabled={!editable} sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormLabel component="legend">Đã kết nạp</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={ControlValue(props.unionJoint, 1)} onChange={(event) => { props.setUnionJoint(event.target.checked); }} name="doan-vien" />
                                    }
                                    label="Đoàn viên"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={ControlValue(props.partyJoint, 1)} onChange={(event) => { props.setPartyJoint(event.target.checked); }} name="dang-vien" />
                                    }
                                    label="Đảng viên"
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    disabled={!editable}
                                    fullWidth
                                    label="Chức vụ cao nhất (Đoàn Thanh niên)"
                                    value={ControlValue(props.unionPossition)}
                                    onChange={(event) => {
                                        props.setUnionPossition(event.target.value);
                                    }}
                                    id="position-doan"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    disabled={!editable}
                                    fullWidth
                                    label="Chức vụ cao nhất (Hội Sinh viên)"
                                    value={ControlValue(props.associationPossition)}
                                    onChange={(event) => {
                                        props.setAssociationPossition(event.target.value);
                                    }}
                                    id="position-hoi"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl disabled={!editable} fullWidth>
                                    <InputLabel id="club-label">Các Câu lạc bộ tham gia</InputLabel>
                                    <Select
                                        labelId="club-label"
                                        id="club"
                                        multiple
                                        value={club}
                                        onChange={(event) => {
                                            const {
                                                target: { value },
                                            } = event;
                                            setClub(
                                                typeof value === 'string' ? value.split(',') : value,
                                            );
                                        }}
                                        input={<OutlinedInput label="Các câu lạc bộ tham gia" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {ClubsList.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={club.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}

export default Activities;