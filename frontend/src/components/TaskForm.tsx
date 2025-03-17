"use client";

import React from "react";
import { Todo } from "@/types";

type TaskFormProps = {
  form: { title: string; description: string };
  setForm: (form: { title: string; description: string }) => void;
  handleSaveTodo: () => void;
  handleDeleteTodo: (id: string) => void;
  setShowForm: (show: boolean) => void;
  selectedTodo: Todo | null;
};

const TaskForm: React.FC<TaskFormProps> = ({
  form,
  setForm,
  handleSaveTodo,
  handleDeleteTodo,
  setShowForm,
  selectedTodo,
}) => {
  return (
    <main className="flex-1 p-6">
      {/* ✅ Back Button */}
      <button
        onClick={() => setShowForm(false)}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer transition"
      >
        Back
      </button>

      <div className="bg-white p-6 shadow-md rounded w-full max-w-lg mx-auto mt-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 border rounded mb-4 text-lg"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-3 border rounded mb-4 text-lg"
          rows={4}
        />
        <div className="flex justify-between">
          <button
            onClick={handleSaveTodo}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 cursor-pointer transition"
          >
            Save
          </button>
          {selectedTodo && (
            <button
              onClick={() => handleDeleteTodo(selectedTodo._id)}
              className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 cursor-pointer transition"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default TaskForm;
