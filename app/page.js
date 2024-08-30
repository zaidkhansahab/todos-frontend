'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-full bg-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TodoList todos={todos} fetchTodos={fetchTodos} setSelectedTodo={setSelectedTodo} />
        <TodoForm selectedTodo={selectedTodo} fetchTodos={fetchTodos} setSelectedTodo={setSelectedTodo} />
      </div>
    </div>
  );
}
