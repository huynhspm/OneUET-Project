import React, { useState } from "react";
import Title from "../../../../components/Title";
import { Box, Grid, Button, Paper, FormControl, FormLabel, FormGroup, Checkbox, FormControlLabel, Typography, List, ListItem } from '@mui/material';
import { PDFExport } from '@progress/kendo-react-pdf';
import CurriculumVitae from "./CurriculumVitae";

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

const ExportCV = (props) => {
    // Kendo PDF Export Component
    const pdfExportComponent = React.useRef(null);

    // CV Settings
    const [isAvatar, setIsAvatar] = useState(true);
    const [basic, setBasic] = useState(true);
    const [contact, setContact] = useState(true);
    const [education, setEducation] = useState(true);
    const [activities, setActivities] = useState(true);
    const [isClub, setIsClub] = useState(true);

    return (
        <Box sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Grid
                container
                spacing={2}
            >
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: "left", alignItems: "center" }}>
                        <Title>
                            Hồ sơ CV
                        </Title>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box
                        sx={{
                            m: 3,
                            justifyContent: "left"
                        }}
                    >
                        <Box>
                            <Typography component="div">
                                <Box sx={{ fontSize: 18 }}>
                                    Thuộc tính
                                </Box>
                            </Typography>
                            <List sx={{ ml: -1 }}>
                                <ListItem>Khổ giấy: A4</ListItem>
                                <ListItem>Lề: 0.168 inch</ListItem>
                                <ListItem>Độ phân giải: 300ppi</ListItem>
                            </List>
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <Typography component="div">
                                <Box sx={{ fontSize: 18 }}>
                                    Tuỳ chỉnh CV
                                </Box>
                            </Typography>
                            <FormControl sx={{ mt: 1, ml: 1 }} component="fieldset" variant="standard">
                                {/* <FormLabel component="legend"> </FormLabel> */}
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={ControlValue(isAvatar, 1)} onChange={(event) => { setIsAvatar(event.target.checked); }} name="avatar-info" />
                                        }
                                        label="Ảnh cá nhân"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={ControlValue(basic, 1)} onChange={(event) => { setBasic(event.target.checked); }} name="basic-info" />
                                        }
                                        label="Cơ bản"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={ControlValue(contact, 1)} onChange={(event) => { setContact(event.target.checked); }} name="contact-info" />
                                        }
                                        label="Liên lạc"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={ControlValue(education, 1)} onChange={(event) => { setEducation(event.target.checked); }} name="education-info" />
                                        }
                                        label="Học vấn"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={ControlValue(activities, 1)} onChange={(event) => { setActivities(event.target.checked); }} name="activites-info" />
                                        }
                                        label="Hoạt động"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={ControlValue(isClub, 1)} onChange={(event) => { setIsClub(event.target.checked); }} name="clubs-info" />
                                        }
                                        label="Câu lạc bộ"
                                    />
                                </FormGroup>
                            </FormControl>
                        </Box>
                        <Box sx={{ mt: 3, justifyContent: "left", alignItems: "center" }}>
                            <Typography component="div">
                                <Box sx={{ fontSize: 18 }}>
                                    Xuất CV
                                </Box>
                            </Typography>
                            <List sx={{ ml: -1 }}>
                                <ListItem>Định dạng: pdf</ListItem>
                                <ListItem>Tỉ lệ: 0.75</ListItem>
                            </List>
                            <Button component="div" variant="outlined" onClick={() => {
                                pdfExportComponent.current.save();
                            }} >Export</Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Paper
                            variant="outlined"
                            sx={{
                                maxWidth: '9in',
                                p: 1,
                                borderColor: 'primary.default'
                            }}
                        >
                            <PDFExport
                                ref={pdfExportComponent}
                                paperSize="A4"
                                scale={0.75}
                                imageResolution={300}
                            >
                                <CurriculumVitae
                                    // Setting
                                    isAvatar={isAvatar}
                                    basic={basic}
                                    contact={contact}
                                    education={education}
                                    activities={activities}
                                    isClub={isClub}

                                    // Basic
                                    avatar={props.avatar}
                                    code={props.code}
                                    name={props.name}
                                    birthday={props.birthday}
                                    gender={props.gender}
                                    emailVNU={props.emailVNU}
                                    email={props.email}
                                    phone={props.phone}
                                    address={props.address}

                                    // Education
                                    program={props.program}
                                    academicYear={props.academicYear}
                                    unit={props.unit}
                                    classID={props.classID}

                                    // Activites
                                    unionJoint={props.unionJoint}
                                    partyJoint={props.partyJoint}
                                    unionPosition={props.unionPosition}
                                    associationPosition={props.associationPosition}
                                    club={props.club}
                                    clubsList={props.clubsList}
                                />
                            </PDFExport>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ExportCV;