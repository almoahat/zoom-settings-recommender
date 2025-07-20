import React from "react";

const PayloadSidebar = ({ visible, payload, onClose }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100%",
        width: "400px",
        backgroundColor: "#f9f9f9",
        borderLeft: "1px solid #ccc",
        padding: "1rem",
        overflowY: "auto",
        zIndex: 1000,
        boxShadow: "-2px 0 6px rgba(0,0,0,0.1)"
      }}
    >
      <button onClick={onClose} style={{ float: "right" }}>✖</button>
      <h3>PATCH Payload Preview</h3>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(payload, null, 2)}
      </pre>
    </div>
  );
};

export default PayloadSidebar;
