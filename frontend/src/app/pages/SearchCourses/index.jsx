import * as React from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api_url, drawerWidth } from "../../utils/config";

export default function CustomizedSelects() {
	const [semester, setSemester] = React.useState("1");
	const [year, setYear] = React.useState("2020-2021");
	const [valueSearch, setValueSearch] = React.useState("");
	const [classes, setClasses] = React.useState([]);

	const navigate = useNavigate();

  // user token
  const [token, setToken] = useState("");

  // fetch user token
  const getToken = () => {
    if (token === "") {
      const lastToken = sessionStorage.getItem("token");
      if (lastToken !== null && lastToken !== undefined) {
        // console.log(lastToken);
        setToken(lastToken);
      } else {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getToken();
  }, [navigate, token]);

	useEffect(() => {
		fetchData();
	}, [semester]);

	const fetchData = async () => {
		let tmp = year + "-" + semester;
		console.log(year, semester);
		try {
			await axios
				.get(api_url + "/api/class", {
					params: {
						code: valueSearch,
						semester: tmp,
					},
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					// let docs = res.data.data.documents;
					console.log(res);
					console.log(res.data.data.classes);
					setClasses(res.data.data.classes);
					console.log("DXXX", classes);
					// return res.data.data.classes;
				});
		} catch (e) {
			console.log(e.response.data);
		}
	};

	return (
		<div style={{ minHeight: window.innerHeight }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					margin: "30px",
				}}
			>
				<Box>
					<SearchIcon sx={{ color: "action.active", mt: 7, fontSize: 40 }} />
					<TextField
						sx={{ m: 6.1, ml: 1, width: 700 }}
						id="search"
						label="Tìm kiếm môn học"
						type="search"
						onChange={(event) => {
							console.log(event.target.value);
							setValueSearch(event.target.value);
						}}
					/>
				</Box>
				{/* Năm học */}

				<Box>
					<FormControl sx={{ m: 6.1 }}>
						<InputLabel id="year">Năm học:</InputLabel>
						<NativeSelect
							input={<OutlinedInput label="Năm học" />}
							defaultValue={10}
							onChange={(event) => {
								if (event.target.value == 10) setYear("2020-2021");
								else setYear("2021-2022");
							}}
							inputProps={{
								name: "year",
								id: "year",
							}}
						>
							<option value={10}>2020 - 2021</option>
							<option value={20}>2021 - 2022</option>
						</NativeSelect>
					</FormControl>
				</Box>
				{/* Học kỳ */}

				<Box>
					<FormControl sx={{ m: 6.1 }}>
						<InputLabel htmlFor="semester">Học kỳ:</InputLabel>
						<NativeSelect
							input={<OutlinedInput label="Học kỳ:" />}
							defaultValue={10}
							onChange={(event) => {
								if (event.target.value == 10) setSemester("1");
								else setSemester("2");
							}}
							inputProps={{
								name: "semester",
								id: "uncontrolled-native",
							}}
						>
							<option value={10}>Học kỳ 1</option>
							<option value={20}>Học kỳ 2</option>
						</NativeSelect>
					</FormControl>
				</Box>
        <Box>
          <Button
            sx={{
              width: 200, height: "7vh", mt: 5, backgroundColor: "#FFA69E", '&:hover': {
                backgroundColor: "#DFA8BB",
              }
            }}
            variant="contained"
            onClick={() => {
              fetchData();
              fetchData();
              console.log(classes);
            }}>
            Tìm kiếm
          </Button>
        </Box>
      </div>
      <Box>
        {classes.length !== 0 &&
          classes.map((id, index) => (
            <Button
              sx={{ width: "100%", height: "7vh", mt: 2 }}
              variant="contained"
              onClick={async () => {
                navigate("/courses", {
                  state: { id: classes[index].id },
                });
              }}>
              {classes[index].code}
            </Button>
          ))}
      </Box>
    </div>);
}
