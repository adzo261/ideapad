const express = require("express")
const routes = require("./routes/index")
const path = require("path")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use("/", routes)
app.set("views", path.join(__dirname, "views"))
app.engine("hbs", exphbs({ extname: ".hbs", defaultLayout: "main" }))
app.set("view engine", "hbs")

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
