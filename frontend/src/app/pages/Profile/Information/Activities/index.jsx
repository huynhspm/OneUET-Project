import React, { useEffect, useState } from 'react';
import Title from '../../../../components/Title';
import { Box, Grid, IconButton, FormControl, FormGroup, FormLabel, FormControlLabel, Checkbox, Select, TextField, InputLabel, ListItemText, OutlinedInput, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';

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

    const Submit = () => {
        console.log("Activities Information submited!");
        let clubIds = [];
        props.club.map((value) => {
            clubIds.push(value+1);
        });
        props.updateUserData(props.token, {
            unionJoint: props.unionJoint,
            partyJoint: props.partyJoint,
            unionPosition: props.unionPosition,
            associationPosition: props.associationPosition,
            clubIds: clubIds
        });
    }

    const [clubsList, setClubsList] = useState([]);

    const getClubList = async () => {
        const config = {
            headers: { Authorization: `Bearer ${props.token}` }
        }
        try {
            const res = await axios.get("http://localhost:2002/api/club", config);
            // console.log(res.data.data.clubs);
            return res.data.data.clubs;
        } catch (e) {
            console.log(e.response.data);
        }
    }

    useEffect(() => {
        if (props.token !== "" && props.token !== null && props.token !== undefined) {
            getClubList().then((value) => {
                if (clubsList.length === 0) {
                    for (let i = 0; i < value.length; i++) {
                        clubsList.push(value[i].name);
                    }
                }
            })
        }
    }, [props.token]);

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
                                    required
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
                                                name_selected.push(clubsList[selected[i]]);
                                            }
                                            return name_selected.join(', ');
                                        }}
                                        MenuProps={MenuProps}
                                    >
                                        {clubsList.map((name, index) => (
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