import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import "./main.css";

import { Cancel, Done, LocalOfferOutlined } from "@mui/icons-material";
const Main = (props) => {
  const { link } = props;
  return (
    <div className="main-container" style={{ margin: "auto" }}>
      {console.log(link)}
      <img src={link} alt="" />
      {link && (
        <List
          className="main-action"
          spacing={2}
          justifyContent="space-between"
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Done />
              </ListItemIcon>
              <ListItemText primary="Check" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Cancel />
              </ListItemIcon>
              <ListItemText primary="Cancel" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocalOfferOutlined />
              </ListItemIcon>
              <ListItemText primary="Add tags" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </div>
  );
};

export default Main;
