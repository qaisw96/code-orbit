import React from 'react';
import { IBadgeProps } from './Badge.types';

const Badge: React.FC<IBadgeProps> = ({ language }) => {
  const getLanguageColor = (language: string) => {
    switch (language.toLowerCase()) {
      case 'javascript':
        return 'bg-yellow-700 text-white';
      case 'typescript':
        return 'bg-blue-700 text-white';
      case 'python':
        return 'bg-green-700 text-white';
      case 'java':
        return 'bg-red-700 text-white';
      case 'ruby':
        return 'bg-red-900 text-white';
      case 'html':
      case 'css':
        return 'bg-purple-700 text-white';
      default:
        return 'bg-gray-700 text-white';
    }
  };

  return (
    <span
      className={`inline-block px-2 py-1 w-fit text-xs font-semibold rounded-md ${getLanguageColor(
        language
      )}`}>
      {language}
    </span>
  );
};

export default Badge;
