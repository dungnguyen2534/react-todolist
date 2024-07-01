import { createContext, useEffect, useReducer } from "react";

export const TodoContext = createContext();

const ACTIONS = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  DELETE_TODO: "DELETE_TODO",
  EDIT_TODO: "EDIT_TODO",
  UPDATE_INPUT: "UPDATE_INPUT",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [
          {
            name: payload.name,
            completed: false,
            id: crypto.randomUUID(),
          },
          ...state.todos,
        ],
      };
    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id
            ? { ...todo, completed: payload.completed }
            : todo
        ),
      };
    case ACTIONS.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === payload.id) {
            return { ...todo, name: payload.name };
          }
          return todo;
        }),
      };
    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload.id),
      };
    case ACTIONS.UPDATE_INPUT:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    default:
      return state;
  }
}

export function TodoContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    filterInput: "",
    hideCompleted: false,
    todos: JSON.parse(localStorage.getItem("todos")) || [],
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    dispatch({
      type: ACTIONS.UPDATE_INPUT,
      payload: {
        name: name,
        value: inputValue,
      },
    });
  }

  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name } });
  }

  function toggleTodo(id, completed) {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id, completed } });
  }

  function editTodo(id, name) {
    dispatch({ type: ACTIONS.EDIT_TODO, payload: { id, name } });
  }

  function deleteTodo(id) {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id } });
  }

  return (
    <TodoContext.Provider
      value={{
        state,
        addNewTodo,
        toggleTodo,
        editTodo,
        deleteTodo,
        handleInputChange,
      }}>
      {children}
    </TodoContext.Provider>
  );
}
