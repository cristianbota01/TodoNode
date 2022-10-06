const express = require("express")
const mongoose = require("mongoose")

const app = express()
/* app.use(express.json()); */
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/todo_list", { useNewUrlParser: true })
const db = mongoose.connection

const todo_schema = new mongoose.Schema({
    todo_name: String,
    todo_img_path: String,
    todo_description: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    complete: Boolean
})

const todos = mongoose.model("todos", todo_schema)

app.get("/", async (req, res) => {
    console.log(await todos.find())
    res.send("null")
}).get("/ciao", (req, res) => {
    res.send("ciao")
})

app.post("/", async (req, res) => {

    /* new_todo = new todos({
        todo_name: "icoa",
        todo_img_path: "e2rrw",
        todo_description: "rwjhfvjhfgjhgfgejf",
        complete: false
    })

    new_todo.save() */

    console.log(req.body)

})

app.listen(3000, () => {
    console.log("Server in ascolto sulla porta 3000...")

})