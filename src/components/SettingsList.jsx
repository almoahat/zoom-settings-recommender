import React from "react";
import SettingItem from "./SettingItem.jsx";

const SettingsList = ({ settings }) => {
  return (
    <div className="settings-list">
      {settings.length === 0 ? (
        <p>Select a profile to view recommended settings.</p>
      ) : (
        settings.map((setting) => (
          <SettingItem key={setting.name} setting={setting} />
        ))
      )}
    </div>
  );
};

export default SettingsList;
