const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${port}`);
});
