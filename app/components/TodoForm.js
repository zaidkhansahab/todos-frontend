'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Import ReactQuill dynamically to support SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function TodoForm({ selectedTodo, fetchTodos, setSelectedTodo }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
    } else {
      setText('');
    }
  }, [selectedTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTodo) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/todos/${selectedTodo._id}`, { text });
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/todos`, { text });
      }
      fetchTodos();
      setText('');
      setSelectedTodo(null);
    } catch (error) {
      console.error('Error submitting todo:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md ">
      <h1 className="text-3xl font-bold mb-4">{selectedTodo ? 'Edit Todo' : 'CREATE TODO'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ReactQuill
          theme="snow"
          value={text}
          onChange={setText}
          placeholder="Enter your todo description"
          className="h-[750px] mb-4"
        />
        
        <button type="submit" className="w-full bg-blue-500 text-white bt-5 py-2 rounded hover:bg-blue-600">
          {selectedTodo ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>
    </div>
  );
}
