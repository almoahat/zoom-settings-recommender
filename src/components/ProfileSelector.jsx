import React from 'react';

const ProfileSelector = ({ selectedProfile, onChange, presets }) => {
  return (
    <div>
      <label htmlFor="profile">Choose a profile:</label>
      <select
        id="profile"
        value={selectedProfile}
        onChange={(e) => onChange(e.target.value)} // ✅ use prop
        className="profile-dropdown"
      >
        <option value="">-- Choose --</option>
        {presets.map((preset) => (
          <option key={preset.profile} value={preset.profile}>
            {preset.profile}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProfileSelector;
