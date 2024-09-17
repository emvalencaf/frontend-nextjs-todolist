// components/Task.tsx
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaUndo } from 'react-icons/fa';
import { TaskType } from '../../types/task';
import TaskForm from '../TaskForm';

interface TaskProps {
    task: TaskType;
    onDelete: (id: number) => void;
    onUpdate: (id: number, newTitle: string, newDescription: string) => void;
    onToggleComplete: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({
    task,
    onDelete,
    onUpdate,
    onToggleComplete
}) => {
    const {id, description, title, isDone, createdAt, updatedAt} = task;
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdate = (newTitle: string, newDescription: string) => {
      onUpdate(id, newTitle, newDescription);
      setIsEditing(false);
    };
  
    return (
      <div className={`p-4 bg-white shadow-md rounded-lg ${isDone ? 'opacity-50' : ''} mb-4`}>
        {isEditing ? (
          <TaskForm
            initialValues={{ title, description }}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <div className="flex justify-between">
              <h3 className={`text-lg font-bold ${isDone ? 'line-through' : ''}`}>{title}</h3>
              <div className="flex space-x-2">
                {isDone ? (
                  <FaUndo
                    className="text-yellow-500 cursor-pointer"
                    onClick={() => onToggleComplete(id)}
                  />
                ) : (
                  <FaCheck
                    className="text-green-500 cursor-pointer"
                    onClick={() => onToggleComplete(id)}
                  />
                )}
                <FaEdit className="text-blue-500 cursor-pointer" onClick={() => setIsEditing(true)} />
                <FaTrash className="text-red-500 cursor-pointer" onClick={() => onDelete(id)} />
              </div>
            </div>
            <p className={`${isDone ? 'line-through' : ''}`}>{description}</p>
            <div className="text-gray-500 text-sm mt-2">
              <p>Created at: {new Date(createdAt).toLocaleDateString()}</p>
              <p>Updated at: {new Date(updatedAt).toLocaleDateString()}</p>
            </div>
          </>
        )}
      </div>
    );
};

export default Task;
