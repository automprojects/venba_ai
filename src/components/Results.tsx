import React from 'react';
import { CheckCircle, Clock, Target, AlertCircle, Wifi, Server } from 'lucide-react';
import { ProcessingResult } from '../types';

interface ResultsProps {
  result: ProcessingResult | null;
  aiDetectionScore?: { score: number; detector: string };
  isPuterConnected?: boolean;
}

const Results: React.FC<ResultsProps> = ({ result, aiDetectionScore, isPuterConnected = true }) => {
  if (!result) return null;

  return (
    <div className="space-y-6">
      {/* Processing Info Banner */}
      <div className={`rounded-lg p-3 ${isPuterConnected ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
        <div className="flex items-center space-x-2">
          {isPuterConnected ? (
            <>
              <Server className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">Processed using Puter.com AI backend</span>
            </>
          ) : (
            <>
              <Wifi className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">Processed using local fallback (Puter.com unavailable)</span>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Processing Time</p>
              <p className="text-lg font-semibold">{result.processingTime.toFixed(1)}s</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Confidence</p>
              <p className="text-lg font-semibold">{result.confidenceScore.toFixed(0)}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Words</p>
              <p className="text-lg font-semibold">{result.wordCount}</p>
            </div>
          </div>
        </div>
        
        {aiDetectionScore && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className={`h-5 w-5 ${aiDetectionScore.score < 30 ? 'text-green-500' : aiDetectionScore.score < 60 ? 'text-yellow-500' : 'text-red-500'}`} />
              <div>
                <p className="text-sm text-gray-600">AI Detection</p>
                <p className="text-lg font-semibold">{aiDetectionScore.score.toFixed(0)}%</p>
                <p className="text-xs text-gray-500">{aiDetectionScore.detector}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Humanized Text */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>Humanized Text</span>
          {isPuterConnected && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Puter.com Enhanced
            </span>
          )}
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {result.humanizedText}
          </p>
        </div>
        
        {/* Quality Indicators */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Meaning Preserved</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Detector Optimized</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-gray-600">Plagiarism-Free</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;