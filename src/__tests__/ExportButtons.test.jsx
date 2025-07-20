import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ExportButtons from '../components/ExportButtons';

const mockExportJSON = jest.fn();
const mockExportMarkdown = jest.fn();

jest.mock('../utils/export', () => ({
  handleExportJSON: (...args) => mockExportJSON(...args),
  handleExportMarkdown: (...args) => mockExportMarkdown(...args),
}));

describe('ExportButtons', () => {
  it('calls correct export callbacks with correct settings', () => {
    const settings = [
      { name: 'Zoom setting 1', value: true, reason: 'It helps with X' },
      { name: 'Zoom setting 2', value: false, reason: 'It avoids Y' },
    ];

    const { getByText } = render(<ExportButtons settings={settings} />);

    fireEvent.click(getByText(/Export as JSON/i));
    fireEvent.click(getByText(/Export as Markdown/i));

    expect(mockExportJSON).toHaveBeenCalledTimes(1);
    expect(mockExportJSON).toHaveBeenCalledWith(settings);

    expect(mockExportMarkdown).toHaveBeenCalledTimes(1);
    expect(mockExportMarkdown).toHaveBeenCalledWith(settings);
  });
});
