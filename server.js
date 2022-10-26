const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;

// Middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Create server
app.listen(PORT, () => {
  console.log(`Server stared at http://localhost:${PORT}`);
});
