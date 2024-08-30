'use client';

import axios from 'axios';

export default function TodoList({ todos, fetchTodos, setSelectedTodo }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Todo List</h2>
      {todos.map((todo) => (
        <div key={todo._id} className="flex justify-between items-center mb-2 p-2 border rounded">
          <div dangerouslySetInnerHTML={{ __html: todo.text }} />
          <div>
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
              onClick={() => setSelectedTodo(todo)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => handleDelete(todo._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
