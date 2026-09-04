const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "webserver_status"
});

app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
  db.query("SELECT * FROM website INNER JOIN `status` ON id=wid;", (err, ergebnisse) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(ergebnisse);
  });
});

app.post("/", (req, res) => {
  db.query("INSERT INTO website (name, url) VALUES (?, ?)", [req.body.name, req.body.url], (error, results) => {
    if (error) return res.json({error: error});
      return res.json({});
  })
})


app.listen(3000, () => console.log("Server läuft auf Port 3000"));