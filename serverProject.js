//Serverside JS File

var images;
var express = require('express');
var app = express();

var port = 3000;

app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("New attempt");
    console.log("Received: ");
    console.log(JSON.parse(req.query['data']));
    var z = JSON.parse(req.query['data']);

    if (z['action'] == 'generateImage') {
        if (z['num_img'] == 0) {
            images = [];
        }
        generateImage();
        var jsontext = JSON.stringify({
            'action': 'generateImage',
            'highlighted_img': images[images.length - 1],
            'msg': 'New highlighted image generated!!!'
        });
        console.log(jsontext);
        console.log(images);
        // send the response while including the JSON text		
        res.send(jsontext);
    } 
    
    else if (z['action'] == "evaluate") {
        var maxImg = z['maxImg'];
        var win = evaluate(z['selected_images'], maxImg);
        var jsontext = JSON.stringify({
            'action': 'evaluate',
            'win': win,
            'answer': images
        });
        console.log(jsontext);
        res.send(jsontext);
    } else {
        res.send(JSON.stringify({ 'msg': 'error!!!' }));
    }
}).listen(port);
console.log("Server is running! (listening on port " + port + ")");

function generateImage(){
    var randomRow = Math.floor(Math.random()*2) + 1;
    var images = new Array();
    images.push(randomRow);
}

function evaluate(selected, maxImg){
    var selected = new Array();
    for (var i=0; i<images.length; i++) {
        if (images[i] != selected[i]) {
            return false;
        }
    }
    if (selected.length < maxImg) {
        return "pass";
    }
    return true;
}
