import React from 'react';
import { useTasks } from '../contexts/TaskContext';

function ProcrastinationMeter() {
  const { procrastinationScore } = useTasks();
  
  // Define achievement levels
  const getAchievementLevel = (score) => {
    if (score <= 10) return { title: "Professional Adult", description: "Boring!" };
    if (score <= 30) return { title: "Certified Gheda Expert", description: "You're getting there!" };
    if (score <= 50) return { title: "Master of Tomorrow", description: "Tomorrow is your domain!" };
    if (score <= 70) return { title: "Time Lord of Taswif", description: "You bend time to your will!" };
    return { title: "Legend says they're still saying 'ghda' to this day", description: "The ultimate procrastinator!" };
  };

  const level = getAchievementLevel(procrastinationScore);
  
  // Calculate percentage for progress bar
  const percentage = Math.min(100, (procrastinationScore / 80) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Procrastination Meter™</h3>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span>Score: {procrastinationScore}</span>
          <span className="font-medium text-indigo-600">{level.title}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 italic">{level.description}</p>
    </div>
  );
}

export default ProcrastinationMeter;