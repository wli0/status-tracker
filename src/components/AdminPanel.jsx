// Let's admin choose a status and click update
import React from "react";
import { useEffect, useState } from "react";

const STATUS_OPTIONS = [
  "Received",
  "In Review",
  "Approved",
  "Rejected",
  "Needs Info",
];

function AdminPanel({ client, onUpdate }){
  const [status, setStatus] = useState(client?.status || "Received");

  useEffect(() => {
    if(client){
      setStatus(client.status);
    }
  }, [client]);

  if(!client) return null;

  return(
    <section className="card-panel">
      <h2>Admin Panel</h2>

      <div className="form-section">
        <label htmlFor="statusSelect">Change Status</label>
        <select
          id="statusSelect"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button onClick={() => onUpdate(client.id, status)}>
          Update Status
        </button>
      </div>
    </section>
  );
}

export default AdminPanel;