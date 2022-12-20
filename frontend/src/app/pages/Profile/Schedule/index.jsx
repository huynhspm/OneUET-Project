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

import { api_url, sectionMap } from '../../../utils/config';
import { Button } from '@mui/material';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { useNavigate } from "react-router-dom";

const compareById = (matchingItem) => (item) => matchingItem.id === item.id;

const RoomScheduler = (props) => {
  const [data, setData] = useState([]);
  
  const navigate = useNavigate();

	// user token
	const [token, setToken] = useState('');

	// fetch user token
	const getToken = (() => {
		if (token === '') {
			const lastToken = sessionStorage.getItem("token");
			if (lastToken !== null && lastToken !== undefined) {
				setToken(lastToken);
			} else {
				navigate('/login');
			}
		}
	})

  useEffect(() => {
		getToken();
	}, [navigate, token]);


  
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (token !== '') {
      fetchData();
    }
  }, [token]);

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

  const fetchData = async () => {
    try {
      await axios.get(api_url + "/student/1", config).then((res) => {
        let classes = res.data.data.classes;
        let tmp_data = [];
        console.log(res);
        for (let index in classes) {
          console.log(classes[index]);
          let sections = classes[index].section.split("-");
          let semesters = extractSemester(classes[index].semester);
          console.log(semesters);
          tmp_data.push({
            id: classes[index].id,
            start: new Date(semesters.start + sectionMap[sections[0]]),
            end: new Date(
              semesters.start + sectionMap[parseInt(sections[1]) + 1]
            ),
            isAllDay: false,
            recurrenceRule: "FREQ=WEEKLY;BYDAY=TU;WKST=TU;COUNT=15",
            recurrenceExceptions: [],
            title: classes[index].code,
            RoomID: undefined,
          });
          // setData(tmp_data);
          console.log(tmp_data);
        }
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
        console.log(data);
        // Skip the item if it was deleted
        if (deleted.find(compareById(item))) return acc;
        // Push the updated item or current item
        acc.push(updated.find(compareById(item)) || item);
        return acc;
      }, newItemsWithIds)
    );
    console.log(data);
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
