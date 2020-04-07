const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");

const pdfTemplate = require("./documents");

const app = express();
//define port number
const port = process.env.PORT || 5000;
//define config file
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//post requst for generate pdf and fetch data
app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

app.get("/fetch-pdf", (req, res) => {
   res.sendFile(`${__dirname}/result.pdf`)
});

app.listen(port, () => {
  console.log(`express server run on port ${port}`);
});
