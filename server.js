const express = require("express");
const { send } = require("express/lib/response");
const mongoose = require("mongoose")

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/todo_list", { useNewUrlParser: true })

const todo_schema = new mongoose.Schema({
    username:String,
    password:String,
    todos:[
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

app.post("/", async (req, res) => {

    new_todo = new todos({
        username:req.body.username,
        password:req.body.password,
        todos:[
            
        ]
    })

    new_todo.save()
    res.json(req.body)
})

app.post("/add_todo", (req, res) => {
    
    todos.findByIdAndUpdate(req.body.user_id, 
        {
            "$push" : {"todos" : {
                "todo_name": req.body.todo_name,
                "todo_img_path": req.body.todo_img_path,
                "todo_description": req.body.todo_description,
                "complete": false
            }}
        },

        function (err, managerparent) {
            if (err) throw err;
            console.log(managerparent);
        }
    )

    res.send("ok")
})

app.listen(3000, () => {
    console.log("Server in ascolto sulla porta 3000...")

})