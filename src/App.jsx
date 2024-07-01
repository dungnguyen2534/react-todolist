import "./app.css";
import NewTodoForm from "./components/NewTodoForm";
import FilterForm from "./components/FilterForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="container">
      <NewTodoForm />
      <FilterForm />
      <TodoList />
    </div>
  );
}

export default App;
