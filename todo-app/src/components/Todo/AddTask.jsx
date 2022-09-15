import "../../styles/TodoProfile.css";

const AddTask = ({ newTask, setNewTask, addTask }) => {
  return (
    <>
      <div className="row">
        <div className="col">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="form-control form-control-lg"
            type="text"
          />
        </div>
        <div className="col-auto">
          <button onClick={addTask} className="btn btn-lg btn-success">
            Add task
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTask;
