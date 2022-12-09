// import { AccountBox, Dashboard, Home, Web } from "@mui/icons-material";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Sidebar = (props) => {
  const { listSideBar, handleOnClickSidebar } = props;
  return (
    <Box p={2}>
      {/* <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Giáo trình xử lý ảnh" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Giáo trình xử lý Web" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Web />
            </ListItemIcon>
            <ListItemText primary="Giáo trình xử lý ảnh" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Giáo trình xử lý Web" />
          </ListItemButton>
        </ListItem>
      </List> */}
      <List>
        {listSideBar.map((item) => {
          return (
            <div onClick={() => handleOnClickSidebar(item)}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </div>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
