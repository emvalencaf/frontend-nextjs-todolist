// components/Task.tsx
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaUndo } from 'react-icons/fa';
import { TaskType } from '../../types/task';
import TaskForm from '../TaskForm';
import dayjs from 'dayjs';
import Slider from 'react-slick';

interface TaskProps {
  task: TaskType;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newTitle: string, newDescription: string, newDeadline: string) => void;
  onToggleComplete: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({
  task,
  onDelete,
  onUpdate,
  onToggleComplete
}) => {
  const { id, title, description, isDone, createdAt, updatedAt, deadline, photos } = task;
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (newTitle: string, newDescription: string, newDeadline: string) => {
    onUpdate(id, newTitle, newDescription, newDeadline);
    setIsEditing(false);
  };

  // Calculate time left for deadline
  const deadlineDate = dayjs(deadline);
  const now = dayjs();
  const hoursLeft = deadlineDate.diff(now, 'hour');
  const daysLeft = deadlineDate.diff(now, 'day');

  // Determine priority based on time left
  let priorityClass = 'outline-gray-200'; // Default color
  if (hoursLeft <= 5) {
    priorityClass = 'outline-red-500'; // Urgent
  } else if (hoursLeft <= 24) {
    priorityClass = 'outline-orange-500'; // Near deadline
  } else if (daysLeft <= 5) {
    priorityClass = 'outline-yellow-500'; // Upcoming
  }

  return (
    <div className={`p-4 rounded-lg shadow-md outline outline-offset-2 ${priorityClass} mb-4 ${isDone ? 'opacity-50' : ''}`}>
      {isEditing ? (
        <TaskForm
          initialValues={{ title, description, deadline }}
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
                  className="text-yellow-500 cursor-pointer hover:text-yellow-700 transition-colors"
                  onClick={() => onToggleComplete(id)}
                />
              ) : (
                <FaCheck
                  className="text-green-500 cursor-pointer hover:text-green-700 transition-colors"
                  onClick={() => onToggleComplete(id)}
                />
              )}
              <FaEdit
                className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors"
                onClick={() => setIsEditing(true)}
              />
              <FaTrash
                className="text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                onClick={() => onDelete(id)}
              />
            </div>
          </div>
          <p className={`mt-2 ${isDone ? 'line-through' : ''}`}>{description}</p>
          <div className="text-gray-500 text-sm mt-2">
            <p>Deadline: {deadlineDate.format('MMMM D, YYYY h:mm A')}</p>
            <p>Created at: {new Date(createdAt).toLocaleDateString()}</p>
            <p>Updated at: {new Date(updatedAt).toLocaleDateString()}</p>
          </div>
          {photos.length > 0 && (
            <div className="mt-4">
              <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
                {photos.map((photo, index) => (
                  <div key={index}>
                    <img src={photo} alt={`task-photo-${index}`} className="w-full h-auto object-cover rounded" />
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Task;
