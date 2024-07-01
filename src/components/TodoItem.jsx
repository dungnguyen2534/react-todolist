import { useContext, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { TodoContext } from "../context/TodoContext";
import {
  faFloppyDisk,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

export default function TodoItem({ id, name, completed }) {
  const { toggleTodo, editTodo, deleteTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);

  const nameRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (nameRef.current.value === "") return;
    editTodo(id, nameRef.current.value);
    setIsEditing(false);
  }

  return (
    <li className="list-item">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input type="text" defaultValue={name} ref={nameRef} autoFocus />
          <button data-button-edit>
            <FontAwesomeIcon
              icon={faFloppyDisk}
              size="1x"
              color="#11002c"
            />
          </button>
        </form>
      ) : (
        <>
          <label className="list-item-label">
            <input
              checked={completed}
              type="checkbox"
              data-list-item-checkbox
              onChange={(e) => toggleTodo(id, e.target.checked)}
            />

            <span data-list-item-text>{name}</span>
          </label>
          <button onClick={() => setIsEditing(true)} data-button-edit>
            <FontAwesomeIcon
              icon={faPenToSquare}
              size="1x"
              color="#11002c"
            />
          </button>
          <button onClick={() => deleteTodo(id)} data-button-delete>
            <FontAwesomeIcon icon={faTrashCan} size="1x" color="#11002c" />
          </button>
        </>
      )}
    </li>
  );
}
