import React, { useState, useEffect } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { useToast } from '../contexts/ToastContext';
import { 
  PencilIcon, 
  TrashIcon, 
  CheckIcon, 
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import TaskForm from './TaskForm';
import ProcrastinationMeter from './ProcrastinationMeter';
import ExcusePopup from './ExcusePopup';

function TaskList() {
  const { 
    tasks, 
    loading, 
    error, 
    fetchTasks, 
    updateTask, 
    deleteTask, 
    postponeTask,
    currentExcuse,
    showExcuse,
    setShowExcuse
  } = useTasks();
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [postponingTaskId, setPostponingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setCurrentTask(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setCurrentTask(null);
  };

  const handleStatusToggle = async (task) => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      await updateTask(task._id, { ...task, status: newStatus });
      addToast(`Task marked as ${newStatus}`, 'success');
    } catch (err) {
      addToast('Failed to update task status', 'error');
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        addToast('Task deleted successfully', 'success');
      } catch (err) {
        addToast('Failed to delete task', 'error');
      }
    }
  };

  const handlePostponeClick = async (id) => {
    try {
      setPostponingTaskId(id);
      await postponeTask(id);
      addToast('Task postponed to tomorrow!', 'success');
    } catch (err) {
      addToast('Failed to postpone task', 'error');
    } finally {
      setPostponingTaskId(null);
    }
  };

  const getCategoryEmoji = (category) => {
    switch(category) {
      case 'urgent': return '🔥';
      case 'night': return '🌙';
      case 'someday': return '🌈';
      case 'yesterday': return '⏰';
      default: return '📝';
    }
  };

  const getCategoryLabel = (category) => {
    switch(category) {
      case 'urgent': return '3endek Gheda Wla Ma3endekch';
      case 'night': return 'Gheda F Lil';
      case 'someday': return 'Chi Nhar Men Layam';
      case 'yesterday': return 'Kan Khesso Ytdar Lbareh';
      default: return 'Regular Task';
    }
  };

  if (loading && tasks.length === 0) {
    return <div className="text-center py-10">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {showExcuse && (
        <ExcusePopup 
          excuse={currentExcuse} 
          onClose={() => setShowExcuse(false)} 
        />
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">GhedaTime Tasks</h1>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add New Task
        </button>
      </div>
      
      <ProcrastinationMeter />
      
      {showForm && (
        <div className="mb-6">
          <TaskForm task={currentTask} onClose={handleFormClose} />
        </div>
      )}
      
      {tasks.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No tasks yet. Add your first task to start procrastinating!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <div 
              key={task._id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                task.status === 'completed' 
                  ? 'border-green-500' 
                  : task.category === 'urgent' 
                    ? 'border-red-500' 
                    : task.category === 'night' 
                      ? 'border-purple-500' 
                      : task.category === 'someday' 
                        ? 'border-blue-500' 
                        : task.category === 'yesterday' 
                          ? 'border-yellow-500' 
                          : 'border-gray-300'
              } transition-all duration-300 ${
                postponingTaskId === task._id ? 'animate-slide-right' : ''
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="mr-2 text-lg">{getCategoryEmoji(task.category)}</span>
                      <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {task.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{getCategoryLabel(task.category)}</p>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleStatusToggle(task)}
                      className="p-1 text-gray-500 hover:text-green-600 rounded"
                      title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEditClick(task)}
                      className="p-1 text-gray-500 hover:text-blue-600 rounded"
                      title="Edit task"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(task._id)}
                      className="p-1 text-gray-500 hover:text-red-600 rounded"
                      title="Delete task"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {task.description && (
                  <p className="text-gray-600 text-sm mt-2 mb-3">{task.description}</p>
                )}
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                  </div>
                  
                  {task.postponeCount > 0 && (
                    <div className="text-xs text-gray-500">
                      Postponed: {task.postponeCount} {task.postponeCount === 1 ? 'time' : 'times'}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => handlePostponeClick(task._id)}
                  disabled={postponingTaskId === task._id}
                  className={`mt-4 w-full py-2 px-4 rounded-md flex items-center justify-center transition-all duration-300 ${
                    postponingTaskId === task._id
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  }`}
                >
                  {postponingTaskId === task._id ? (
                    <>
                      <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                      Postponing...
                    </>
                  ) : (
                    <>
                      Wlakin Gheda
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;