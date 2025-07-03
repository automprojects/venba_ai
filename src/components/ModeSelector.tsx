import React from 'react';
import * as Icons from 'lucide-react';
import { HumanizationMode } from '../types';

interface ModeSelectorProps {
  modes: HumanizationMode[];
  selectedMode: string;
  onModeChange: (mode: string) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ modes, selectedMode, onModeChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Humanization Mode</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {modes.map((mode) => {
          const IconComponent = Icons[mode.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                selectedMode === mode.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <IconComponent className="h-6 w-6" />
                <span className="text-sm font-medium">{mode.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModeSelector;