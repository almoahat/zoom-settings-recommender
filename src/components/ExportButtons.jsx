import React, { useState } from "react";
import {
  handleExportJSON,
  handleExportMarkdown,
  handleExportZoomPayload,
  generateZoomPatchPayload
} from "../utils/export.js";
import PayloadSidebar from "./PayloadSidebar"; // Make sure this component is created

const ExportButtons = ({ settings }) => {
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleApplySettingsToZoom = async () => {
    if (!userId.trim()) {
      setStatus({ type: "error", msg: "Please enter a Zoom user email or ID." });
      return;
    }

    setLoading(true);
    setStatus(null);

    const payload = generateZoomPatchPayload(settings);

    try {
      const res = await fetch(`http://localhost:5001/api/users/${encodeURIComponent(userId)}/settings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");

      setStatus({ type: "success", msg: data.message || `Simulated Zoom PATCH success for user ${userId}.` });
    } catch (err) {
      setStatus({ type: "error", msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  const zoomPayload = generateZoomPatchPayload(settings);

  return (
    <>
      <div className="export-buttons">
        <button className="export-button" onClick={() => handleExportJSON(settings)}>Export as JSON</button>
        <button className="export-button" onClick={() => handleExportMarkdown(settings)}>Export as Markdown</button>
        <button className="export-button" onClick={() => handleExportZoomPayload(settings)}>Export Zoom Payload</button>
        <button
          className="export-button"
          onClick={handleApplySettingsToZoom}
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Applying..." : "Apply to Zoom via API"}
        </button>
        <button
          className="export-button"
          onClick={() => setShowPreview(prev => !prev)}
        >
          {showPreview ? "Hide Payload" : "Preview Payload"}
        </button>
      </div>

      <div className="apply-form">
        <label htmlFor="zoom-user" className="apply-label">Zoom User / Email:</label>
        <input
          id="zoom-user"
          className="apply-input"
          placeholder="teacher@example.org"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      {status && (
        <div className={`status-banner ${status.type}`}>
          {status.msg}
        </div>
      )}

      <PayloadSidebar
        visible={showPreview}
        payload={zoomPayload}
        onClose={() => setShowPreview(false)}
      />
    </>
  );
};

export default ExportButtons;
