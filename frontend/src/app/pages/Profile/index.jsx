import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Divider } from '@mui/material';
import Header from '../../containers/Header';
import Box from '@mui/material/Box';
import LeftDrawer from '../../components/LeftDrawer';
import Information from './Information';
import Schedule from './Schedule';
import Grade from '../Grade';
import PrivateDocument from './PrivateDocument';
import FilterSidebar from '../../components/FilterSidebar';
import { units } from '../../utils/constant';

const drawerWidth = 240;

const Profile = (props) => {
    const { type } = useParams();

    const filterData = {
        Khoa: units,
        Ngành: ['Công nghệ thông tin', 'Khoa học máy tính', 'Send email', 'Drafts']
    }

    const navigate = useNavigate();
    useEffect(() => {
        // console.log(props.token);
        if (props.token == '') {
            navigate('/login');
        }
    }, [props.token]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <LeftDrawer />
                {type === 'private-document' && <FilterSidebar filterData={filterData} />}
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Divider />
                {type === 'information' && <Information token={props.token} />}
                {type === 'schedule' && <Schedule />}
                {type === 'learning-result' && <Grade />}
                {type === 'private-document' && <PrivateDocument />}
                {type === 'change-password' && <Header />}
                {type === 'login' && <Header />}
            </Box>
        </Box>
    );
};

export default Profile;