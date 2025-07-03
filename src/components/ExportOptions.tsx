import React from 'react';
import { Copy, Download, FileText, File } from 'lucide-react';

interface ExportOptionsProps {
  text: string;
  onCopy: () => void;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ text, onCopy }) => {
  const downloadAsFile = (format: 'txt' | 'doc' | 'pdf') => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `humanized-text.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onCopy}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
        >
          <Copy className="h-4 w-4" />
          <span>Copy to Clipboard</span>
        </button>
        
        <button
          onClick={() => downloadAsFile('txt')}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
        >
          <FileText className="h-4 w-4" />
          <span>Download TXT</span>
        </button>
        
        <button
          onClick={() => downloadAsFile('doc')}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
        >
          <File className="h-4 w-4" />
          <span>Download DOC</span>
        </button>
        
        <button
          onClick={() => downloadAsFile('pdf')}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
};

export default ExportOptions;