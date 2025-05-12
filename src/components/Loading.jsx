import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-3">
          <div className="w-3 h-3 rounded-full bg-[#3b4cca] animate-bounce shadow-lg shadow-[#3b4cca]/20" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-[#3b4cca] animate-bounce shadow-lg shadow-[#3b4cca]/20" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-[#3b4cca] animate-bounce shadow-lg shadow-[#3b4cca]/20" style={{ animationDelay: '300ms' }}></div>
          <div className="w-3 h-3 rounded-full bg-[#3b4cca] animate-bounce shadow-lg shadow-[#3b4cca]/20" style={{ animationDelay: '450ms' }}></div>
        </div>
        <div className="relative">
          <p className="text-[#3b4cca] font-medium text-lg animate-pulse">Loading</p>
          <span className="absolute -right-4 top-0 animate-ellipsis">...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading; 