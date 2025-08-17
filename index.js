const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

module.exports = app; // export for testing

if (require.main === module) {
  app.listen(3000, () => console.log("Server running on port 3000"));
}

