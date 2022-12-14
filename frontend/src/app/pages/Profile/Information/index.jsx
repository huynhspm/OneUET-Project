import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Basic from './Basic';
import Education from './Education';
import Activities from './Activities';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';

const getUserData = async token => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const response = await axios.get("http://localhost:2002/user/me", config);
        console.log(response);
        return response.data.data;
    } catch (e) {
        console.log(e.response);
    }
}

const updateUserData = async (token, data) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    console.log(data);
    try {
        const response = await axios.put("http://localhost:2002/user/me", data, config);
        console.log(response);
    } catch (e) {
        console.log(e.response);
    }
}

const Information = (props) => {
    // Basic
    const [avatar, setAvatar] = React.useState("https://randomuser.me/api/portraits/women/79.jpg");

    const [code, setCode] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [birthday, setBirthday] = React.useState(null);
    const [gender, setGender] = React.useState(null);
    const [emailVNU, setEmailVNU] = React.useState(null);
    const [email, setEmail] = React.useState(null);

    // Education
    const [program, setProgram] = React.useState(null);
    const [academicYear, setAcademicYear] = React.useState(null);
    const [unit, setUnit] = React.useState(null);
    const [classID, setClassID] = React.useState(null);

    // Activites
    const [unionJoint, setUnionJoint] = React.useState(null);
    const [partyJoint, setPartyJoint] = React.useState(null);
    const [unionPossition, setUnionPossition] = React.useState(null);
    const [associationPossition, setAssociationPossition] = React.useState(null);
    const [club, setClub] = React.useState(null);

    const fetchData = () => {
        getUserData(props.token).then((data) => {
            const user = data.user;
            const student = data.student;

            // Basic
            setAvatar(user.avatar);
            setCode(student.code);
            setName(user.name);
            setBirthday(user.birthday);
            setGender(user.gender);
            setEmailVNU(user.email);
            setEmail(user.otherEmail);

            // Education
            setProgram(user.program);
            setAcademicYear(user.academicYear);
            setUnit(user.unit);
            setClassID(student.class);

            // Activities
            setUnionJoint(user.unionJoint || false);
            setPartyJoint(user.partyJoint || false);
            setUnionPossition(user.unionPossition);
            setAssociationPossition(user.associationPossition);
            setClub(user.club);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box
            component="div"
            sx={{ flexGrow: 1, p: 1, m: 1 }}
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
                        <Basic
                            avatar={avatar}
                            setAvatar={setAvatar}
                            code={code}
                            setCode={setCode}
                            name={name}
                            setName={setName}
                            birthday={birthday}
                            setBirthday={setBirthday}
                            gender={gender}
                            setGender={setGender}
                            emailVNU={emailVNU}
                            setEmailVNU={setEmailVNU}
                            email={email}
                            setEmail={setEmail}
                            token={props.token}
                            updateUserData={updateUserData}
                        />
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
                        <Education
                            program={program}
                            setProgram={setProgram}
                            academicYear={academicYear}
                            setAcademicYear={setAcademicYear}
                            unit={unit}
                            setUnit={setUnit}
                            classID={classID}
                            setClassID={setClassID}
                            token={props.token}
                            updateUserData={updateUserData}
                        />
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
                        <Activities
                            unionJoint={unionJoint}
                            setUnionJoint={setUnionJoint}
                            partyJoint={partyJoint}
                            setPartyJoint={setPartyJoint}
                            unionPossition={unionPossition}
                            setUnionPossition={setUnionPossition}
                            associationPossition={associationPossition}
                            setAssociationPossition={setAssociationPossition}
                            club={club}
                            setClub={setClub}
                            token={props.token}
                            updateUserData={updateUserData}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Information;