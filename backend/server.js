const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const statuses = [
  "Received",
  "In Review",
  "Needs Documents",
  "Approved",
  "Rejected",
];

// simple in-memory client data
let client = {
  id: 1,
  name: "Maria Lopez",
  status: "Received",
  updatedAt: new Date().toISOString(),
};

async function sendNotification(oldStatus, newStatus){
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl){
    console.log("No webhook URL found");
    return;
  }

  try{
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `${client.name}'s status changed from ${oldStatus} to ${newStatus}`,
      }),
    });

    if (!response.ok) {
      console.log("Failed to send Discord notification");
      return;
    }

    console.log("Notification sent");
  } catch (error) {
    console.log("Error sending notification:", error.message);
  }
}

// get current client info
app.get("/client", (req, res) => {
  res.json(client);
});

// update client status
app.post("/client/status", async (req, res) => {
  const newStatus = req.body.status;

  if (!newStatus) {
    return res.status(400).json({ error: "Status is required" });
  }

  if (!statuses.includes(newStatus)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const oldStatus = client.status;

  client.status = newStatus;
  client.updatedAt = new Date().toISOString();

  if (oldStatus !== newStatus){
    await sendNotification(oldStatus, newStatus);
  }

  res.json({
    message: "Status updated",
    client: client,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});