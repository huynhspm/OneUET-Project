import { Box, Divider, Typography, Button } from '@mui/material';
import Tags from '../../../components/Tags';
import CommentPost from '../../../components/Comment/Post';
import CommentContent from '../../../components/Comment/Content';
import OptionsDialog from '../../../components/OpitonsDialog';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import "../../../utils/styles.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';

const DocumentView = (props) => {

    // let t1 = "https://docs.google.com/viewer?srcid=";
    // let t2 = "&pid=explorer&efh=false&a=v&chrome=false&embedded=true";
    // const pdf_link = t1.concat(String(props.id), t2);
    const [showOptionsDialog, setShowOptionsDialog] = useState(false);

    const [pdf_link, set_pdf_link] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [tags, setTags] = useState([]);
    const [dateUploaded, setDateUploaded] = useState();
    const [comments, setComments] = useState([])
    const docId = props.id;

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2ODU2LCJleHAiOjE2NzMwMjg4NTZ9.2G84rwn7b1FcD60TAbxcljmTylOZJ4VXz2Y932g55bo'
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await axios
                .get("http://localhost:2002/document/public/" + String(props.id), config)
                .then((res) => {
                    let data = res.data.data;
                    console.log(data);
                    set_pdf_link(data.file.link);
                    setName(data.document.name);
                    setDescription(data.document.description);
                    setTags([
                        data.document.unit,
                        data.document.major,
                        data.course.name,
                        data.document.category,
                        data.document.year,
                    ]);
                    let tmp_comments = []
                    for (let property in data.comments) {
                        tmp_comments.push(data.comments[property]);
                    }

                    setComments(tmp_comments);
                    setDateUploaded(data.document.updatedAt);
                });
        } catch (e) {
            console.log(e.response.data);
        }
    }

    return (
        <>
            <Box p={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" color="black" textAlign="left">
                        {name}
                    </Typography>
                    <Button onClick={() => setShowOptionsDialog(true)} sx={{ position: 'absolute', right: 24, }}> <MoreVertIcon fontSize='large' /> </Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box
                        sx={{
                            pt: 1,
                            position: 'relative',
                            width: 'calc(60%)',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <iframe src={pdf_link} height='700vh' />
                    </Box>
                    <Box
                        sx={{ flexGrow: 1, pl: 2, pt: 1, position: 'relative' }}
                    >
                        <Typography>
                            {description}
                        </Typography>
                        <Divider sx={{ p: 1, m: 1 }} />
                        <Tags data={tags} />
                        <Typography color="textSecondary" className="datePosted" sx={{ pt: 1 }}>
                            {dateUploaded}
                        </Typography>
                        <Divider />
                        <CommentContent comments={comments} />
                        <Box sx={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%'
                        }}>
                            <Divider />
                            <CommentPost docId={docId} onClick={() => fetchData()} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            {showOptionsDialog && (
                <OptionsDialog documentID={props.id} onClose={() => setShowOptionsDialog(false)} />
            )}
        </>
    );
};

export default DocumentView;