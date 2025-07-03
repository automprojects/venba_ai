import React from 'react';
import { Upload, Cast as Paste, FileText } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  wordCount: number;
  maxWords: number;
}

const TextInput: React.FC<TextInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "Paste your AI-generated text here...",
  wordCount,
  maxWords
}) => {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onChange(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Input Text</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePaste}
            className="flex items-center space-x-1 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
          >
            <Paste className="h-4 w-4" />
            <span>Paste</span>
          </button>
          <label className="flex items-center space-x-1 px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
            <Upload className="h-4 w-4" />
            <span>Upload</span>
            <input
              type="file"
              accept=".txt,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <FileText className="h-4 w-4" />
          <span>{wordCount} words</span>
        </div>
        <div className="text-sm text-gray-500">
          Limit: {maxWords} words per submission
        </div>
      </div>
    </div>
  );
};

export default TextInput;