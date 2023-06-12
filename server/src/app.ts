import express from "express";

const app = express();
const port = 3001;

app.get("/health", (req, res) => {
  res.send("Api running...");
});

app.listen(port, () => console.log(`Server is runnig on port ${port}`));
