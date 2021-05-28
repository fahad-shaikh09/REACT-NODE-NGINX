const express = require("express")
const app = express()

app.get("/server", (req,res) => res.send("Hello World from Node JS App"))

app.listen(5000, ()=> console.log("Node app is listening on port 5000"))

