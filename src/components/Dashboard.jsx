// Shows client name 

import React from "react";

function Dashboard({ client }){
  if (!client) return null;

  return (
    <section className="card-panel">
      <h2>Client Dashboard</h2>

      <div className="info-row">
        <span className="label">Client Name:</span>
        <span className="value">{client.name}</span>
      </div>

      <div className="info-row">
        <span className="label">Current Status:</span>
        <span className={`status-pill ${client.status.toLowerCase().replace(/\s+/g, "-")}`}>
          {client.status}
        </span>
      </div>

      <div className="info-row">
        <span className="label">Last Updated:</span>
        <span className="value">{client.updatedAt}</span>
      </div>
    </section>
  );
}

export default Dashboard;