import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export default function FilterForm() {
  const { state, handleInputChange } = useContext(TodoContext);

  return (
    <div className="filter-form">
      <div className="filter-form-group">
        <label htmlFor="filter-input">Search:</label>
        <input
          type="text"
          id="filter-input"
          name="filterInput"
          value={state.filterInput}
          onChange={handleInputChange}
          placeholder="Search your tasks"
        />
      </div>
      <label>
        <input
          type="checkbox"
          name="hideCompleted"
          checked={state.hideCompleted}
          onChange={handleInputChange}
        />
        <span>Hide Completed</span>
      </label>
    </div>
  );
}
