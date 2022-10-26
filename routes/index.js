const express = require("express");
const apiRouter = express.Router();
const notesRouter = require("./notesRouter");

// Endpoint for /api/notes
apiRouter.use("/notes", notesRouter);

module.exports = apiRouter;
