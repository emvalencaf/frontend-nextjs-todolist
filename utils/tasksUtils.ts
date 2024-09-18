import { TaskType } from '../types/task';

export const createNewTask = (title: string, description: string, deadline: string, photos: string[]): TaskType => ({
    id: Date.now(),
    title,
    description,
    isDone: false,
    deadline: new Date(deadline).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    photos: photos,
});
