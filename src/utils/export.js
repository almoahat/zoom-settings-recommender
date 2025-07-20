// src/utils/export.js

export const handleExportJSON = (settings) => {
  const blob = new Blob([JSON.stringify(settings, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "zoom-settings.json";
  a.click();
};

export const handleExportMarkdown = (settings) => {
  const markdown = settings
    .map(
      (setting) =>
        `### ${setting.name}\n- **Value**: ${setting.value}\n- **Why**: ${setting.reason}`
    )
    .join("\n\n");

  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "zoom-settings.md";
  a.click();
};

export function generateZoomPatchPayload(settings) {
  const payload = { in_meeting: {} };

  settings.forEach(({ name, value }) => {
    const val = value.toLowerCase();

    if (name === "Waiting Room") {
      payload.in_meeting.waiting_room = val === "enabled";
    } else if (name === "Screen Sharing") {
      payload.in_meeting.screen_sharing = {
        who_can_share: val.includes("host") ? "host" : "all"
      };
    } else if (name === "Mute Participants Upon Entry") {
      payload.in_meeting.mute_upon_entry = val === "enabled";
    } else if (name === "Breakout Rooms") {
      payload.in_meeting.breakout_room = val === "enabled";
    } else if (name === "Chat") {
      payload.in_meeting.chat = true;
      payload.in_meeting.private_chat = !val.includes("host-only");
    }
  });

  return payload;
}

export function handleExportZoomPayload(settings) {
  const payload = generateZoomPatchPayload(settings);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "zoom-patch-payload.json";
  link.click();
}
