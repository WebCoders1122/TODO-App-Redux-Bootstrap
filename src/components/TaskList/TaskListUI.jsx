import { useFirebase } from "../../context/Firebase";
import { ListGroup } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

export const TaskListUI = ({ tasks, updateTask, deleteTask }) => {
  const firebase = useFirebase();
  return (
    <>
      <ListGroup>
        {tasks.map((task, index) => {
          return (
            <ListGroup.Item
              className='m-1'
              variant={task.complete ? "success" : ""}
              key={index}
              onClick={() => updateTask(index, tasks, firebase)}
              onDoubleClick={() => deleteTask(index, tasks, firebase)}>
              {task.task}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <Alert
        variant='danger'
        className='h-50 d-inline-block m-2'>
        Single Click to Complete and Double Click to Delete!
      </Alert>
    </>
  );
};
