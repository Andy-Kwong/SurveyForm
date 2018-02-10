var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

    res.render('index')
})

app.post('/result', function(req, res){

    var submitInfo = {
        name: req.body.name,
        location: req.body.location,
        language: req.body.language,
        comment: req.body.comment,
    }

    res.render('show', form = submitInfo);
})

var server = app.listen(6500, function() {
    console.log("listening on port 6500");
});

var io = require("socket.io").listen(server);

io.sockets.on("connection", function(socket){
    console.log("client/socket is connected!")
    socket.on("submit_form", function(data) {
        console.log("Someone clicked a button!")
        newobj = {
            name : data.name,
            location : data.location,
            language : data.language,
            comment : data.comment,
            number: Math.floor(Math.random()*1001)
        }
        socket.emit("server_response", newobj)
    })
})

