// components/FormField.tsx
import React, { useState, useEffect } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  isListening: boolean;
  error?: string;
  onToggleListening: () => void;
  register: UseFormRegisterReturn;
  isTextarea?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  isListening,
  error,
  onToggleListening,
  register,
  isTextarea = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    // Detecta se o campo tem valor
    if (register.value) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  }, [register.value]);

  return (
    <div className="relative mb-6">
      {/* Label flutuante */}
      <label
        className={`
          absolute left-2 top-2 text-gray-500 transition-all duration-300
          ${isFocused || hasValue ? '-translate-y-8 scale-75 text-blue-500' : 'scale-100'}
        `}
      >
        {label}
      </label>

      {/* Campo de input */}
      {isTextarea ? (
        <textarea
          {...register}
          className={`border p-2 pt-6 rounded w-full focus:outline-none focus:ring-2 ${
            error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(!!e.target.value);
          }}
        />
      ) : (
        <input
          {...register}
          className={`border p-2 pt-6 rounded w-full focus:outline-none focus:ring-2 ${
            error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(!!e.target.value);
          }}
        />
      )}

      {/* Mensagem de erro */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {/* Botão do microfone */}
      <button
        type="button"
        className={`absolute right-2 top-6 text-gray-500 ${
          isListening ? 'text-red-500 animate-pulse' : ''
        } hover:text-blue-500 transition-colors duration-300`}
        onClick={onToggleListening}
      >
        <FaMicrophone size={20} />
      </button>
    </div>
  );
};

export default FormField;
