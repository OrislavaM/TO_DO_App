import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "../../styles/TodoProfile.css";

const TodoList = ({ toDo, setUpdateData, deleteTask }) => {
  return (
    <>
      {toDo &&
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((toDo, index) => {
            return (
              <React.Fragment key={toDo.id}>
                <div className="col taskBg">
                  <div className="tasksWrapper">
                    <span className="taskNumber">{index + 1}</span>
                    <span className="taskText">{toDo.title}</span>
                  </div>
                  <div className="iconWrapper">
                    <span
                      onClick={() =>
                        setUpdateData(toDo)
                      }
                    >
                      <FontAwesomeIcon icon={faPenToSquare} title="Update" />{" "}
                    </span>
                    <span onClick={() => deleteTask(toDo.id)}>
                      <FontAwesomeIcon icon={faTrashCan} title="Delete" />{" "}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </>
  );
};

export default TodoList;
