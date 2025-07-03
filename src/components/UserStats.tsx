import React from 'react';
import { BarChart3, Calendar, TrendingUp } from 'lucide-react';
import { UserStats as UserStatsType } from '../types';

interface UserStatsProps {
  stats: UserStatsType;
}

const UserStats: React.FC<UserStatsProps> = ({ stats }) => {
  const percentageUsed = (stats.wordsProcessedMonth / stats.monthlyLimit) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <BarChart3 className="h-5 w-5 text-green-500" />
        <span>Usage Statistics</span>
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600">Today</span>
          </div>
          <span className="font-semibold">{stats.wordsProcessedToday.toLocaleString()} words</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-gray-600">This Month</span>
          </div>
          <span className="font-semibold">{stats.wordsProcessedMonth.toLocaleString()} words</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Monthly Limit</span>
            <span className="font-semibold">{stats.monthlyLimit.toLocaleString()} words</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(percentageUsed, 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500">
            {stats.remainingWords.toLocaleString()} words remaining
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;