import React, { useState, useEffect } from 'react';
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

const getClubList = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const res = await axios.get(api_url + "/api/club", config);
        return res.data.data.clubs;
    } catch (e) {
        console.log(e.response.data);
    }
}

const updateUserData = async (token, data) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    console.log(data);
    try {
        const response = await axios.put(api_url + "/api/user/me", data, config);
        console.log(response.data);
    } catch (e) {
        console.log(e.response);
    }
}

const Information = (props) => {
    // Basic
    const [avatar, setAvatar] = useState("https://randomuser.me/api/portraits/women/79.jpg");

    const [code, setCode] = useState(null);
    const [name, setName] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [gender, setGender] = useState(null);
    const [emailVNU, setEmailVNU] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);

    // Education
    const [program, setProgram] = useState(null);
    const [academicYear, setAcademicYear] = useState(null);
    const [unit, setUnit] = useState(null);
    const [classID, setClassID] = useState(null);
    const [clubsList, setClubsList] = useState([]);

    // Activites
    const [unionJoint, setUnionJoint] = useState(null);
    const [partyJoint, setPartyJoint] = useState(null);
    const [unionPosition, setUnionPosition] = useState(null);
    const [associationPosition, setAssociationPosition] = useState(null);
    const [club, setClub] = useState([]);

    useEffect(() => {
        if (props.token !== "" && props.token !== null && props.token !== undefined) {
            getClubList(props.token).then((value) => {
                if (clubsList.length === 0) {
                    for (let i = 0; i < value.length; i++) {
                        clubsList.push(value[i].name);
                    }
                }
            })
        }
    }, [props.token]);

    useEffect(() => {
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
            });
        }
    }, [props.token]);

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
                            clubsList={clubsList}
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
                            clubsList={clubsList}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Information;
