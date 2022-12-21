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
  const [semester, setSemester] = React.useState("2020-2021");
  const [year, setYear] = React.useState("Học kỳ 1");
  const [valueSearch, setValueSearch] = React.useState("");

  const navigate = useNavigate();

  // user token
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZUlkIjoxLCJpYXQiOjE2NzA0ODk2ODEsImV4cCI6MTY3MzA4MTY4MX0.rSseHQSrXVyf_PyY3WAIoU07AKavd3-XP-RIXgXRgr4"
  );

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
    // getToken();
  }, [navigate, token]);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      await axios
        .get(api_url + "/api/document", {
          params: {
            status: "pending",
          },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          let docs = res.data.data.documents;
          console.log(res);
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
        }}>
        <Box>
          <SearchIcon sx={{ color: "action.active", mt: 7, fontSize: 40 }} />
          <TextField
            sx={{ m: 6.1, ml: 1, width: 700 }}
            id="search"
            label="Tìm kiếm môn học"
            type="search"
            onChange={(event) => {
              setValueSearch(event.target.value);
              console.log(event.target.value);
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
                if (event.target.value == 10) setYear("2020 - 2021");
                else setYear("2021 - 2022");
                console.log(year);
              }}
              inputProps={{
                name: "age",
                id: "year",
              }}>
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
                if (event.target.value == 10) setSemester("Học kỳ 1");
                else setSemester("Học kỳ 2");
                console.log(semester);
              }}
              inputProps={{
                name: "semester",
                id: "uncontrolled-native",
              }}>
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
            onClick={async () => {
              console.log(semester, year, valueSearch);
            }}>
            Tìm kiếm
          </Button>
        </Box>
      </div>

      <Button
        sx={{
          width: "100%", height: "7vh", mt: 2, backgroundColor: "#FFA69E", '&:hover': {
            backgroundColor: "#DFA8BB",
          }
        }}
        variant="contained"
        onClick={async () => {
          navigate("/courses", {
            state: { linkPDF: "sssss" },
          });
        }}>
        Lập trình hướng đối tượng (INT3301)
      </Button>
      <Button
        sx={{
          width: "100%", height: "7vh", mt: 2, backgroundColor: "#FFA69E", '&:hover': {
            backgroundColor: "#DFA8BB",
          }
        }}
        variant="contained"
        onClick={async () => {
          navigate("/courses", {
            state: { linkPDF: "sssss" },
          });
        }}>
        Cấu trúc dữ liệu và giải thuật (INT3304)
      </Button>
      <Button
        sx={{
          width: "100%", height: "7vh", mt: 2, backgroundColor: "#FFA69E", '&:hover': {
            backgroundColor: "#DFA8BB",
          }
        }}
        variant="contained"
        onClick={async () => {
          navigate("/courses", {
            state: { linkPDF: "sssss" },
          });
        }}>
        Kiến trúc máy tính (INT3002)
      </Button>
      <Button
        sx={{
          width: "100%", height: "7vh", mt: 2, backgroundColor: "#FFA69E", '&:hover': {
            backgroundColor: "#DFA8BB",
          }
        }}
        variant="contained"
        onClick={async () => {
          navigate("/courses", {
            state: { linkPDF: "sssss" },
          });
        }}>
        Nguyên lý hệ điều hành (INT3203)
      </Button>
    </div>
  );
}
