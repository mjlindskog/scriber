const express = require('express')
const mongoose = require("mongoose")
const app = express()
const port = 3001;

// Database setup
const Scriber = require("./models/ScriberModel");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/scriberdb", {
  useNewUrlParser: true,
  useFindAndModify: true
});

// Scriber Routes
app.use(require("./routes/ScriberRoutes.js"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})