import { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../context/TodoContext";

export default function TodoList() {
  const { state } = useContext(TodoContext);

  const completedList = [];
  const incompleteList = [];

  state.todos.forEach((todo) => {
    if (todo.name.toLowerCase().includes(state.filterInput.toLowerCase()))
      todo.completed
        ? completedList.push(todo)
        : incompleteList.push(todo);
  });

  const noCompletedTodos = completedList.length === 0;
  const noIncompleteTodos = incompleteList.length === 0;

  return (
    <>
      {noIncompleteTodos ? null : (
        <div className="list">
          <h2>Incomplete</h2>
          <ul>
            {incompleteList.map((todo) => (
              <TodoItem key={todo.id} {...todo} />
            ))}
          </ul>
        </div>
      )}
      {state.hideCompleted ? null : noCompletedTodos ? null : (
        <div className="list">
          <h2>Completed</h2>
          <ul>
            {completedList.map((todo) => (
              <TodoItem key={todo.id} {...todo} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
