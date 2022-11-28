//Clientside JS File
//atleast 3 mocha/chai test cases needed

var score = 0;
var maxImg = 0;
var imgId = 1;

function instruct(){
    alert("Instructions \n\nYou can choose from 3 difficulty levels. 2 images will be shown, with one image highlighted. If the highlighted image is clicked, then 2 new images appear. You need to click on the highlighted images in the order that they appeared on the webpage. If a wrong image is clicked, then the game ends!");
}

function play(){
    var output = document.getElementById("box");
    //output.style.borderColor = "rgb(0, 19, 128)";

    //the main page disappear and the page to choose level shows up
    document.getElementById("main_page").style.display = "none";
    document.getElementById("level_page").style.display = "inline-block";
}

function level(num) {
    document.getElementById("box").style.display = "none";
    document.getElementById("playboard").style.display = "inline";

    maxImg = num;
}

function add_images() {
    var row1 = document.getElementById("row1");
    var row2 = document.getElementById("row2");
    
    if (imgId<maxImg){
        var cell_1 = row1.insertCell(0);//TODO: send request to serverside to get randomly generated img id
        cell_1.innerHTML = "<img src= 'images/i1.jpg' alt='image 1'>";
        //cell_1.style.borderColor = "red";
        var cell_2 = row2.insertCell(0);
        cell_2.innerHTML = "<img src= 'images/img.jpg' alt='image 2'>";
    }
    if(imgId==maxImg){
        alert("You've reached max number of images");
    }
    imgId++;
}

function homepage(){
    document.getElementById("main_page").style.display = "inline-block";
    document.getElementById("box").style.display = "inline-block";
    document.getElementById("level_page").style.display = "none";
    document.getElementById("playboard").style.display = "none";
}

function recipes(){
    alert("Chocolate Cake:\nhttps://addapinch.com/the-best-chocolate-cake-recipe-ever/ \n\nCheesecake:\nhttps://sugarspunrun.com/best-cheesecake-recipe/ \n\n");
}

function exit(){
    document.body.innerHTML="<h1><br/>Thanks for Playing! <br/><br/>Your score: "+score+"<br> You have left the game.</h1>";
}
