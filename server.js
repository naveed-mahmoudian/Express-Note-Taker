const express = require("express");
const path = require("path");
const apiRouter = require("./routes/apiRouter");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.static("public"));
app.use(express.json());

// API Router
app.use("/api", apiRouter);

// Routers
app.get("/notes", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/public/index.html"));
});

// Create server
app.listen(PORT, () => {
  console.log(`Server stared at http://localhost:${PORT}`);
});
