# Zoom Settings Recommender

A user-friendly web app that recommends Zoom meeting settings for different user profiles (e.g., teacher, student) and allows exporting or applying these settings via a Zoom-compatible API.

## Features

- Profile-based Zoom settings suggestions
- Export settings as:
  - JSON
  - Markdown
  - Zoom PATCH API payload
- Inline form to input Zoom user email or ID
- PATCH Zoom settings via a mock API server
- CORS-compliant backend for API requests
- Real-time payload preview in a collapsible sidebar

## How It Works

1. Select a profile from the dropdown (e.g., "teacher").
2. Review the recommended Zoom meeting settings.
3. Export the settings using the provided buttons, or:
4. Enter a Zoom user/email and apply the settings using a simulated PATCH request.
5. Optionally preview the full payload before submission.


### Development & Testing

#### 1. Start the React frontend (development)

```bash
npm run dev
```

Runs the app with hot reload at: [http://localhost:3000](http://localhost:3000)

#### 2. (Optional) Start frontend with default `npm start` script

```bash
npm start
```

Use this if you've configured a production or proxy-ready build (e.g. if serving the app via Express or behind a reverse proxy).

#### 3. Start the Mock Zoom API server

From the project root, run:

```bash
node mock-server.js
```

Simulates the PATCH `/api/users/:id/settings` endpoint on port `5001`.

#### 4. CORS

The mock server includes CORS headers, allowing requests from `http://localhost:3000` without additional configuration.

#### 5. PATCH Preview Panel

Click “Preview Payload” to inspect the full Zoom API PATCH body in a sidebar panel.

#### 6. Example PATCH Payload

```json
{
  "in_meeting": {
    "waiting_room": true,
    "screen_sharing": {
      "who_can_share": "host"
    },
    "mute_upon_entry": true
  }
}
```