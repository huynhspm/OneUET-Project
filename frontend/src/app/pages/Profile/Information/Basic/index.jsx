import React from 'react';
import Title from '../../../../components/Title';
import { Box, Grid, Button, IconButton, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Image from 'mui-image';

const Basic = (props) => {
    const [editable, setEditable] = React.useState(false);

    const [avatar, setAvatar] = React.useState("https://randomuser.me/api/portraits/women/79.jpg");

    const Submit = () => {
        console.log("Basic Information submited!");
        props.updateUserData(props.token, {
            avatar: props.avatar,
            name: props.name,
            birthday: props.birthday,
            gender: props.gender,
            email: props.emailVNU,
            otherEmail: props.email
        });
    }
    
    const ControlValue = (value) => {
        if (value === undefined || value === null) {
            return '';
        }
        return value;
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
                                Thông tin Cá nhân
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
            <Box component="form" noValidate sx={{ mt: 1 }}>
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
                                minHeight: 200,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Image src={avatar} sx={{ maxWidth: 120 }} duration={0} />
                            <Button component="div" variant="outlined" disabled={!editable}>Cập nhật</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    disabled={!editable}
                                    fullWidth
                                    label="Mã số sinh viên"
                                    value={ControlValue(props.code)}
                                    onChange={(event) => {
                                        props.setCode(event.target.value);
                                    }}
                                    id="id"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    disabled={!editable}
                                    fullWidth
                                    label="Họ và tên"
                                    value={ControlValue(props.name)}
                                    onChange={(event) => {
                                        props.setName(event.target.value);
                                    }}
                                    id="name"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Ngày sinh"
                                        disabled={!editable}
                                        inputFormat="DD/MM/YYYY"
                                        views={['day', 'month', 'year']}
                                        value={ControlValue(props.birthday)}
                                        onChange={(newValue) => {
                                            props.setBirthday(newValue);
                                        }}
                                        renderInput={(params) => <TextField fullWidth disabled={!editable} {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="gender-label">Giới tính</InputLabel>
                                    <Select
                                        disabled={!editable}
                                        labelId="gender-label"
                                        id="gender"
                                        value={ControlValue(props.gender)}
                                        onChange={(event) => {
                                            props.setGender(event.target.value);
                                        }}
                                        label="Giới tính"
                                    >
                                        <MenuItem value={0}>Nam</MenuItem>
                                        <MenuItem value={1}>Nữ</MenuItem>
                                        <MenuItem value={2}>Khác</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    disabled={!editable}
                                    fullWidth
                                    label="Địa chỉ Email ĐHQGHN"
                                    value={ControlValue(props.emailVNU)}
                                    onChange={(event) => {
                                        props.setEmailVNU(event.target.value);
                                    }}
                                    id="email-vnu"
                                    type="email"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    disabled={!editable}
                                    fullWidth
                                    label="Địa chỉ Email khác"
                                    value={ControlValue(props.email)}
                                    onChange={(event) => {
                                        props.setEmail(event.target.value);
                                    }}
                                    id="email"
                                    type="email"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}

export default Basic;