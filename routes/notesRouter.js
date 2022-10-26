const express = require("express");
const notesRouter = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { parse } = require("path");

notesRouter.get("/", (req, res) => {
  const dbFile = fs.readFileSync("./db/db.json", (err) => console.log(err));
  res.status(200).json(JSON.parse(dbFile));
});

notesRouter.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(parsedData), (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Successfully wrote file");
          }
        });
      }
    });

    const response = {
      status: "Success",
      body: newNote,
    };

    res.status(201).json(newNote);
  } else {
    res.status(500).json({ message: "Error saving note" });
  }
});

notesRouter.delete("/:id", (req, res) => {
  if (req.params.id) {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedDb = JSON.parse(data);
        const dbIndex = parsedDb.findIndex(
          (index) => index.id === req.params.id
        );
        if (dbIndex !== -1) {
          parsedDb.splice(dbIndex, 1);
          fs.writeFile("./db/db.json", JSON.stringify(parsedDb), (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("Successfully deleted note and rewrote file");
              res.status(200).json({ message: "Note deleted!" });
            }
          });
        } else {
          res.status(500).json({ message: "Id not found" });
        }
      }
    });
  } else {
    res.status(500).json({ message: "Not a valid id" });
  }
});

module.exports = notesRouter;
