const mongoose = require("mongoose");

const uniqueIdSchema = new mongoose.Schema({
    userId: String
});


module.exports = mongoose.model("UniqueId", uniqueIdSchema);
