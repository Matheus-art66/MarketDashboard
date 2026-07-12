import React from "react";

const IndicatorCard = ({ title, value, change, icon, trend = 'neutral' }) => {
  const trendColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-500',
  };

  const trendIcon = {
    positive: '↑',
    negative: '↓',
    neutral: '→',
  };

  const bgColor = {
    positive: 'bg-green-50',
    negative: 'bg-red-50',
    neutral: 'bg-gray-50',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 animate-fadeIn">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{title}</span>
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-navy text-lg">
          {icon}
        </div>
      </div>
      <div className="font-mono text-4xl font-bold text-navy mb-3">{value}</div>
      <div className={`text-sm font-medium flex items-center gap-1 px-3 py-1 rounded-full w-fit ${trendColor[trend]} ${bgColor[trend]}`}>
        <span>{trendIcon[trend]}</span>
        <span>{change}</span>
      </div>
    </div>
  );
};
export default IndicatorCard;