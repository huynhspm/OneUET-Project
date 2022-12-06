import React from "react";
import Box from '@mui/material/Box';
import LeftDrawer from "../../../components/LeftDrawer";
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Input } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import Title from '../../../components/Title'
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Image from "mui-image";
import FromGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Pagination from '@mui/material/Pagination';
import HorizontalDocumentList from "../../../components/HorizontalDocumentList";
import Add from "../../../components/Add";
import { useState } from "react";

const drawerWidth = 240;

const PrivateDocument = () => {
    const cards_json = [
        { title: "Du", description: "đẹp trai", src_img: "https://randomuser.me/api/portraits/women/79.jpg", link: "/convert" },
        { title: "Linh", description: "xấu", src_img: "https://randomuser.me/api/portraits/women/78.jpg", link: "/document" },
        { title: "Huỳnh", description: "xấu", src_img: "https://randomuser.me/api/portraits/women/77.jpg", link: "/document" },
        { title: "Bá", description: "xấu", src_img: "https://randomuser.me/api/portraits/women/76.jpg", link: "/document" },
        { title: "Lộc", description: "xấu", src_img: "https://randomuser.me/api/portraits/women/75.jpg", link: "/document" },
        { title: "Hà", description: "xấu", src_img: "https://randomuser.me/api/portraits/women/74.jpg", link: "/document" },
    ];

    const [currentPageRec, setCurrentPageRec] = useState(1)
    const [currentPageSeen, setCurrentPageSeen] = useState(1)

    const onPageChangeRec = (event, value) => {
        setCurrentPageRec(value);
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    <LeftDrawer />
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Divider />
                    {/* <Container maxWidth="lg" sx={{ mt: 2, mg: 2 }}> */}
                    <Box
                        component="div"
                        sx={{ flexGrow: 1, p: 1, m: 1 }}
                    >
                        <div className='flex'>
                            <Pagination className='pagination' count={cards_json.length - 3} color="primary" variant="outlined" shape="rounded" onChange={onPageChangeRec} />
                        </div>
                        <HorizontalDocumentList data={cards_json.slice(currentPageRec - 1, currentPageRec + 3)} height="200px" />
                        <HorizontalDocumentList data={cards_json.slice(currentPageRec - 1, currentPageRec + 3)} height="200px" />
                        <HorizontalDocumentList data={cards_json.slice(currentPageRec - 1, currentPageRec + 3)} height="200px" />
                        <HorizontalDocumentList data={cards_json.slice(currentPageRec - 1, currentPageRec + 3)} height="200px" />
                    </Box>
                </Box>
            </Box>
            <Add></Add>
        </>
    );
};

export default PrivateDocument;
