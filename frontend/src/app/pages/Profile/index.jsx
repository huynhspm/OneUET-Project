import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Divider } from '@mui/material';
import Header from '../../containers/Header';
import Box from '@mui/material/Box';
import LeftDrawer from '../../components/LeftDrawer';
import Information from './Information';
import Schedule from './Schedule';
import Grade from '../Grade';
import Main from './PrivateDocument/Main' 
import ChangePassword from './ChangePassword';

const drawerWidth = 210;

const Profile = (props) => {
    const { type } = useParams();

    const navigate = useNavigate();
    const [token, setToken] = useState('');
    useEffect(() => {
        if (token === '') {
          const lastToken = sessionStorage.getItem("token");
          if (lastToken !== null && lastToken !== undefined) {
            // console.log(lastToken);
            setToken(lastToken);
          } else {
            navigate('/login');
          }
        }
      }, [token, navigate]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <LeftDrawer location={props.location} />
                {/* {type === 'private-document' && <FilterSidebar filterData={filterData} />} */}
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Divider />
                {type === 'information' && <Information token={token} />}
                {type === 'schedule' && <Schedule />}
                {type === 'learning-result' && <Grade />}
                {type === 'private-document' && <Main />}
                {type === 'change-password' && <ChangePassword token={token} />}
                {type === 'login' && <Header />}
            </Box>
        </Box>
    );
};

export default Profile;