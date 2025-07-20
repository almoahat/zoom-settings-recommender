// mock-server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// ✅ Enable CORS for all routes and methods
app.use(cors());
app.options('*', cors()); // Preflight requests

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Simulated Zoom PATCH endpoint
app.patch('/api/users/:userId/settings', (req, res) => {
  const { userId } = req.params;
  const payload = req.body;

  console.log(`PATCH /api/users/${userId}/settings`);
  console.log(JSON.stringify(payload, null, 2));

  res.json({
    message: `✅ Simulated Zoom PATCH success for user ${userId}`,
    keysReceived: Object.keys(payload.in_meeting || {})
  });
});

// ✅ Catch-all for unmatched routes (optional)
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock Zoom API running at http://localhost:${PORT}`);
});
