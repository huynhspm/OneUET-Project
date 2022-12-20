import * as React from 'react';
import {TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  weight: 10,
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CustomizedSelects() {
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
    <div style={{ 
      display: 'flex',
      justifyContent: 'space-around',
      margin: '30px',
      // height: '100vh'
    }}>
      <Box>
        <SearchIcon sx={{ color: 'action.active', mt: 7, fontSize: 40 }} />
        <TextField sx={{ m: 6.1, ml: 1,  width: 700}} id="earch" label="Tìm kiếm môn học" type="search" />
      </Box>
      {/* Năm học */}

      <FormControl sx={{ m: 6.1}}>
        <InputLabel id="year">Năm học:</InputLabel>
        <NativeSelect
          input={<OutlinedInput label="Năm học" />}
          defaultValue={10}
          inputProps={{
            name: 'age',
            id: 'year',
          }}
        >
          <option value={10}>2020 - 2021</option>
          <option value={20}>2021 - 2022</option>
        </NativeSelect>
      </FormControl>
      
      {/* Học kỳ */}

      <FormControl sx={{ m: 6.1}}>
        <InputLabel htmlFor="semester">
          Học kỳ:
        </InputLabel>
        <NativeSelect
          input={<OutlinedInput label="Học kỳ:" />}
          defaultValue={10}
          inputProps={{
            name: 'semester',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>Học kỳ I</option>
          <option value={20}>Học kỳ II</option>
        </NativeSelect>
      </FormControl>
    </div>

      <Button sx={{ width: '100%', height: '7vh', mt: 2}}
          variant="contained"
          onClick={async () => {
          }}>
        Lập trình hướng đối tượng (INT3301)
    </Button>
    </>
  );
}
