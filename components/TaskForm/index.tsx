import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, TaskFormValues } from '../../types/taskSchema';
import FormField from './components/FormField';
import { Window } from '../../types/global';

interface TaskFormProps {
  initialValues: TaskFormValues;
  onSubmit: (title: string, description: string, deadline: string, photos: string[]) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialValues,
  });

  const [listeningField, setListeningField] = useState<keyof TaskFormValues | null>(null);
  const [photos, setPhotos] = useState<string[]>([]); // Estado para fotos
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startRecognition = (field: keyof TaskFormValues) => {
    const SpeechRecognition = (window as Window).SpeechRecognition || (window as Window).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition API is not supported in your browser.');
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'pt-BR';
    }

    const recognition = recognitionRef.current;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setValue(field, transcript);
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
    onSubmit(data.title, data.description, data.deadline, photos);
    reset();
    setPhotos([]); // Limpar fotos após o envio
    stopCamera(); // Parar o stream da câmera após o envio
  };

  const handlePhotoCapture = async () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        const photoUrl = canvas.toDataURL('image/png');
        setPhotos(prevPhotos => [...prevPhotos, photoUrl]);
      }
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraStream(stream);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setCameraStream(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mb-4">
      <FormField
        label="Task Title"
        isListening={listeningField === 'title'}
        onToggleListening={() => toggleListening('title')}
        register={register('title')}
        error={errors.title?.message}
        control={control}
      />

      <FormField
        label="Task Description"
        isListening={listeningField === 'description'}
        onToggleListening={() => toggleListening('description')}
        register={register('description')}
        error={errors.description?.message}
        isTextarea
        control={control}
      />

      <div className="mb-6">
        <label className="block text-gray-700">Deadline</label>
        <input
          type="datetime-local"
          {...register('deadline')}
          className={`border p-2 rounded w-full focus:outline-none focus:ring-2 ${errors.deadline ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
        />
        {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700">Photos</label>
        <button
          type="button"
          onClick={startCamera}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Start Camera
        </button>
        <button
          type="button"
          onClick={handlePhotoCapture}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Capture Photo
        </button>
        <button
          type="button"
          onClick={stopCamera}
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
        >
          Stop Camera
        </button>
        <div className="mt-2">
          <video ref={videoRef} className="w-full h-auto border" />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt={`photo-${index}`} className="w-24 h-24 object-cover rounded" />
          ))}
        </div>
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
