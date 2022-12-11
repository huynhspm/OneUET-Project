import React, { startTransition } from 'react';
import {
  Scheduler,
  TimelineView,
  DayView,
  WeekView,
  MonthView,
  AgendaView,
} from "@progress/kendo-react-scheduler";
import "@progress/kendo-theme-default/dist/all.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { guid } from "@progress/kendo-react-common";
import { sectionMap } from '../../../utils/constant';

const meetingRooms = {
  name: "Meeting Room",
  data: [
    {
      text: "Blue room",
      value: 1,
      color: "blue",
    },
    {
      text: "Red room",
      value: 2,
      color: "red",
    },
    {
      text: "Green room",
      value: 3,
      color: "green",
    },
  ],
  field: "RoomID",
  valueField: "value",
  textField: "text",
  colorField: "color",
};

const compareById = matchingItem => item => matchingItem.id === item.id;

const RoomScheduler = (props) => {
  const [data, setData] = useState([]);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2ODU2LCJleHAiOjE2NzMwMjg4NTZ9.2G84rwn7b1FcD60TAbxcljmTylOZJ4VXz2Y932g55bo'
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios
        .get("http://localhost:2002/student/1", config)
        .then((res) => {
          let classes = res.data.data.classes;
          let tmp_data = []
          console.log(res);
          for (let index in classes) {
            console.log(classes[index]);
            let sections = classes[index].section.split("-");
            tmp_data.push({
              "id": classes[index].id,
              "start": new Date("2022-12-05T" + sectionMap[sections[0]]),
              "end": new Date("2022-12-05T" + sectionMap[parseInt(sections[1]) + 1]),
              "isAllDay": false,
              "title": classes[index].code,
              "RoomID": undefined
            });
            // setData(tmp_data);
            console.log(tmp_data);
          }
          setData(tmp_data);
        });
    } catch (e) {
      console.log(e.response.data);
    }
  }

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
        // editable
        data={data}
        // onDataChange={onDataChange}
        // resources={[meetingRooms]}
      >
        <WeekView />
        <DayView />
      </Scheduler>
    </div>
  );
};

export default RoomScheduler;