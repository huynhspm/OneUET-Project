import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import './styles.css'

const DocumentCard = (props) => {
    // props have height, title, description, src_img, link (link to web see document)
    return (
        <>
            <Card className="doc_card">
                <CardMedia
                    component="img"
                    height={props.height}
                    image={props.src_img}
                    alt="sorry about error"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link className="btn" to={props.link}><RemoveRedEyeIcon />Xem tài liệu</Link>
                </CardActions>
            </Card>
        </>
    )
}
export default DocumentCard;

