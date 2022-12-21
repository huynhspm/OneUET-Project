import { useState, useRef } from 'react';
import preprocessImage from './preprocess';
import Tesseract from 'tesseract.js';
import './styles.css';
import { InputBox, InputButton } from '../../utils/styles';
import { Box, Button, MenuItem, Typography, FormControl, InputLabel, Select } from '@mui/material';
import ConvertApi from 'convertapi-js'
import { useNavigate } from 'react-router-dom';
import { controlValue } from '../../utils/function';
import { refreshPage } from '../../utils/function';

const typeMap = {
	"png": ["jpg", "svg", "pdf"],
	"jpg": ["png", "svg", "pdf"],
	"doc": ["docx", "html", "jpg", "pdf", "xml"],
	"docx": ["html", "pdf", "jpg", "png"],
	"xlsx": ["html", "pdf", "jpg", "png", "csv"],
	"pptx": ["jpg", "png", "pdf"],
	"pdf": ["jpg", "txt", "png", "csv"]
}

const Convert = () => {

	const [file, setFile] = useState('UPLOAD FILE');
	const [link, setLink] = useState(null);

	const [from, setFrom] = useState(null)
	const [to, setTo] = useState(null)

	const api = "https://v2.convertapi.com/d/"
	let fileId;
	let fileName;

	const convert = async (event) => {
		let convertApi = ConvertApi.auth('8lVPmnUYpb4Ob5Sr');
		let params = convertApi.createParams()
		params.add('File', event.target.files[0]);
		let result = await convertApi.convert(from, to, params);
		return result;
	}

	const handleFile = async (event) => {
		setFile(event.target.files[0].name);
		try {
			await convert(event).then((res) => {
				fileId = res.files[0].FileId;
				fileName = res.files[0].FileName;
				let url = res.files[0].Url;
				setLink(api + fileId + "/" + encodeURIComponent(fileName));
			})
		} catch(e) {
			console.log(e);
		}
	}

	return (
		<> 
			<Box sx={{mt: 3, mb: 40, mr:50, ml:50}}>
				<Box sx={{display: 'flex', flexDirection: 'row'}}>
					<FormControl fullWidth sx={{m:3}}>
						<InputLabel id="id-From">From</InputLabel>
						<Select
							labelId="id-from"
							id="id-from"
							value={controlValue(from)}
							label="Age"
							onChange={(event) => {setFrom(event.target.value)}}
						>
							{Object.keys(typeMap).map((from, index) => (
								<MenuItem key={index} value={from}> {from} </MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl fullWidth sx={{m:3}}>
						<InputLabel id="id-To">To</InputLabel>
						<Select
							labelId="id-To"
							id="id-To"
							value={controlValue(to)}
							label="Age"
							disabled={(from === null)}
							onChange={(event) => {setTo(event.target.value)}}

						>	
							{from !== null && Object.keys(typeMap[from]).map((id, index) => (
								<MenuItem key={index} value={typeMap[from][id]}> {typeMap[from][id]} </MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box sx={{display: 'flex', flexDirection: 'row'}}>
					<InputButton
						variant="outlined"
						component="label"
						fullWidth
						disabled={(to === null)}
						sx={{ m: 3 }}
					>
						<Typography variant='h6'>
							{file}
						</Typography>
						<input
							type="file"
							hidden
							onChange={handleFile} />
					</InputButton>
					<InputButton
						variant="outlined"
						fullWidth
						sx={{ m: 3 }}
						disabled={(link === null)}
						href={link}
						onClick={() => {refreshPage();}}
					>
						<Typography variant='h6'>
							DOWNLOAD
						</Typography>
					</InputButton>
				</Box>
			</Box>
		</>
	);
}

export default Convert;
