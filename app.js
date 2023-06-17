const express = require("express");

const app = express(); //web application

app.use(express.json());

//route
app.get("/", (req, res) => {
  res.send("Hello world from server");
  res.end;
});

//listening Port

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`connection established at port ${port}`));
