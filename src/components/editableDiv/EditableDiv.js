import React, { useState } from "react";
import "./EditableDiv.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCheck,
  faPencilAlt,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

/*
  editableDiv component is a reusuable component for edit and add new tag/task
*/
function EditableDiv({ value, onSaveHandler, type, isNew }) {
  // show content based on whether it is for editing or adding new tasks/tags
  const [showSaveAndClose, setShowSaveAndClose] = useState(false);
  const [content, setContent] = useState(value || "");

  const onSave = () => {
    setShowSaveAndClose(false);
    onSaveHandler(content);
  };

  return (
    <div className="editable editableWrapper">
      {!showSaveAndClose && (
        <>
          <div className="newRecord">
            {content
              ? content
              : type === "tag"
              ? "Add new tag"
              : "Add new task"}
          </div>
          {isNew ? (
            <div className="addIconWrapper">
              <FontAwesomeIcon
                className="newRecordIcon"
                icon={faPlusCircle}
                onClick={(e) => {
                  setShowSaveAndClose(true);
                }}
              />
            </div>
          ) : (
            <FontAwesomeIcon
              className="newRecordIcon"
              icon={faPencilAlt}
              onClick={(e) => {
                setShowSaveAndClose(true);
              }}
            />
          )}
        </>
      )}
      {showSaveAndClose && (
        <>
          <input
            className={isNew ? "newInput" : "editableInput"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="editableActions">
            <FontAwesomeIcon icon={faCheck} onClick={onSave} />
            <FontAwesomeIcon
              icon={faTimes}
              onClick={(e) => {
                setShowSaveAndClose(false);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default EditableDiv;
