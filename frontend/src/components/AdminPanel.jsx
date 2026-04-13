// Let's admin choose a status and click update

import React, { useState } from "react";

const statuses = [
  "Received",
  "In Review",
  "Needs Documents",
  "Approved",
  "Rejected",
];

function AdminPanel({ client, onStatusUpdated }){
  const [selectedStatus, setSelectedStatus] = useState(client.status);
  const [message, setMessage] = useState("");

  async function handleUpdate(){
    if (selectedStatus === client.status){
      setMessage("This status is already selected.");
      return;
    }

    try{
      const response = await fetch("https://status-tracker-backend.onrender.com/client/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (!response.ok){
        setMessage("Could not update status.");
        return;
      }

      setMessage("Status updated.");
      onStatusUpdated();
    } catch (error) {
      console.log("Update error:", error);
      setMessage("Something went wrong.");
    }
  }

  return(
    <div className="card">
      <h2>Admin Panel</h2>

      <label htmlFor="status-select" className="label block-label">
        Change Status
      </label>

      <select
        id="status-select"
        className="status-select"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button className="update-button" onClick={handleUpdate}>
        Update Status
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AdminPanel;