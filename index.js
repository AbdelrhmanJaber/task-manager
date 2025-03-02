const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ name: "abdo", title: "software engineer" });
});

const logger = (req, res, next) => {
  console.log(req.method, req.url, new Date().getFullYear());
  next();
};

app.get("/contact", logger, (req, res) => {
  res.end("Contact page");
});

app.all("*", (req, res) => {
  res.end("<h1>unavailable resource</h1>");
});

app.listen(5000, () => {
  console.log("The server is listening on port 5000");
});
