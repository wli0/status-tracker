/* Main page that brings everything together
1.) fetch client data
2.) display Dashboard
3.) display admin panel
4.) poll backend every few seconds
*/

import React, { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchClient(){
    try{
      const response = await fetch("https://status-tracker-backend.onrender.com/client");

      if (!response.ok){
        throw new Error("Failed to fetch client");
      }

      const data = await response.json();
      setClient(data);
      setError("");
    } 
    catch (error){
      console.log("Fetch error:", error);
      setError("Could not load client data.");
    } 
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClient();

    const interval = setInterval(() => {
      fetchClient();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if(loading){
    return (
      <div className="app">
        <p>Loading client data...</p>
      </div>
    );
  }

  if(error){
    return (
      <div className="app">
        <p>{error}</p>
      </div>
    );
  }

  return(
    <div className="app">
      <div className="container">
        <h1>Real-Time Client Status Tracker</h1>
        <p className="subtitle">
          Track application progress and update statuses from the admin panel.
        </p>

        <Dashboard client={client} />
        <AdminPanel client={client} onStatusUpdated={fetchClient} />
      </div>
    </div>
  );
}

export default App;