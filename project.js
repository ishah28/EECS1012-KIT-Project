//Clientside JS File
//atleast 3 mocha/chai test cases needed

var score = 0;
var maxImg;
var id;
var selectedImages;
var url = "http://localhost:3000/post";
var currentImg;

function instruct(){
    alert("Instructions \n\nYou can choose from 3 difficulty levels. 2 images will be shown, with one image highlighted. If the highlighted image is clicked, then 2 new images appear. You need to click on the highlighted images in the order that they appeared on the webpage. If a wrong image is clicked, then the game ends!");
}

function play(){
    document.getElementById("main_page").style.display = "none";
    document.getElementById("level_page").style.display = "inline-block";
    $("h1").text("Choose a difficulty level!");
}

function homepage(){
    document.getElementById("main_page").style.display = "inline-block";
    document.getElementById("box").style.display = "inline-block";
    document.getElementById("level_page").style.display = "none";
    document.getElementById("playboard").style.display = "none";
    //document.getElementById("lost_game").style.display = "none";
    $("h1").text("Image Randomiser");
}

function recipes(){
    alert("Chocolate Cake:\nhttps://addapinch.com/the-best-chocolate-cake-recipe-ever/ \n\nCheesecake:\nhttps://sugarspunrun.com/best-cheesecake-recipe/ \n\nApple Pie\nhttps://www.foodnetwork.com/recipes/food-network-kitchen/apple-pie-recipe-2011423\n\n");
}

function level(num) {
    maxImg = num;
    id = 0;
    currentImg = 0;
    selectedImages = [];
    $("#row1").text("");
    $("#row2").text("");
    $("h1").text("Click on the highlighted images");
    $("#check").css({'visibility' : 'visible'});

    document.getElementById("box").style.display = "none";
    document.getElementById("lost_game").style.display = "none";
    document.getElementById("playboard").style.display = "inline-block";
    document.getElementById("score").innerHTML = "Score: "+score;
    document.getElementById("countImg").innerHTML = currentImg+"/"+maxImg;
    add_images();
}

function lostGame(){
    document.getElementById("playboard").style.display = "none";
    document.getElementById("lost_game").style.display = "inline-block";
    $("h1").text("Game Over!");
    document.getElementById("hh3").innerHTML = "Oh no, you clicked the wrong image! <br><br> Your score is: "+score;
}

function add_images() {
    var newImg1 = document.createElement("img");
    $(newImg1).attr("src", images());
    $(newImg1).attr("alt", "image 1");
    $(newImg1).attr("id", "img1" + id);
    $(newImg1).click({id: "img1"+id}, selectImage); 
    $("#row1").append(newImg1);

    var newImg2 = document.createElement("img");
    $(newImg2).attr("src", images());
    $(newImg2).attr("alt", "image 1");
    $(newImg2).attr("id", "img2" + id);
    $(newImg2).click({id: "img2"+id}, selectImage); 
    $("#row2").append(newImg2);

    $.post(url+'?data='+JSON.stringify({
        'action':'generateImage',
        'num_img': id
    }),
    response);
}

function selectImage(event) {
    var selected_img = event.data.id;
    var col = selected_img[selected_img.length - 1];
    var row = selected_img[selected_img.length - 2];
    selectedImages[col] = row;
    console.log(selectedImages);
    $(this).css({'border' : "green solid 5px"});
    if (row == 1) {
        var otherRow = 2;
    }
    else {
        var otherRow = 1;
    }
    $("#img" + otherRow + col).css({'border': "white solid 5px"});
}

/*
 * OnClick event handler for the CHECK button
 * send request to the server
 */
function checkResult() {
    if (!selectedImages.includes(0)){
        $.post(
            url+'?data='+JSON.stringify({
            'action':'evaluate', 
            'selected_images': selectedImages,
            'maxImg': maxImg
            }),
            response
        );
    }
    else{
        alert("Please select all highlighted images!!!");
    }
}

function response(data, status){
    var response = JSON.parse(data);
    console.log(data);
    console.log(id);
    if (response['action'] == 'generateImage'){
        resetImages();
        var highlighted = response['highlighted_img'];
        $("#img" + highlighted + id).css({'border': "yellow solid 5px"});
        selectedImages = new Array(id+1).fill(0);
        console.log(selectedImages)
        id++;
    } 
    else if (response['action'] == 'evaluate'){
        var win = response['win'];
        var answer = response['answer'];
        
        if (win == false){
            lostGame();
        } 
        else if (win == "pass") {
            score += (maxImg/5); //for each difficulty level, multiplies points by 1, 2, or 3
            $("#score").text("Score: "+score);
            currentImg++;
            $("#countImg").text(currentImg+"/"+maxImg); //updates image count
            add_images();
        }
        else {
            $("#check").css({'visibility' : 'hidden'});
            score += (maxImg/5); 
            $("#score").text("Score: "+score);
            currentImg++;
            $("#countImg").text(currentImg+"/"+maxImg);
            alert("GG! You win. Click OK to see result, and play again.")
            $("h1").text("Go back to homepage and try another level");
            $("img").off("click");
        }
    }
}

function images(){
    var out = "";
    var num = Math.floor(Math.random()*12+1);

    switch(num){ //randomly generates images to be displayed on webpage
        case 1:
            out = "images/i1.jpg";
            break;
        case 2:
            out = "images/i2.jpg";
            break;
        case 3:
            out = "images/i3.jpg";
            break;
        case 4:
            out = "images/i4.jpeg";
            break;
        case 5:
            out = "images/i5.jpg";
            break;
        case 6:
            out = "images/i6.webp";
            break;
        case 7:
            out = "images/i7.jpg";
            break;
        case 8:
            out = "images/i8.jpg";
            break;
        case 9:
            out = "images/i9.jpg";
            break;
        case 10:
            out = "images/i10.jpeg";
            break;
        case 11:
            out = "images/i11.jpg";
            break;
        case 12:
            out = "images/i12.jpg";
            break;
    }
    return out;
}

function resetImages() { //removes border from previous images
    $("img").css({"border": "white solid 5px"});
}

function displayResult() {
    for (var i=0; i<result.length; i++) {
        if (selectedImages[i] == result[i]) {
            $("#img" + result[i] + i).css({'border': "green solid 5px"});
        }
        else {
            $("#img" + result[i] + i).css({'border': "yellow solid 5px"});
            $("#img" + selectedImages[i] + i).css({'border': "red solid 5px"});
        }
    }
}

function exit(){
    document.body.innerHTML="<h1><br/>Thanks for Playing! <br/><br/>Your score: "+score+"<br> You have left the game.</h1><br/><br/>";
}
