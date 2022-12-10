import React from 'react';
import {
  Scheduler,
  TimelineView,
  DayView,
  WeekView,
  MonthView,
  AgendaView,
} from "@progress/kendo-react-scheduler";
import "@progress/kendo-theme-default/dist/all.css";
import { useState } from "react";

import { guid } from "@progress/kendo-react-common";

const Schedule = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <LeftDrawer />
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                
            </Box>
        </Box>
    );
};

const compareById = matchingItem => item => matchingItem.id === item.id;

const RoomScheduler = (props) => {
  const [data, setData] = useState([]);

  const onDataChange = ({ created, updated, deleted }) => {
    // Add a unique id to each new item
    const newItemsWithIds = created.map(item => ({
      ...item,
      id: guid(),
    }));

    setData(dataState =>
      dataState.reduce((acc, item) => {
        console.log(data)
        // Skip the item if it was deleted
        if (deleted.find(compareById(item))) return acc;
        // Push the updated item or current item
        acc.push(updated.find(compareById(item)) || item);
        return acc;
      }, newItemsWithIds)
    );
    console.log(data);
  };

  return (
    <div className="k-my-8">
      <div className="k-mb-4 k-font-weight-bold">Book a room</div>
      <Scheduler
        editable
        data={data}
        onDataChange={onDataChange}
        resources={[meetingRooms]}
      >
        <WeekView />
      </Scheduler>
    </div>
  );
};

export default RoomScheduler;