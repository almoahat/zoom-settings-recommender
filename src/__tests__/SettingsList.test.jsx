import React from 'react';
import { render, screen } from '@testing-library/react';
import SettingsList from '../components/SettingsList';

const mockSettings = [
  { key: 'muteOnEntry', label: 'Mute on Entry', category: 'audio', explanation: 'Prevents disruptions' },
  { key: 'waitingRoom', label: 'Waiting Room', category: 'security', explanation: 'Adds a layer of control' },
];

test('renders settings for given profile', () => {
  render(<SettingsList settings={mockSettings} />);
  expect(screen.getByText(/Mute on Entry/i)).toBeInTheDocument();
  expect(screen.getByText(/Waiting Room/i)).toBeInTheDocument();
});
