import React, { useState, useRef } from "react";
import EditableDiv from "../editableDiv/EditableDiv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "./Accordion.css";

function Accordion(props) {
  /* 
    set height and rotation for accordion on expand
    on Expanding, the accordion content height will be set to 
    scrollheight + 70 as the height of add new task/tag is 60
  */
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight + 70}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  return (
    <div className="accordion__section">
      <div className={`accordion ${setActive}`}>
        <EditableDiv
          type="tag"
          isNew={false}
          onSaveHandler={(tag) => props.onSaveHandler(tag, "tag", false)}
          id={props.id}
          value={props.title}
        />
        <div>
          <FontAwesomeIcon
            className={"deleteIcon"}
            icon={faTrashAlt}
            onClick={props.onDeleteRecord}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className={`${setRotate}`}
            icon={faChevronRight}
            onClick={toggleAccordion}
          ></FontAwesomeIcon>
        </div>
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion__content"
      >
        <div className="accordion__text">
          {props.content}{" "}
          <EditableDiv
            type="task"
            isNew={true}
            onSaveHandler={(task) => props.onSaveHandler(task, "task", true)}
          />
        </div>
      </div>
    </div>
  );
}

export default Accordion;
