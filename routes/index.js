const express = require("express")
require("../database/connect.js")
const schema = require("../database/schema.js")
const showdown = require("showdown")
const router = express.Router()
const fs = require("fs")

router.get("/", (req, res) => {
  res.render("home")
})

router.get("/post", (req, res) => {
  let defaultMD = fs.readFileSync("./public/text/default.md")
  res.render("post", { defaultMD: defaultMD.toString() })
})

router.post("/post", (req, res) => {
  const content = new schema({ idea: req.body.content })
  content
    .save()
    .then(() => {
      res.redirect("ideas")
    })
    .catch(err => {
      console.error(err)
      res.render("post")
    })
})

router.get("/ideas", (req, res) => {
  schema.find({}, function(err, docs) {
    if (!err) {
      let html = []
      const converter = new showdown.Converter()
      for (const md of docs) {
        html.push(converter.makeHtml(md.idea))
      }
      res.render("ideas", { data: html })
    } else {
      throw err
    }
  })
})

module.exports = router
