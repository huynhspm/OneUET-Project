import { useState, useRef } from 'react';
import preprocessImage from './preprocess';
import Tesseract from 'tesseract.js';
import './styles.css';
import { InputBox, InputButton } from '../../utils/styles';
import { Box, Button, Typography } from '@mui/material';
import ConvertApi from 'convertapi-js'
import { useNavigate } from 'react-router-dom';


const Convert = () => {
	const [docxFile, setDocxFile] = useState('UPLOAD .DOCX FILE');
	const [linkDocxFile, setLinkDocxFile] = useState(null);
	const api = "https://v2.convertapi.com/d/"
	let fileId;
	let fileName;

	const docxToPdf = async (event) => {
		let convertApi = ConvertApi.auth('8lVPmnUYpb4Ob5Sr');
		let params = convertApi.createParams()
		params.add('File', event.target.files[0]);
		console.log(event.target.files[0]);
		let result = await convertApi.convert('docx', 'pdf', params)
		console.log(result);
		// let url = result.files[0].Url;
		return result;
	}
	
	const handleDocxFile = async (event) => {
		setDocxFile(event.target.files[0].name);
		try {
			await docxToPdf(event).then((res) => {
				let fileId = res.files[0].FileId;
				let fileName = res.files[0].FileName;
				let url = res.files[0].Url;
				document.getElementById(url).click();
				console.log(res.files[0].Url);
				setLinkDocxFile(api + fileId + "/" + encodeURIComponent(fileName));
			})
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<>
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'row',
				justifyContent: 'center',
			}}>

				<Button
					variant="outlined"
					component="label"
					fullWidth
					sx={{ m: 3 }}
				>
					<Typography variant='h6'>
						{docxFile}
					</Typography>
					<input
						type="file"
						hidden
						onChange={handleDocxFile} />
				</Button>
				<Button
					variant="outlined"
					component="label"
					fullWidth
					sx={{ m: 3 }}
					disabled={(linkDocxFile === null)}
					href={linkDocxFile}
				>
					<Typography variant='h6'>
						DOWNLOAD FILE PDF
					</Typography>
				</Button>
			</Box>
		</>
	);
}

export default Convert;
