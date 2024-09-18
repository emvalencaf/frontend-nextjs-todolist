import React, { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { UseFormRegisterReturn, useWatch, Control } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  isListening: boolean;
  error?: string;
  onToggleListening: () => void;
  register: UseFormRegisterReturn;
  isTextarea?: boolean;
  isDate?: boolean;
  control: Control<any>; // Adicione isto
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  isListening,
  error,
  onToggleListening,
  register,
  isTextarea = false,
  isDate = false,
  control, // Recebe o control
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Usa useWatch para observar o valor do campo
  const fieldValue = useWatch({ control, name: register.name });
  const hasValue = !!fieldValue;

  return (
    <div className="relative mb-6">
      {/* Label flutuante */}
      <label
        className={`absolute left-2 top-3 text-gray-500 transition-all duration-300
          ${isFocused || hasValue ? '-translate-y-6 scale-75 text-blue-500' : 'scale-100'}
        `}
      >
        {label}
      </label>

      {/* Campo de input */}
      {isDate ? (
        <input
          type="datetime-local"
          {...register}
          className={`border p-2 pt-6 rounded w-full focus:outline-none focus:ring-2 ${
            error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      ) : isTextarea ? (
        <textarea
          {...register}
          className={`border p-2 pt-6 rounded w-full focus:outline-none focus:ring-2 ${
            error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      ) : (
        <input
          {...register}
          className={`border p-2 pt-6 rounded w-full focus:outline-none focus:ring-2 ${
            error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}

      {/* Mensagem de erro */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {/* Botão do microfone (não exibido para campos de data) */}
      {!isDate && (
        <button
          type="button"
          className={`absolute right-2 top-6 text-gray-500 ${
            isListening ? 'text-red-500 animate-pulse' : ''
          } hover:text-blue-500 transition-colors duration-300`}
          onClick={onToggleListening}
        >
          <FaMicrophone size={20} />
        </button>
      )}
    </div>
  );
};

export default FormField;
