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
	const [jpgFile, setJpgFile] = useState('UPLOAD .JPG FILE');
	const [pngFile, setPngFile] = useState('UPLOAD .PNG FILE');
	
	const [linkDocxFile, setLinkDocxFile] = useState(null);
	const [linkJpgFile, setLinkJpgFile] = useState(null);
	const [linkPngFile, setLinkPngFile] = useState(null);


	const api = "https://v2.convertapi.com/d/"
	let fileId;
	let fileName;

	const docxToPdf = async (event) => {
		let convertApi = ConvertApi.auth('8lVPmnUYpb4Ob5Sr');
		let params = convertApi.createParams()
		params.add('File', event.target.files[0]);
		let result = await convertApi.convert('docx', 'pdf', params)
		return result;
	}
	
	const jpgToPdf = async (event) => {
		let convertApi = ConvertApi.auth('8lVPmnUYpb4Ob5Sr');
		let params = convertApi.createParams()
		params.add('File', event.target.files[0]);
		let result = await convertApi.convert('jpg', 'pdf', params)
		return result;
	}
	
	const pngToPdf = async (event) => {
		let convertApi = ConvertApi.auth('8lVPmnUYpb4Ob5Sr');
		let params = convertApi.createParams()
		params.add('File', event.target.files[0]);
		let result = await convertApi.convert('png', 'pdf', params)
		return result;
	}

	const handleDocxFile = async (event) => {
		setDocxFile(event.target.files[0].name);
		try {
			await docxToPdf(event).then((res) => {
				fileId = res.files[0].FileId;
				fileName = res.files[0].FileName;
				let url = res.files[0].Url;
				setLinkDocxFile(api + fileId + "/" + encodeURIComponent(fileName));
			})
		} catch (e) {
			console.log(e);
		}
	}

	const handleJpgFile = async (event) => {
		setJpgFile(event.target.files[0].name);
		try {
			await jpgToPdf(event).then((res) => {
				fileId = res.files[0].FileId;
				fileName = res.files[0].FileName;
				let url = res.files[0].Url;
				setLinkJpgFile(api + fileId + "/" + encodeURIComponent(fileName));
			})
		} catch (e) {
			console.log(e);
		}
	}

	const handlePngFile = async (event) => {
		setPngFile(event.target.files[0].name);
		try {
			await pngToPdf(event).then((res) => {
				fileId = res.files[0].FileId;
				fileName = res.files[0].FileName;
				let url = res.files[0].Url;
				setLinkPngFile(api + fileId + "/" + encodeURIComponent(fileName));
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
				<InputButton
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
				</InputButton>
				<InputButton
					variant="outlined"
					fullWidth
					sx={{ m: 3 }}
					disabled={(linkDocxFile === null)}
					href={linkDocxFile}
				>
					<Typography variant='h6'>
						DOWNLOAD FILE PDF
					</Typography>
				</InputButton>
			</Box>
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'row',
				justifyContent: 'center',
			}}>
				<InputButton
					variant="outlined"
					component="label"
					fullWidth
					sx={{ m: 3 }}
				>
					<Typography variant='h6'>
						{jpgFile}
					</Typography>
					<input
						type="file"
						hidden
						onChange={handleJpgFile} />
				</InputButton>
				<InputButton
					variant="outlined"
					fullWidth
					sx={{ m: 3 }}
					disabled={(linkJpgFile === null)}
					href={linkJpgFile}
				>
					<Typography variant='h6'>
						DOWNLOAD FILE PDF
					</Typography>
				</InputButton>
			</ Box>
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'row',
				justifyContent: 'center',
			}}>
				
				<InputButton
					variant="outlined"
					component="label"
					fullWidth
					sx={{ m: 3 }}
				>
					<Typography variant='h6'>
						{pngFile}
					</Typography>
					<input
						type="file"
						hidden
						onChange={handlePngFile} />
				</InputButton>
				<InputButton
					variant="outlined"
					fullWidth
					sx={{ m: 3 }}
					disabled={(linkPngFile === null)}
					href={linkPngFile}
				>
					<Typography variant='h6'>
						DOWNLOAD FILE PDF
					</Typography>
				</InputButton>
			</ Box>
		</>
	);
}

export default Convert;
