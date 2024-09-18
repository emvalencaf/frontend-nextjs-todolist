export interface TaskType {
    id: number;
    title: string;
    description: string;
    isDone: boolean;
    deadline: string;
    createdAt: string;
    updatedAt: string;
    photos: string[]; // Adicionando a propriedade de fotos
  }
  