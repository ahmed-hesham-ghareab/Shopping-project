const express = require("express");
const path = require("path");
const app = express();
const { Server } = require("socket.io")
const { getModels } = require("./helpers/general");
const port = 3000;
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const SocketServer = require('./socket');
const axios = require("axios");
const redis = require('redis');

var session = require("express-session");
var flash = require("connect-flash");

app.locals.user_is_logged_in = false;

//___________redis_____________________

let redisClient;
(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();


module.exports.redisClient = redisClient
//______________End redis_______________


getModels().then(function(result) {
    app.locals.models_counts = result;
});

var MongoDBStore = require("connect-mongodb-session")(session);
var store = new MongoDBStore({
    uri: "mongodb://localhost:27017/shop",
    collection: "mySessions",
});

app.use(flash());

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store,
    })
);

module.exports.app = app
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

//____________routes_______________________________
app.use("/admin", require("./routes/dashboard/admin"));
app.use("/website", require("./routes/website/home"));


//____________connect mongoose_______________________________
mongoose.connect("mongodb://localhost:27017/shop");
app.get("/", (req, res) => res.send("Hello Worlxxxxxxxxxxxxxxxxd!"));
const httpServer = app.listen(port, () => console.log(`Example app listening on port ${port}!`));




const io = new Server(httpServer, {
    cors: "*"
});

new SocketServer(io).socketConnection();


// io.on("connection", (socket) => {
//     socket.on("hello", (data) => {
//             console.log("Fired");
//             console.log(data);
//         })
//         // io.emit("allData", allData
// })