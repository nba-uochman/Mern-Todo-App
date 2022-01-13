const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    item: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UniqueId"
        },
        userId: String,
    }
});

module.exports = mongoose.model("Todo", todoSchema);

