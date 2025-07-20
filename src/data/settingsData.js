// src/data/settingsData.js

const settingsData = {
  teacher: [
    {
      name: 'Waiting Room',
      value: 'Enabled',
      category: 'Security',
      reason: 'Prevents unauthorized participants from joining automatically.'
    },
    {
      name: 'Screen Sharing',
      value: 'Host Only',
      category: 'Security',
      reason: 'Restricts screen sharing to avoid disruptions.'
    },
    {
      name: 'Mute Participants Upon Entry',
      value: 'Enabled',
      category: 'Meeting Management',
      reason: 'Reduces background noise when people join.'
    }
  ],
  student: [
    {
      name: 'Breakout Rooms',
      value: 'Enabled',
      category: 'Accessibility',
      reason: 'Supports small group activities or discussions.'
    },
    {
      name: 'Chat',
      value: 'Enabled (Host-only)',
      category: 'Moderation',
      reason: 'Allows participants to communicate with the host without distraction.'
    }
  ]
};

export default settingsData;
