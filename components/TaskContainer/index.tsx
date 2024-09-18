"use client";
// components/TasksContainer.tsx
import React, { useState } from 'react';
import Task from '../Task';
import { TaskType } from '../../types/task';
import TaskForm from '../TaskForm';

const TasksContainer: React.FC = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [isAdding, setIsAdding] = useState(false);
  
    const addTask = (title: string, description: string, deadline: string) => {
      const newTask: TaskType = {
        id: Date.now(),
        title,
        description,
        isDone: false,
        deadline: new Date(deadline).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
      setIsAdding(false);
    };
  
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Todo List</h2>
  
        {isAdding ? (
          <TaskForm initialValues={{ title: '', description: '', deadline: '', }} onSubmit={addTask} onCancel={() => setIsAdding(false)} />
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            onClick={() => setIsAdding(true)}
          >
            Add Task
          </button>
        )}
  
        {/* Renderização das tasks */}
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={{...task}}
            onDelete={(id: number) => setTasks(tasks.filter(task => task.id !== id))}
            onUpdate={(id: number, newTitle: string, newDescription: string, newDeadline: string) =>
              setTasks(tasks.map(task => task.id === id ? { ...task, title: newTitle, description: newDescription, deadline: newDeadline, updatedAt: new Date().toISOString() } : task))
            }
            onToggleComplete={(id: number) => setTasks(tasks.map(task => task.id === id ? { ...task, isDone: !task.isDone, updatedAt: new Date().toISOString() } : task))}
          />
        ))}
      </div>
    );
};

export default TasksContainer;
