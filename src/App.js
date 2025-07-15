import React, { useState } from 'react';
import presets from './data/presets.json';
import explanationMap from './data/explanation_map.json';
import settingCategories from './data/setting_categories.json';
import './App.css';

function App() {
  const [selectedProfile, setSelectedProfile] = useState('classroom');
  const settings = presets[selectedProfile];

  return (
    <div className="app-container">
      <h1>Zoom Settings Recommender</h1>

      <label htmlFor="profile-select">Select context:</label>
      <select
        id="profile-select"
        value={selectedProfile}
        onChange={(e) => setSelectedProfile(e.target.value)}
      >
        {Object.keys(presets).map((key) => (
          <option key={key} value={key}>
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
          </option>
        ))}
      </select>

      <h2>Recommended Settings</h2>
      <button onClick={handleExport} className="export-button">
  📦    Export as JSON
      </button>
      <button onClick={handleMarkdownExport} className="export-button" style={{ marginLeft: '0.75rem' }}>
  📝    Export as Markdown
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Object.entries(settings).map(([setting, value]) => {
          const category = settingCategories[setting];
          return (
            <li key={setting} className="setting">
              <div className="setting-title">
                {category && (
                  <span
                    style={{
                      color: category.color,
                      marginRight: '0.5rem',
                      fontWeight: 'bold'
                    }}
                    aria-label={category.label}
                    title={category.label}
                  >
                    {category.emoji}
                  </span>
                )}
                {setting}: {value.toString()}
              </div>
              <p className="setting-explanation">{explanationMap[setting]}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const handleExport = () => {
  const fileData = JSON.stringify(settings, null, 2);
  const blob = new Blob([fileData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${selectedProfile}-zoom-settings.json`;
  a.click();
};

const handleMarkdownExport = () => {
  let md = `## Recommended Zoom Settings (${selectedProfile.charAt(0).toUpperCase() + selectedProfile.slice(1)})\n\n`;

  Object.entries(settings).forEach(([setting, value]) => {
    const explanation = explanationMap[setting];
    md += `- **${setting}**: \`${value.toString()}\`\n`;
    if (explanation) {
      md += `  - _Why this matters_: ${explanation}\n\n`;
    }
  });

  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${selectedProfile}-zoom-settings.md`;
  a.click();
};


export default App;
