const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || "8000";

// app.get("*", function (req, res) {
//     res.sendFile(path.resolve(__dirname, "frontend", "public", "index.html"));
// });


__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/build")));

    app.get("*", function (req, res) {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}

app.listen(port, (err) => {
    if (err) return console.log(err, " failed to start backend");
    console.log(`server runing on port ${port}`);
});