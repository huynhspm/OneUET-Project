import React, { useRef } from "react";
import {
  Scheduler,
  SchedulerItem,
  TimelineView,
  DayView,
  WeekView,
  MonthView,
  AgendaView,
} from "@progress/kendo-react-scheduler";
import styled from 'styled-components'
import "@progress/kendo-theme-default/dist/all.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { guid } from "@progress/kendo-react-common";
import Button from '@mui/material/Button';
import { sectionMap } from '../../../utils/config';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import "./styles.css"

const compareById = (matchingItem) => (item) => matchingItem.id === item.id;

const CustomScheduler = styled(Scheduler)`
    .k-scheduler-layout-flex .k-scheduler-cell {
      min-height: 90px;
    }
`;
const NeatScheduler = styled(Scheduler)`
    .k-scheduler-layout-flex .k-scheduler-cell {
      min-height: 30px;
    }
`;

const RoomScheduler = (props) => {
  const [data, setData] = useState([]);
  const [isNeat, setIsNeat] = useState(false);
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
    let sem_index = parseInt(semesters[2]) - 1;
    return {
      start: String(parseInt(semesters[sem_index]) + 1) + sems[sem_index][0],
      end: String(parseInt(semesters[sem_index]) + 1) + sems[sem_index][1],
    };
  }

  const CustomItem = (props) => {
    // console.log(props.dataItem.title)
    let title = props.dataItem.title
    let titles = title.split("<br>")
    let newProps = Object.assign({}, props);

    const childrens = titles.map((val, index) => {
      if (index === 0) return <div className="titleScheduleItem">{val}</div>
      if (isNeat === false) {
        let vals = val.split("<space>")
        return <div><strong>{vals[0]}</strong>{vals[1]}</div>
      }
    });

    newProps.children = <div>{childrens}</div>
    return (
      <SchedulerItem
        {...newProps}
        style={{
          ...newProps.style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFA69E",
          color: "black",
        }}
      />)
  };


  function convertDayOfWeek(dayNumber) {
    if (dayNumber === "2") return "MO"
    if (dayNumber === "3") return "TU"
    if (dayNumber === "4") return "WE"
    if (dayNumber === "5") return "TH"
    if (dayNumber === "6") return "FR"
    if (dayNumber === "7") return "SA"
    if (dayNumber === "CN") return "SU"
  }

  const fetchData = async () => {
    try {
      console.log(config);

      await axios.get("http://localhost:2002/api/user/me", config).then((res) => {
        let classes = res.data.data.classes.studyingClasses;
        let tmp_data = [];
        for (let index in classes) {
          console.log(classes.length, classes[index]);
          if (classes[index].section === null || classes[index].classroom === null)
            continue
          let sections = classes[index].section.split("-");
          let semesters = extractSemester(classes[index].semester);
          let classroom = classes[index].classroom;
          let group = classes[index].group;
          let dayOfWeek = convertDayOfWeek(classes[index].dayOfWeek)
          let nameTeacher = ""
          for (let j in classes[index].teachers) {
            nameTeacher += classes[index].teachers[j].name
          }


          tmp_data.push({
            id: classes[index].id,
            start: new Date(semesters.start + sectionMap[sections[0]]),
            end: new Date(
              semesters.start + sectionMap[parseInt(sections[1]) + 1]
            ),
            isAllDay: false,
            recurrenceRule: "FREQ=WEEKLY;BYDAY=" + dayOfWeek + ";COUNT=20",
            recurrenceExceptions: [],
            title: classes[index].course.name + "<br>" + "Mã lớp: <space>" + classes[index].code + "<br>" + "Giảng đường: <space>" + classroom + "<br>" + "Nhóm: <space>" + group + "<br>" + "Giảng viên: <space>" + nameTeacher,
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

  const handleNeatSchedule = () => {
    setIsNeat(!isNeat)
  }

  return (
    <div className="k-my-8">
      <Button onClick={handleExportWithComponent}>EXPORT SCHEDULE</Button>
      <Button onClick={handleNeatSchedule}>{isNeat === true ? "FULL INFORMATION" : "COMPACT INFORMATION"}</Button>
      <PDFExport ref={pdfExportComponent} papersize="A4">
        {isNeat === false ?
          (
            <CustomScheduler
              data={data}
              onDataChange={onDataChange}
              height={100 * 15}
              defaultView="week"
              item={CustomItem}
            >

              <WeekView workDayStart={"07:00"} workDayEnd={"19:00"} slotDivisions={1} currentTimeMarker={false}/>
            </CustomScheduler>
          ) : (
            <NeatScheduler
              data={data}
              onDataChange={onDataChange}
              height={50 * 15}
              defaultView="week"
              item={CustomItem}
            >

              <WeekView workDayStart={"07:00"} workDayEnd={"19:00"} slotDivisions={1} currentTimeMarker={false}/>
            </NeatScheduler>
          )}
      </PDFExport>
    </div>
  );
};

export default RoomScheduler;
