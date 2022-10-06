const express = require("express");
const mongoose = require("mongoose")

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/todo_list", { useNewUrlParser: true })

const todo_schema = new mongoose.Schema({
    username: String,
    password: String,
    todos: [
        {
            todo_name: String,
            todo_img_path: String,
            todo_description: String,
            created_at: {
                type: Date,
                default: Date.now()
            },
            complete: Boolean
        }
    ]
})

const todos = mongoose.model("todos", todo_schema)

app.post("/registration", async (req, res) => {

    if ("username" in req.body && "password" in req.body) {

        if (req.body.username !== "" && req.body.password !== "") {

            var idd = await todos.exists({ username: req.body.username })

            if (idd === null) {

                new_todo = new todos({
                    username: req.body.username,
                    password: req.body.password,
                    todos: []
                })

                new_todo.save((err, suc) => {
                    res.json({ "response": { "ok": true, "_id": suc._id.toString() } })
                })


            } else {
                res.json({ "response": { "ok": false, "error": "Username già esistente!" } })
            }

        } else {
            res.json({ "response": { "ok": false, "error": "Compilare tutti i campi!" } })
        }
    } else {
        res.sendStatus(401)
    }
})

app.post("/login", async (req, res) => {

    if ("username" in req.body && "password" in req.body) {

        if (req.body.username !== "" && req.body.password !== "") {

            var ch_user = await todos.exists({ username: req.body.username, password: req.body.password })

            if (ch_user !== null) {

                res.json({ "response": { "ok": true, "_id": ch_user._id.toString() } })

            } else {
                res.json({ "response": { "ok": false, "error": "Username non esistente!" } })
            }

        } else {
            res.json({ "response": { "ok": false, "error": "Compilare tutti i campi!" } })
        }
    } else {
        res.sendStatus(401)
    }
})

app.use("/add_todo", (req, res, next) => {
    if ("user_id" in req.body && "todo_name" in req.body && "todo_img_path" in req.body && "todo_description" in req.body) {
        if (req.body.user_id !== "" && req.body.todo_name !== "" && req.body.todo_img_path !== "" && req.body.todo_description !== "") {
            next()
        } else {
            res.json({ "response": { "ok": false, "error": "Compilare tutti i campi!" } })
        }
    } else {
        res.sendStatus(401)
    }
})

app.post("/add_todo", (req, res) => {

    todos.findByIdAndUpdate(req.body.user_id,
        {
            "$push": {
                "todos": {
                    "todo_name": req.body.todo_name,
                    "todo_img_path": req.body.todo_img_path,
                    "todo_description": req.body.todo_description,
                    "complete": false
                }
            }
        },

        (err, suc) => {
            if (suc !== null) {
                res.json({ "response": { "ok": true } })
            } else {
                res.json({ "response": { "ok": false } })
            }
        }
    )
})

app.listen(3000, () => {
    console.log("Server in ascolto sulla porta 3000...")
})