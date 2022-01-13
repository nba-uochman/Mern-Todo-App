// *******************
// npm import
// *******************
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

// app config
const app = express();
const port = process.env.PORT || "8000";

//  mongoose connection
try {
    const config = require(__dirname + "/configSettings");
    mongoose.connect(config.db.connection);
} catch (err) {
    mongoose.connect(process.env.DB_CONFIG);
}

// app use config
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use(cors());
app.use(express.json({
    type: ["application/json", "text/plain"]
}));

// mongoose model
const UniqueId = require(__dirname + "/idModel");
const Todo = require(__dirname + "/model");


// index route
app.get("/todolist", async (req, res) => {
    const findLists = await Todo.find().exec();
    res.json(findLists);
});

// recieve post request from client
app.post("/todolist/new", async (req, res) => {
    // console.log(req.body);

    // for user
    // const userId = req.body.user;
    const newUser = ({
        userId: req.body.user
    });
    try {
        // save todo to db
        const findUser = await UniqueId.find({ userId: req.body.user }).exec();
        // search all user
        if (findUser.length === 0) {
            const saveUser = await UniqueId.create(newUser);
        } else {
            console.log("user already exit");
            var userid = await UniqueId.findOne({ userId: req.body.user }).exec();
            console.log(user);
        }
    } catch (err) {
        console.log(err, "cannot add user....");
    }
    // user ends

    const todoList = req.body.item;

    const newTodo = ({
        item: todoList,
        user: {
            id: userid._id,
            userId: userid.userId
        }
    });

    try {
        // save todo to db
        const saveList = await Todo.create(newTodo);
        // find all list in todoDB
        const findLists = await Todo.find().exec();
        console.log("foundList ", findLists);
        res.json(findLists);
    } catch (err) {
        console.log(err, "cannot run....");
    }


})

// edit / update
app.post("/todolist/:id/edit", async (req, res) => {
    console.log(req.body, req.params.id);
    const itemId = req.params.id;
    const itemText = { item: req.body.item };

    try {
        const editList = await Todo.findByIdAndUpdate(itemId, itemText, { new: true }).exec();

        const findItems = await Todo.find().exec();
        res.json(findItems);
    } catch (err) {
        console.log("cannot find and update");
    }
})

// delete
app.get("/todolist/:id/delete", async (req, res) => {
    const itemId = req.params.id;
    try {
        const deleteItem = await Todo.findByIdAndDelete(itemId).exec();

        const findItem = await Todo.find().exec();

        res.json(findItem);
    } catch (err) {
        console.log(err, " failed to delete");
    }
});

// all other get request not handled will return our react app


// *************************
// ---------DEPLOYMENT
// *************************


__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/build")));

    app.get("*", function (req, res) {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}

app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.listen(port, (err) => {
    if (err) return console.log(err, " failed to start backend");
    console.log(`server runing on port ${port}`);
});


// **************************
//  Code By NBA_UOCHMAN
// **************************