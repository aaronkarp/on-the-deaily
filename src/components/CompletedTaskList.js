import { useTasks } from '../contexts/TasksContext';
import Task from './Task';

function CompletedTaskList() {
  const { users, currentUser } = useTasks();
  const completedTasks = users.find((user) => user.id === currentUser.id).tasks?.filter((task) => task.done);
  return (
    <div>
      <h2>Done</h2>
      <ul>
        {completedTasks?.length > 0
          ? completedTasks.map((task) => (task.done ? <Task task={task} key={task.id} /> : ''))
          : ''}
      </ul>
    </div>
  );
}

export default CompletedTaskList;
