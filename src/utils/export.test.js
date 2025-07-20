// src/utils/export.test.js
import { handleExportJSON, handleExportMarkdown } from './export';

describe('Export Utility Functions', () => {
  const mockSettings = [
    {
      name: 'Waiting Room',
      value: 'Enabled',
      reason: 'Prevents unauthorized access',
    },
    {
      name: 'Screen Sharing',
      value: 'Host Only',
      reason: 'Limits disruptions',
    },
  ];

  beforeEach(() => {
    // Mock Blob and URL.createObjectURL
    global.Blob = jest.fn().mockImplementation((content, options) => ({
      content,
      options,
    }));
    global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/fake-url');

    // Mock anchor click
    document.createElement = jest.fn().mockImplementation(() => ({
      click: jest.fn(),
      set href(href) {},
      set download(name) {},
    }));
  });

  it('should generate and download JSON blob', () => {
    handleExportJSON(mockSettings);

    expect(global.Blob).toHaveBeenCalledWith(
      [JSON.stringify(mockSettings, null, 2)],
      { type: 'application/json' }
    );
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });

  it('should generate and download Markdown blob', () => {
    handleExportMarkdown(mockSettings);

    const expectedMarkdown = `### Waiting Room
- **Value**: Enabled
- **Why**: Prevents unauthorized access

### Screen Sharing
- **Value**: Host Only
- **Why**: Limits disruptions`;

    expect(global.Blob).toHaveBeenCalledWith(
      [expectedMarkdown],
      { type: 'text/markdown' }
    );
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });
});
