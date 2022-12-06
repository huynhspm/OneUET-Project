import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Basic from './Basic';
import Education from './Education';
import Activities from './Activities';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import dayjs from 'dayjs';

const getUserData = async id => {
    try {
        const response = await axios.get("http://localhost:2002/user/" + String(id));
        return response.data.data;
    } catch (e) {
        console.log(e.response);
    }
}

const Information = () => {
    const id = 1;
    const [userData, setUserData] = React.useState();

    
    // Basic
    const [avatar, setAvatar] = React.useState("https://randomuser.me/api/portraits/women/79.jpg");
    
    const [studentID, setStudentID] = React.useState("20020001");
    const [name, setName] = React.useState("Lương Sơn Bá");
    const [birthday, setBirthday] = React.useState(dayjs('2002-07-08'));
    const [gender, setGender] = React.useState(0);
    const [emailVNU, setEmailVNU] = React.useState("20020001@vnu.edu.vn");
    const [email, setEmail] = React.useState("luongsonba270@gmail.com");
    
    // Education
    const [program, setProgram] = React.useState(0);
    const [academicYear, setAcademicYear] = React.useState(0);
    const [unit, setUnit] = React.useState(0);
    const [classID, setClassID] = React.useState(2);
    
    // Activites
    const [doanVien, setDoanVien] = React.useState(true);
    const [dangVien, setDangVien] = React.useState(false);
    const [positionDoan, setPositionDoan] = React.useState("Phó Bí thư Chi đoàn K65CCLC");
    const [positionHoi, setPositionHoi] = React.useState("Uỷ viên Ban chấp hành Hội Sinh viên Trường");
    const [club, setClub] = React.useState([]);
    
    useEffect(() => {
        getUserData(id).then(value => {console.log(value); setUserData(value);});
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
                            studentID={studentID}
                            setStudentID={setStudentID}
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
                            doanVien={doanVien}
                            setDoanVien={setDoanVien}
                            dangVien={dangVien}
                            setDangVien={setDangVien}
                            positionDoan={positionDoan}
                            setPositionDoan={setPositionDoan}
                            positionHoi={positionHoi}
                            setPositionHoi={setPositionHoi}
                            club={club}
                            setClub={setClub}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Information;