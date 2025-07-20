// src/components/SettingItem.jsx
import React from 'react';
import categoryEmoji from '../utils/categoryEmoji';

const SettingItem = ({ setting }) => {
  const { name, category, value, reason } = setting;

  return (
    <div className="setting">
      <div className="setting-title">
        {categoryEmoji[category]} {name}
      </div>
      <div className="setting-explanation">
        <p><strong>Recommended Value:</strong> {value}</p>
        <p><strong>Why this matters:</strong> {reason}</p>
      </div>
    </div>
  );
};

export default SettingItem;
