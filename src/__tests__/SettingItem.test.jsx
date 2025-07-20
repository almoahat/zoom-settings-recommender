// src/__tests__/SettingItem.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import SettingItem from '../components/SettingItem';

const setting = {
  label: 'Mute on Entry',
  category: 'audio',
  value: true,
  explanation: 'Prevents disruptions when participants join late.',
};

test('renders label, emoji, and explanation', () => {
  render(<SettingItem setting={setting} />);

  expect(screen.getByText('Mute on Entry')).toBeInTheDocument();
  expect(screen.getByText(/🔈|🔇|🎤|📢/)).toBeInTheDocument(); // optional, you can also use categoryEmoji['audio']
  expect(screen.getByText(/Prevents disruptions/i)).toBeInTheDocument();
});
