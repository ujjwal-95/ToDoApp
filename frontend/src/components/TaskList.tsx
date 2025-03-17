"use client";

import { Todo } from "@/types";
import React from "react";

type TaskListProps = {
  todos: Todo[];
  handleViewTodo: (todo: Todo) => void;
  handleDeleteTodo: (id: string) => void;
  setShowForm: (show: boolean) => void;
  setForm: (form: { title: string; description: string }) => void;
  setSelectedTodo: (todo: Todo | null) => void;
  isMobileView: boolean;
  showForm: boolean;
};

const TaskList: React.FC<TaskListProps> = ({
  todos,
  handleViewTodo,
  handleDeleteTodo,
  setShowForm,
  setForm,
  setSelectedTodo,
  isMobileView,
  showForm,
}) => {
  return (
    <>
      {!isMobileView || !showForm ? (
        <aside className="bg-white p-4 shadow-md min-h-[40vh] lg:min-h-[90vh] max-h-screen w-full lg:w-1/3 xl:w-1/4 overflow-y-auto">
          <button
            onClick={() => {
              setSelectedTodo(null);
              setForm({ title: "", description: "" });
              setShowForm(true);
            }}
            className=" bg-black text-white px-3 py-1 rounded mb-4 cursor-pointer"
          >
            Add Todo
          </button>

          <div className="space-y-4">
            {todos.map((todo) => (
              <div key={todo._id} className="p-4 bg-gray-200 shadow-md rounded-md flex flex-col justify-between">
                <h3 className="text-lg font-semibold">{todo.title}</h3>
                <div className="flex justify-end items-center space-x-2 mt-2">
                  <button
                    onClick={() => handleViewTodo(todo)}
                    className=" text-black font-semibold rounded hover:text-blue-500 cursor-pointer"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className=" text-black font-semibold rounded hover:text-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      ) : null}
    </>
  );
};

export default TaskList;
