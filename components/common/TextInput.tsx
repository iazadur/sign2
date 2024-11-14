import React from 'react';

interface TextInputProps {
    label: string;
    id: string;
    name: string;
    error?: string[];
    defaultValue?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, id, name, error, defaultValue }) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-gray-700 font-medium mb-2"
            >
                {label}
            </label>
            <input
                type="text"
                id={id}
                name={name}
                defaultValue={defaultValue}
                required
                className="w-full text-black p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
            />
            <p aria-live="polite">{error}</p>
        </div>
    );
};

export default TextInput;