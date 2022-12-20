import { Assignment, Cancel, CheckCircle, Grade } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2ODU2LCJleHAiOjE2NzMwMjg4NTZ9.2G84rwn7b1FcD60TAbxcljmTylOZJ4VXz2Y932g55bo";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios
        .get("http://localhost:2002/api/document/public", config)
        .then((res) => {
          let docs = res.data.data.documents;
          console.log(docs);
          let tmp = [];
          for (let index in docs) {
            tmp.push(docs[index].id); //docs[index].id
          }
          console.log(tmp);
        });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <Box p={2}>
      <List>
        <CardActions disableSpacing>
          <List>
            <StyledModal
              open={open}
              onClose={(e) => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                width={1000}
                height={800}
                bgcolor="white"
                p={3}
                borderRadius={5}
              >
                <Typography variant="h3" color={"#0099FF"} textAlign="center">
                  {" "}
                  Documents
                </Typography>
                <Card>
                  <CardContent sx={{ maxHeight: 70 }}>
                    <Typography sx={{ display: "flex" }} variant="h5">
                      Description:
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      sx={{
                        width: "500px",
                      }}
                    >
                      Approved
                      <CheckCircle />
                    </Button>
                    <Button variant="contained" sx={{ width: "500px" }}>
                      Cancel
                      <Cancel />
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            </StyledModal>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#home">
                <ListItemIcon>
                  <Grade />
                </ListItemIcon>
                <ListItemText primary="Grade" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={(e) => setOpen(true)}>
              <ListItemButton component="a" href="#home">
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary="Documents" />
              </ListItemButton>
            </ListItem>
          </List>
        </CardActions>
      </List>
    </Box>
  );
};

export default Sidebar;
