import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Basic from './Basic';
import Education from './Education';
import Activities from './Activities';
import ExportCV from './ExportCV';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { api_url } from '../../../utils/config';

const getUserData = async token => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const response = await axios.get(api_url + "/api/user/me", config);
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
        const response = await axios.put(api_url + "/api/user/me", data, config);
        console.log(response);
    } catch (e) {
        console.log(e.response);
    }
}

const Information = (props) => {
    const [isFetch, setIsFetch] = React.useState(false);

    // Basic
    const [avatar, setAvatar] = React.useState("https://randomuser.me/api/portraits/women/79.jpg");

    const [code, setCode] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [birthday, setBirthday] = React.useState(null);
    const [gender, setGender] = React.useState(null);
    const [emailVNU, setEmailVNU] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [address, setAddress] = React.useState(null);

    // Education
    const [program, setProgram] = React.useState(null);
    const [academicYear, setAcademicYear] = React.useState(null);
    const [unit, setUnit] = React.useState(null);
    const [classID, setClassID] = React.useState(null);

    // Activites
    const [unionJoint, setUnionJoint] = React.useState(null);
    const [partyJoint, setPartyJoint] = React.useState(null);
    const [unionPosition, setUnionPosition] = React.useState(null);
    const [associationPosition, setAssociationPosition] = React.useState(null);
    const [club, setClub] = React.useState([]);

    const fetchData = () => {
        if (props.token !== "" && props.token !== null && props.token !== undefined) {
            getUserData(props.token).then((data) => {
                const user = data.profile.user;
                const student = data.profile.student;
                const clubs = data.profile.clubs;

                // Basic
                setAvatar(user.avatar);
                setCode(student.code);
                setName(student.name);
                setBirthday(user.birthday);
                setGender(user.gender);
                setEmailVNU(user.email);
                setEmail(user.otherEmail);
                setPhone(user.phone);
                setAddress(user.address);

                // Education
                setProgram(user.program);
                setAcademicYear(user.academicYear);
                setUnit(user.unit);
                setClassID(student.class);

                // Activities
                setUnionJoint(user.unionJoint);
                setPartyJoint(user.partyJoint);
                setUnionPosition(user.unionPosition);
                setAssociationPosition(user.associationPosition);
                for (let i = 0; i < clubs.length; i++) {
                    club.push(clubs[i].id-1);
                }

                setIsFetch(true);
            });
        }
    }

    useEffect(() => {
        if (!isFetch) {
            fetchData();
        }
    }, [props.token, isFetch]);

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
                            phone={phone}
                            setPhone={setPhone}
                            address={address}
                            setAddress={setAddress}
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
                            isFetch={isFetch}
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
                            unionPosition={unionPosition}
                            setUnionPosition={setUnionPosition}
                            associationPosition={associationPosition}
                            setAssociationPosition={setAssociationPosition}
                            club={club}
                            setClub={setClub}
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
                        <ExportCV 
                            // Basic
                            avatar={avatar}
                            code={code}
                            name={name}
                            birthday={birthday}
                            gender={gender}
                            emailVNU={emailVNU}
                            email={email}
                            phone={phone}
                            address={address}

                            // Education
                            program={program}
                            academicYear={academicYear}
                            unit={unit}
                            classID={classID}

                            // Activites
                            unionJoint={unionJoint}
                            partyJoint={partyJoint}
                            unionPosition={unionPosition}
                            associationPosition={associationPosition}
                            club={club}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Information;
