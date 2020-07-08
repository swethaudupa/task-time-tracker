import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import "./TimePicker.css";
import { GET_TAG_BY_ID } from "../../graphQL/Queries";
import * as moment from "moment";

function TimePicker({ id, onSaveTime, client }) {
  const [time, setTime] = useState([0, 0, 0]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    /*
      on component did mount, get the current time and
      subtract it from the end time of the task to show
      the last seen time.
      if the current time is greater than end time,
      show the task as completeds
    */
    const currentTime = moment();

    client
      .query({
        query: GET_TAG_BY_ID,
        variables: {
          id: id,
        },
      })
      .then(async (result) => {
        const { tasks_by_pk } = result.data;
        if (tasks_by_pk.end_time !== null) {
          const endTime = moment(tasks_by_pk.end_time);

          if (currentTime.isAfter(endTime)) {
            setTime([0, 0, 0]);
            setShowCompleted(true);
          } else {
            var duration = moment.duration(endTime.diff(currentTime));
            //Get hours and subtract from duration
            const hours = duration.hours();
            //Get Minutes and subtract from duration
            const minutes = duration.minutes();
            //Get seconds
            const seconds = duration.seconds();
            setTime([hours, minutes, seconds]);
          }
        } else {
          setTime([0, 0, 0]);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const onTimeChange = (e) => {
    /*
      on time change, set hour minute second in 
      component state in ['H', 'M', 'S'] format
    */
    const type = e.target.name;
    if (type === "hrs") {
      const h = +e.target.value;
      setTime([h, time[1], time[2]]);
    }
    if (type === "min") {
      const m = +e.target.value;
      setTime([time[0], m, time[2]]);
    }
    if (type === "sec") {
      const s = +e.target.value;
      setTime([time[0], time[1], s]);
    }
  };

  return (
    <div className="timeInputWrapper">
      {showCompleted ? (
        <div>Completed</div>
      ) : (
        <>
          <input
            className="timeInput"
            type="number"
            name="hrs"
            value={time[0] || ""}
            placeholder="H"
            onChange={onTimeChange}
          />
          <input
            className="timeInput"
            type="number"
            name="min"
            value={time[1] || ""}
            placeholder="M"
            onChange={onTimeChange}
          />
          <input
            className="timeInput"
            type="number"
            name="sec"
            value={time[2] || ""}
            placeholder="S"
            onChange={onTimeChange}
          />
        </>
      )}
      <FontAwesomeIcon icon={faPlay} onClick={() => onSaveTime(time, id)} />
    </div>
  );
}

export default TimePicker;
