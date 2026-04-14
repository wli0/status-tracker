/* Main page that brings everything together
1.) fetch client data
2.) display Dashboard
3.) display admin panel
4.) poll backend every few seconds
*/

import React from "react";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard.jsx";
import AdminPanel from "./components/AdminPanel.jsx";

const INITIAL_CLIENTS = [
  {
    id: 1,
    name: "Maria Lopez",
    status: "Received",
    updatedAt: new Date().toLocaleString(),
  },
];

function App(){
  //clients = current client data
  //setClients = function to update client data
  const [clients, setClients] = useState(INITIAL_CLIENTS);

  //notification = toast message text
  //setNotification = function to change the toast message
  const [notification, setNotification] = useState("");

  //rhis effect runs whenever notification changes
  //if a toast message appears, clear it after 3 seconds.
  useEffect(() => {
    if(!notification) return;

    const timer = setTimeout(() => {
      setNotification("");
    }, 3000);

    //cleanup if effect runs again before 3 seconds ends,
    //1remove the old timer first.
    return () => clearTimeout(timer);
  }, [notification]);

  //helper function to send a Discord webhook.
  //it sends a POST request with the client name and status change.
  const triggerNotification = async (clientName, oldStatus, newStatus) => {
    try{
      await fetch("https://discord.com/api/webhooks/1493079642796720138/xcaxNG5rIGo29gNZsKf65Ywej4SNwB1q8_jn-AoFwGIaejS6_ThJKqads80F_grT4WmD", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `Client update: ${clientName} changed from ${oldStatus} to ${newStatus}`,
        }),
      });
    } 
    catch (error) {
      console.error("Webhook failed:", error);
    }
  };

  //runs when admin clicks update status
  const handleUpdate = (clientId, newStatus) => {
    //find the matching client ID 
    const currentClient = clients.find((client) => client.id === clientId);
    //if not found, stop
    if(!currentClient) return;

    //if status didn't change, don't update anything, just show a message.
    if(currentClient.status === newStatus) {
      setNotification(`${currentClient.name} is already ${newStatus}.`);
      return;
    }

    //create a new updated clients array
    //if the client matches, update its status and updatedAt time
    //otherwise keep it the same
    const updatedClients = clients.map((client) =>
      client.id === clientId
        ? {
            ...client,
            status: newStatus,
            updatedAt: new Date().toLocaleString(),
          }
        : client
    );

    setClients(updatedClients);

    triggerNotification(currentClient.name, currentClient.status, newStatus);

    setNotification(
      `${currentClient.name} changed from ${currentClient.status} to ${newStatus}.`
    );
  };

  return(
    <div className="page">
      <div className="app-shell">
        <header className="hero">
          <h1>Real-Time Client Status Tracker</h1>
          <p>Track application progress and update statuses from the admin panel.</p>
        </header>

        {notification && <div className="toast">{notification}</div>}

        <div className="stack-layout">
          <Dashboard client={clients[0]} />
          <AdminPanel
            client={clients[0]}
            onUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;