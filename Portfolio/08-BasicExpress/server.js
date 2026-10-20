const express = require("express");
const app = express();
const PORT = 3000;

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/calculate-bmi", (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

if (!Number.isFinite(weight) || !Number.isFinite(height) || weight <= 0 || height <= 0) {
    return res.status(400).send("Enter a valid weight and height.");
  }

    const bmi = (weight / height ** 2) * 10000;

    res.send(`
        <h1>Your BMI is ${bmi.toFixed(2)}</h1>
        <a href="/">Calculate again</a>
    `);
    });
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});