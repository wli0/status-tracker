// Shows client name 

import React from "react";

import React from "react";

function Dashboard({ client }) {
  const statusClass = `status-badge status-${client.status
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  return (
    <div className="card">
      <h2>Client Dashboard</h2>

      <div className="info-row">
        <span className="label">Client Name:</span>
        <span>{client.name}</span>
      </div>

      <div className="info-row">
        <span className="label">Current Status:</span>
        <span className={statusClass}>{client.status}</span>
      </div>

      <div className="info-row">
        <span className="label">Last Updated:</span>
        <span>{new Date(client.updatedAt).toLocaleString()}</span>
      </div>
    </div>
  );
}

export default Dashboard;