import express from "express";

import fakeData from "../data/fakeData.js";

interface show {
  _id: string;
}

const app = express();
const port = 3001;

app.get("/health", (req, res) => {
  res.send("Api running...");
});

app.get("/shows", (req, res) => {
  res.json(fakeData.shows);
});

app.get("/shows/:id", (req, res) => {
  const show = fakeData.shows.find((show: show) => show._id === req.params.id);
  res.json(show);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
