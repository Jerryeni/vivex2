import React from 'react';
import type { UseFormRegister } from 'react-hook-form';

type InputFieldProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>; // Or replace `any` with your specific form data type
};

export const InputField: React.FC<InputFieldProps> = ({ label, name, register }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium mb-1">
      {label}
    </label>
    <input
      id={name}
      {...register(name)}
      className="w-full border border-gray-300 p-2 rounded"
      placeholder={label}
    />
  </div>
);