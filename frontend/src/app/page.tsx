"use client";

import { useState, useEffect } from "react";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import "@/styles/globals.css";

type Todo = {
  _id: string;
  title: string;
  description: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/todo");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ View a todo
  const handleViewTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setForm({ title: todo.title, description: todo.description });
    setShowForm(true);
  };

  // ✅ Save or Update Todo
  const handleSaveTodo = async () => {
    if (form.title.trim() === "" || form.description.trim() === "") return;

    try {
      let response;
      if (selectedTodo) {
        response = await fetch(`http://localhost:5000/api/todo/${selectedTodo._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        response = await fetch("http://localhost:5000/api/todo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      if (!response.ok) throw new Error("Failed to save todo");

      const newTodo = await response.json();
      setTodos(selectedTodo ? todos.map((t) => (t._id === selectedTodo._id ? newTodo : t)) : [...todos, newTodo]);

      setShowForm(false);
      setForm({ title: "", description: "" });
      setSelectedTodo(null);
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  // ✅ Delete Todo
  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todo/${id}`, { method: "DELETE" });

      if (!response.ok) throw new Error("Failed to delete todo");

      setTodos(todos.filter((t) => t._id !== id));
      setShowForm(false);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-200 w-screen h-[10vh] text-white p-4 flex items-center">
        <img src="/todologo.png" alt="Logo" className="h-15 w-[17vh] scale-190" />
      </header>

      <div className="flex flex-col lg:flex-row">
        <TaskList {...{ todos, handleViewTodo, handleDeleteTodo, setShowForm, setForm, setSelectedTodo, isMobileView, showForm }} />
        {showForm && <TaskForm {...{ form, setForm, handleSaveTodo, handleDeleteTodo, setShowForm, selectedTodo }} />}
      </div>
    </div>
  );
}
