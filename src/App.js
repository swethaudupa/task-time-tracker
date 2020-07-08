import React, { useState } from "react";
import "./App.css";
import EditableDiv from "./components/editableDiv/EditableDiv";
import Accordion from "./components/accordion/Accordion";
import { Query, ApolloProvider } from "react-apollo";
import { client } from "./_client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faStop } from "@fortawesome/free-solid-svg-icons";
import Timer from "react-compound-timer";
import TimePicker from "./components/timePicker/TimePicker";
import {
  UPDATE_TASK,
  UPDATE_TAG,
  ADD_NEW_TAG,
  ADD_NEW_TASK,
  DELETE_TASK,
  DELETE_TAG,
} from "./graphQL/Mutations";
import * as moment from "moment";
import { GET_TAGS } from "./graphQL/Queries";

const getFormattedTime = (time) => {
  // convert the hours, minutes and seconds in milliseconds
  const [hrs, min, sec] = time;

  return 1000 * (3600 * hrs + 60 * min + sec);
};

function App() {
  const [startTimer, setStartTimer] = useState(null);

  const onDeleteRecord = (id, type, refetch, title) => {
    // on Delete of task/tag, check if it's task or tag and update the server
    if (type === "task") {
      client
        .mutate({
          mutation: DELETE_TASK,
          variables: {
            id: id,
          },
        })
        .then((result) => {
          refetch();
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else if (type === "tag") {
      client
        .mutate({
          mutation: DELETE_TAG,
          variables: {
            id: id,
          },
        })
        .then((result) => {
          refetch();
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const onStartTask = (time, setTime, start, task, refetch) => {
    /*
      on start timer (on click of play button), get the time on timer and 
      add current time to it so that we can show the most recent on refresh
      current time will be the start time in the format supported by server
      current time + time on timer will be saved as end time in the format supported by server
    */
    if (time.filter((t) => t > 0).length === 0) {
      return;
    }
    const formattedTime = getFormattedTime(time);

    setTime(formattedTime);
    start();
    setStartTimer({ [task.id]: true });
    // update task with startTime
    const startTimeStampUnix = moment().valueOf();
    const endTimeStampUnix = startTimeStampUnix + formattedTime;

    const startTime = moment(startTimeStampUnix);
    const endTime = moment(endTimeStampUnix);

    client
      .mutate({
        mutation: UPDATE_TASK,
        variables: {
          id: task.id,
          start_time: startTime.utc().format("YYYY-MM-DDTHH:mm:ssZ"),
          end_time: endTime.utc().format("YYYY-MM-DDTHH:mm:ssZ"),
          title: task.title,
        },
      })
      .then((result) => {
        refetch();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onCreateNewRecord = (text, type, isNew, id, refetch) => {
    /*
      One function for both update and new mutation of task and/or tag
      onSaveHandler from editableDiv component gives the necessary props
      to check if it's update or new record of task/tag
    */
    if (type === "tag") {
      if (isNew) {
        client
          .mutate({
            mutation: ADD_NEW_TAG,
            variables: {
              name: text,
            },
          })
          .then(() => {
            refetch();
          })
          .catch((err) => {
            console.log("err", err);
          });
      } else {
        client
          .mutate({
            mutation: UPDATE_TAG,
            variables: {
              id: id,
              name: text,
            },
          })
          .then(() => {
            refetch();
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    } else if (type === "task") {
      if (isNew) {
        client
          .mutate({
            mutation: ADD_NEW_TASK,
            variables: {
              tag_id: id,
              title: text,
            },
          })
          .then(() => {
            refetch();
          })
          .catch((err) => {
            console.log("err", err);
          });
      } else {
        client
          .mutate({
            mutation: UPDATE_TASK,
            variables: {
              id: id,
              title: text,
            },
          })
          .then(() => {
            refetch();
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    }
  };

  return (
    <div className="timeTracker">
      <ApolloProvider client={client}>
        <Query query={GET_TAGS}>
          {({ loading, error, data, refetch }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return data.tags
              .map(({ id, name, tasks }, i) => (
                <Accordion
                  key={`accordion-${i}`}
                  title={name}
                  onDeleteRecord={() => onDeleteRecord(id, "tag", refetch)}
                  id={id}
                  onSaveHandler={(tag, type, isNew) =>
                    onCreateNewRecord(tag, type, isNew, id, refetch)
                  }
                  content={tasks.map((task, index) => (
                    <div key={index} className="taskWrapper">
                      <EditableDiv
                        value={task.title}
                        id={task.id}
                        onSaveHandler={(taskText) =>
                          onCreateNewRecord(
                            taskText,
                            "task",
                            false,
                            task.id,
                            refetch
                          )
                        }
                        type="task"
                        isNew={false}
                      />
                      <div className="timerWrapper">
                        <Timer
                          startImmediately={false}
                          initialTime={""}
                          direction="backward"
                        >
                          {({ start, stop, timerState, setTime, getTime }) => {
                            return (
                              <React.Fragment>
                                <div className="timer">
                                  {startTimer && startTimer[task.id] && (
                                    <>
                                      <Timer.Days />{" "}
                                      <span className="timeText">d</span>
                                      <Timer.Hours />{" "}
                                      <span className="timeText">h</span>
                                      <Timer.Minutes />
                                      <span className="timeText">m</span>
                                      <Timer.Seconds />
                                      <span className="timeText">s</span>
                                    </>
                                  )}
                                  {!(startTimer && startTimer[task.id]) && (
                                    <TimePicker
                                      client={client}
                                      id={task.id}
                                      onSaveTime={(time) => {
                                        onStartTask(
                                          time,
                                          setTime,
                                          start,
                                          task,
                                          refetch
                                        );
                                      }}
                                    />
                                  )}
                                </div>
                                <FontAwesomeIcon
                                  icon={faStop}
                                  onClick={stop}
                                ></FontAwesomeIcon>
                              </React.Fragment>
                            );
                          }}
                        </Timer>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          onClick={() =>
                            onDeleteRecord(task.id, "task", refetch, task.title)
                          }
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                  ))}
                />
              ))
              .concat(
                <EditableDiv
                  key={`accordion-n`}
                  type="tag"
                  isNew={true}
                  onSaveHandler={(tag) =>
                    onCreateNewRecord(tag, "tag", true, null, refetch)
                  }
                />
              );
          }}
        </Query>
      </ApolloProvider>
    </div>
  );
}

export default App;
