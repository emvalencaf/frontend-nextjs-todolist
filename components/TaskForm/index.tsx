import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, TaskFormValues } from '../../types/taskSchema';
import FormField from './components/FormField';
import { Window } from '../../types/global';

interface TaskFormProps {
  initialValues: TaskFormValues;
  onSubmit: (title: string, description: string, deadline: string) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control, // Adicione isto
    formState: { errors },
    reset,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialValues,
  });

  // Estado para rastrear o campo específico que está gravando
  const [listeningField, setListeningField] = useState<keyof TaskFormValues | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startRecognition = (field: keyof TaskFormValues) => {
    const SpeechRecognition = (window as Window).SpeechRecognition || (window as Window).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition API is not supported in your browser.');
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      if (!recognitionRef.current) return;
      recognitionRef.current.lang = 'pt-BR'; // Pode ser alterado para 'pt-BR'
    }

    const recognition = recognitionRef.current;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setValue(field, transcript); // Preenche o campo com o texto transcrito
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error(event.error);
      setListeningField(null);
    };

    recognition.onend = () => {
      setListeningField(null);
    };

    recognition.start();
    setListeningField(field);
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListeningField(null);
    }
  };

  const toggleListening = (field: keyof TaskFormValues) => {
    if (listeningField === field) {
      stopRecognition();
    } else {
      startRecognition(field);
    }
  };

  const handleFormSubmit = (data: TaskFormValues) => {
    onSubmit(data.title, data.description, data.deadline); // Envio de dados
    reset(); // Limpa o formulário após o envio
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mb-4">
      <FormField
        label="Task Title"
        isListening={listeningField === 'title'}
        onToggleListening={() => toggleListening('title')}
        register={register('title')}
        error={errors.title?.message}
        control={control} // Passe o control aqui
      />

      <FormField
        label="Task Description"
        isListening={listeningField === 'description'}
        onToggleListening={() => toggleListening('description')}
        register={register('description')}
        error={errors.description?.message}
        isTextarea
        control={control} // Passe o control aqui
      />

      <div className="mb-6">
        <label className="block text-gray-700">Deadline</label>
        <input
          type="datetime-local"
          {...register('deadline')}
          className={`border p-2 rounded w-full focus:outline-none focus:ring-2 ${errors.deadline ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
        />
        {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
      </div>

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
