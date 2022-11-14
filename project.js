var score = 0;
var maxImg = 0;

function instruct(){
    alert("Instructions \n\nYou can choose from 3 difficulty levels. 2 images will be shown, with one image highlighted. If the highlighted image is clicked, then 2 new images appear. You need to click on the highlighted images in the order that they appeared on the webpage. If a wrong image is clicked, then the game ends!");
}

function play(){
    var output = document.getElementById("box");
    document.getElementById("hh1").innerHTML= "Choose a difficulty level!";
    document.getElementById("a").innerHTML = "EASY";
    document.getElementById("b").innerHTML = "MEDIUM";
    document.getElementById("c").innerHTML = "HARD";

    //document.getElementById("a").onclick = "easy(8)";
    //document.getElementById("b").onclick = "med(14)";
    //document.getElementById("c").onclick = "hard(20)";

    output.innerHTML += "maxImg = "+maxImg; 

    //document.getElementById("hh1").innerHTML= "Click on the highlighted image";
}

function levelSet(num){
    maxImg = num;
}


function exit(){
    document.body.innerHTML="<h1><br/>Thanks for Playing! <br/><br/>Your score: "+score+"<br> You have left the game.</h1>";x
}
