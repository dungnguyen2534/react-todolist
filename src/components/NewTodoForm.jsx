import { useContext, useRef } from "react";
import { TodoContext } from "../context/TodoContext";

export default function NewTodoForm() {
  const { addNewTodo } = useContext(TodoContext);

  const nameRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (nameRef.current.value === "") return;
    addNewTodo(nameRef.current.value);
    nameRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit} id="new-todo-form">
      <label htmlFor="todo-input">TodoList</label>
      <input
        type="text"
        id="todo-input"
        name="todoInput"
        ref={nameRef}
        placeholder="Enter new task"
      />
      <button>Add Todo</button>
    </form>
  );
}
