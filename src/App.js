import { useState } from "react";

function App() {
  const saveTodos = localStorage.getItem("TodosList")
  const initialTodos = saveTodos ? JSON.parse(saveTodos) : [
    {
      id: 1,
      title: "come",
      isEditable: false,
      isCompleted: false,
    },
    {
      id: 2,
      title: "go",
      isEditable: false,
      isCompleted: true,
    },
    {
      id: 3,
      title: "here",
      isEditable: false,
      isCompleted: false,
    },
  ];
  const [todos, setTodos] = useState(initialTodos);
  const [todo, setTodo] = useState("");
  const [history, setHistory] = useState("");

  const handleChange = e => {
    setTodo(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!todo.trim()) {
      return;
    }
    setTodos([
      {
        id: ~~(Math.random() * 100),
        title: todo,
        isEditable: false
      }, ...todos
    ]);
    localStorage.setItem("TodosList", JSON.stringify([
      {
        id: ~~(Math.random() * 100),
        title: todo,
        isEditable: false
      }, ...todos
    ]))
    setTodo("");
  }

  const handleEdit = (index, title) => {
    const editableTodo = JSON.parse(JSON.stringify(todos));
    editableTodo[index].isEditable = true;
    setHistory(title);
    setTodos(editableTodo);
    localStorage.setItem("TodosList", JSON.stringify(editableTodo))
  }

  const handleCancel = (index) => {
    const editableTodo = JSON.parse(JSON.stringify(todos));
    editableTodo[index].isEditable = false;
    editableTodo[index].title = history;
    localStorage.setItem("TodosList", JSON.stringify(editableTodo))
    setTodos(editableTodo);
  }

  const handleUpdate = (e, index) => {
    const editableTodo = JSON.parse(JSON.stringify(todos));
    editableTodo[index].title = e.target.value;
    localStorage.setItem("TodosList", JSON.stringify(editableTodo))
    setTodos(editableTodo);
  }

  const handleEditSave = (index) => {
    const editableTodo = JSON.parse(JSON.stringify(todos));
    editableTodo[index].isEditable = false;
    editableTodo[index].title = editableTodo[index].title;
    localStorage.setItem("TodosList", JSON.stringify(editableTodo))
    setTodos(editableTodo);
  }

  const handleDelete = (id) => {
    const editableTodo = todos.filter(todo => todo.id !== id);
    localStorage.setItem("TodosList", JSON.stringify(editableTodo))
    setTodos(editableTodo);
  }

  const handleComplete = index => {
    const editableTodo = JSON.parse(JSON.stringify(todos));
    editableTodo[index].isCompleted = !editableTodo[index].isCompleted;
    localStorage.setItem("TodosList", JSON.stringify(editableTodo))
    setTodos(editableTodo);
  }

  const handleReset = () => {
    localStorage.removeItem("TodosList");
    setTodo("");
    setHistory("");
    setTodos([
      {
        id: 1,
        title: "come",
        isEditable: false,
        isCompleted: false,
      },
      {
        id: 2,
        title: "go",
        isEditable: false,
        isCompleted: true,
      },
      {
        id: 3,
        title: "here",
        isEditable: false,
        isCompleted: false,
      },
    ]);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input value={todo} onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>Save</button>
        <input type="button"  onClick={handleReset} value="Reset" />
      </form>
      <div className="result">
        <ul>
          {
            Array.isArray(todos) && todos.map(({ id, title, isEditable, isCompleted }, index) => {
              return (
                isEditable ? (
                  <li key={id}>
                    <input value={title} onChange={(e) => handleUpdate(e, index)} />
                    <button onClick={() => handleEditSave(index)}>Update</button>
                    <button onClick={() => handleCancel(index)}>Cancel</button>
                  </li>
                ) : (
                  <li key={id}>
                    <input type="checkbox" onChange={() => handleComplete(index)} checked={isCompleted ? true : false} />
                    <span style={isCompleted ? { "textDecoration": "line-through" } : {}}>{title}</span>
                    <button onClick={() => handleEdit(index,title )}>Edit</button>
                    <button onClick={() => handleDelete(id)}>Delete</button>
                  </li>
                ))
            }
            )
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
