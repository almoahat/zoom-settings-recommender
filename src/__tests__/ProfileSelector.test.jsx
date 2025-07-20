import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProfileSelector from '../components/ProfileSelector';

const presets = [
  { profile: 'staff', settings: [] },
  { profile: 'student', settings: [] },
];

test('calls onChange handler', () => {
  const handleChange = jest.fn();

  const { getByLabelText } = render(
    <ProfileSelector
      selectedProfile=""
      onChange={handleChange}
      presets={presets}
    />
  );

  fireEvent.change(getByLabelText(/choose a profile/i), {
    target: { value: 'staff' },
  });

  expect(handleChange).toHaveBeenCalledWith('staff');
});
