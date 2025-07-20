import React, { useState } from "react";
import ProfileSelector from "./components/ProfileSelector.jsx";
import SettingsList from "./components/SettingsList.jsx";
import ExportButtons from "./components/ExportButtons.jsx";
import settingsData from "./data/settingsData.js";
import "./App.css"; // ✅ Ensure CSS is imported

function App() {
  const [selectedProfile, setSelectedProfile] = useState("");

  const filteredSettings = selectedProfile
    ? settingsData[selectedProfile] || []
    : [];

  const presets = Object.keys(settingsData).map((profile) => ({ profile }));

  return (
    <div className="app-container">
      <h1 className="main-heading">Zoom Settings Recommender</h1>
      <p className="subheading">Choose a profile to see recommended Zoom settings</p>
      <ProfileSelector
        selectedProfile={selectedProfile}
        onChange={setSelectedProfile}
        presets={presets}
      />
      <SettingsList settings={filteredSettings} />
      {filteredSettings.length > 0 && <ExportButtons settings={filteredSettings} />}
    </div>
  );
}

export default App;
