import React from 'react';
import { Play, RotateCcw, Loader2 } from 'lucide-react';

interface ProcessingControlsProps {
  onProcess: () => void;
  onRetry: () => void;
  isProcessing: boolean;
  hasResult: boolean;
  disabled: boolean;
}

const ProcessingControls: React.FC<ProcessingControlsProps> = ({
  onProcess,
  onRetry,
  isProcessing,
  hasResult,
  disabled
}) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={onProcess}
        disabled={disabled || isProcessing}
        className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Play className="h-5 w-5" />
            <span>Humanize Text</span>
          </>
        )}
      </button>
      
      {hasResult && (
        <button
          onClick={onRetry}
          disabled={isProcessing}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <RotateCcw className="h-5 w-5" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};

export default ProcessingControls;