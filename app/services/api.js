import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getTodos = () => api.get('/todos');
export const createTodo = (todo) => api.post('/todos', todo);
export const updateTodo = (id, todo) => api.put(`/todos/${id}`, todo);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
