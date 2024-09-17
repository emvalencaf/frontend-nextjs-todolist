// components/TaskForm.tsx
import React, { useState, useEffect } from 'react';

interface TaskFormProps {
  initialValues: { title: string; description: string };
  onSubmit: (title: string, description: string) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit(title, description);
    }
  };

  useEffect(() => {
    setTitle(initialValues.title);
    setDescription(initialValues.description);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 rounded w-full mb-2"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
