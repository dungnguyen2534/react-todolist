import { useContext, useMemo } from "react";
import { TodoContext } from "../App";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { state } = useContext(TodoContext);

  const filteredLists = useMemo(() => {
    const filterInputLower = state.filterInput.toLowerCase();

    const completedList = state.todos
      .filter(
        (todo) =>
          todo.completed &&
          todo.name.toLowerCase().includes(filterInputLower)
      )
      .map((todo) => <TodoItem key={todo.id} {...todo} />);

    const incompletedList = state.todos
      .filter(
        (todo) =>
          !todo.completed &&
          todo.name.toLowerCase().includes(filterInputLower)
      )
      .map((todo) => <TodoItem key={todo.id} {...todo} />);

    return { completedList, incompletedList };
  }, [state.todos, state.filterInput]);

  const noCompletedTodos = filteredLists.completedList.length === 0;
  const noIncompletedTodos = filteredLists.incompletedList.length === 0;

  return (
    <>
      {noIncompletedTodos ? null : (
        <div className="list">
          <h2>Incompleted</h2>
          <ul>{filteredLists.incompletedList}</ul>
        </div>
      )}
      {state.hideCompleted ? null : noCompletedTodos ? null : (
        <div className="list">
          <h2>Completed</h2>
          <ul>{filteredLists.completedList}</ul>
        </div>
      )}
    </>
  );
}
