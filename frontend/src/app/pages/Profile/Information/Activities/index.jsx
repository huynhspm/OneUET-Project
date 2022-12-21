import React, { useState } from 'react';
import Title from '../../../../components/Title';
import { Box, Grid, IconButton, FormControl, FormGroup, FormLabel, FormControlLabel, Checkbox, Select, TextField, InputLabel, ListItemText, OutlinedInput, MenuItem, Typography } from '@mui/material';
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
    const [editable, setEditable] = useState(false);

    const Submit = () => {
        console.log("Activities Information submited!");
        let clubIds = [];
        for (let i = 0; i < props.club.length; i++) {
            clubIds.push(props.club[i] + 1);
        }
        props.updateUserData(props.token, {
            unionJoint: props.unionJoint,
            partyJoint: props.partyJoint,
            unionPosition: props.unionPosition,
            associationPosition: props.associationPosition,
            clubIds: clubIds
        });
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
                            <FormLabel component="legend">
                                <Typography component="div">
                                    <Box sx={{ fontSize: 18 }}>
                                        Đã kết nạp
                                    </Box>
                                </Typography>
                            </FormLabel>
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
                                    disabled={!editable}
                                    fullWidth
                                    label="Chức vụ cao nhất (Đoàn Thanh niên)"
                                    value={ControlValue(props.unionPosition)}
                                    onChange={(event) => {
                                        props.setUnionPosition(event.target.value);
                                    }}
                                    id="position-doan"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    disabled={!editable}
                                    fullWidth
                                    label="Chức vụ cao nhất (Hội Sinh viên)"
                                    value={ControlValue(props.associationPosition)}
                                    onChange={(event) => {
                                        props.setAssociationPosition(event.target.value);
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
                                        value={props.club}
                                        onChange={(event) => {
                                            const {
                                                target: { value },
                                            } = event;
                                            props.setClub(
                                                typeof value === 'string' ? value.split(',') : value,
                                            );
                                            console.log(props.club);
                                        }}
                                        input={<OutlinedInput label="Các câu lạc bộ tham gia" />}
                                        renderValue={(selected) => {
                                            let name_selected = [];
                                            for (let i = 0; i < selected.length; i++) {
                                                name_selected.push(props.clubsList[selected[i]]);
                                            }
                                            return name_selected.join(', ');
                                        }}
                                        MenuProps={MenuProps}
                                    >
                                        {props.clubsList.map((name, index) => (
                                            <MenuItem key={name} value={index}>
                                                <Checkbox checked={props.club.indexOf(index) > -1} />
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