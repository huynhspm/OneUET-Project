import React, { startTransition, useRef } from "react";
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
import axios from "axios";
import { guid } from "@progress/kendo-react-common";

import { sectionMap } from '../../../utils/config';
import { Button } from '@mui/material';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';


const compareById = (matchingItem) => (item) => matchingItem.id === item.id;
const rand = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]

const RoomScheduler = (props) => {
  const [data, setData] = useState([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoyLCJpYXQiOjE2NzA0ODk2NDgsImV4cCI6MTY3MzA4MTY0OH0.kKVgxO566QaVpvGbqtKBmr_I_Sl8RSlEk8Nhr-GWM74";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    fetchData();
  }, []);

  function extractSemester(semester) {
    let semesters = semester.split("-");
    let sems = [
      ["-08-29T", "-11-12T"],
      ["-01-30T", "-05-14T"],
    ];
    console.log("AAA", semesters)
    let sem_index = parseInt(semesters[2]) - 1;
    return {
      start: String(parseInt(semesters[sem_index]) + 1) + sems[sem_index][0],
      end: String(parseInt(semesters[sem_index]) + 1) + sems[sem_index][1],
    };
  }

  function convertDayOfWeek(dayNumber){
    if(dayNumber == "2") return "MO"
    if(dayNumber == "3") return "TU"
    if(dayNumber == "4") return "WE"
    if(dayNumber == "5") return "TH"
    if(dayNumber == "6") return "FR"
    if(dayNumber == "7") return "SA"
    if(dayNumber == "CN") return "SU"
  }

  const fetchData = async () => {
    try {
      console.log(config);

      await axios.get("http://localhost:2002/api/user/me", config).then((res) => {
        let classes = res.data.data.classes.studyingClasses;
        let tmp_data = [];
        for (let index in classes) {
          console.log(classes.length ,classes[index]);
          if(classes[index].section === null || classes[index].classroom === null)
            continue
          let sections = classes[index].section.split("-");
          let semesters = extractSemester(classes[index].semester);
          let classroom = classes[index].classroom;
          let group = classes[index].group;
          let dayOfWeek = rand[index]; // convertDayOfWeek(class[index].dayOfWeek)
          let nameTeacher = classes[index].nameTeacher


          tmp_data.push({
            id: classes[index].id,
            start: new Date(semesters.start + sectionMap[sections[0]]),
            end: new Date(
              semesters.start + sectionMap[parseInt(sections[1]) + 1]
            ),
            isAllDay: false,
            recurrenceRule: "FREQ=WEEKLY;BYDAY=" + dayOfWeek + ";COUNT=15",
            recurrenceExceptions: [],
            title: classes[index].code + "\n" + classroom + "\n" + "Nhóm " + group + "\n" + nameTeacher,
            RoomID: undefined,
          });
        }
        console.log(tmp_data)
        setData(tmp_data);
      });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const onDataChange = ({ created, updated, deleted }) => {
    // Add a unique id to each new item
    const newItemsWithIds = created.map((item) => ({
      ...item,
      id: guid(),
    }));

    setData((dataState) =>
      dataState.reduce((acc, item) => {
        // Skip the item if it was deleted
        if (deleted.find(compareById(item))) return acc;
        // Push the updated item or current item
        acc.push(updated.find(compareById(item)) || item);
        return acc;
      }, newItemsWithIds)
    );
  };

  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };

  return (
    <div className="k-my-8">
      <div className="k-mb-4 k-font-weight-bold">Book a room</div>
      <Button onClick={handleExportWithComponent}>EXPORT SCHEDULE</Button>
      <PDFExport ref={pdfExportComponent} papersize="A4">
        <Scheduler
          // editable
          data={data}
          // onDataChange={onDataChange}
          // resources={[meetingRooms]}
          // height={38*15}
          // footer="false"
          defaultView="week"
        >
          <WeekView startTime={"07:00"} endTime={"19:00"} slotDivisions={1} />
          <DayView />
        </Scheduler>
      </PDFExport>
    </div>
  );
};

export default RoomScheduler;
