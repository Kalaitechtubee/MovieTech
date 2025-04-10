import React from 'react';
import PropTypes from 'prop-types';

export const LoadingSpinner = ({ size = 40, color = '#000000' }) => {
  // Convert string sizes to numbers
  const getSize = () => {
    if (typeof size === 'string') {
      switch (size.toLowerCase()) {
        case 'small':
          return 20;
        case 'medium':
          return 40;
        case 'large':
          return 60;
        default:
          return 40;
      }
    }
    return size;
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full border-4 border-t-transparent"
        style={{
          width: getSize(),
          height: getSize(),
          borderColor: color,
        }}
      />
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['small', 'medium', 'large'])
  ]),
  color: PropTypes.string,
}; 