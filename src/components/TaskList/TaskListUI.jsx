import { useFirebase } from "../../context/Firebase";
import { ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const TaskListUI = ({ tasks, updateTask, deleteTask }) => {
  const firebase = useFirebase();
  return (
    <ListGroup>
      {tasks.map((task, index) => {
        return (
          <ListGroup.Item
            variant={task.complete ? "success" : ""}
            key={index}
            onClick={() => updateTask(index, tasks, firebase)}
            onDoubleClick={() => deleteTask(index, tasks, firebase)}>
            {task.task}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};
