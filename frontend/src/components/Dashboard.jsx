// Shows client name 

import React from "react";

function Dashboard({ client }) {
  return (
    <div className="card">
      <h2>Client Dashboard</h2>
      <div className="info-row">
        <span className="label">Client Name:</span>
        <span>{client.name}</span>
      </div>
      <div className="info-row">
        <span className="label">Current Status:</span>
        <span
          className={`status-badge status-${client.status
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {client.status}
        </span>
      </div>
      <div className="info-row">
        <span className="label">Last Updated:</span>
        <span>{new Date(client.updatedAt).toLocaleString()}</span>
      </div>
    </div>
  );
}

export default Dashboard;
