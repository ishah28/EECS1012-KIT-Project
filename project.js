//Clientside JS File
//atleast 3 mocha/chai test cases needed

var score = 0;
var maxImg = 0;
var id = 0;
var selectedImages;
var url = "http://localhost:3000/post";

function instruct(){
    alert("Instructions \n\nYou can choose from 3 difficulty levels. 2 images will be shown, with one image highlighted. If the highlighted image is clicked, then 2 new images appear. You need to click on the highlighted images in the order that they appeared on the webpage. If a wrong image is clicked, then the game ends!");
}

function play(){
    document.getElementById("main_page").style.display = "none";
    document.getElementById("level_page").style.display = "inline-block";
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

function level(num) {
    document.getElementById("box").style.display = "none";
    document.getElementById("playboard").style.display = "inline";
    maxImg = num;
    add_images();

    
}

function add_images() {
    var newImg1 = document.createElement("img");
    $(newImg1).attr("src", "images/i1.jpg");
    $(newImg1).attr("alt", "image 1");
    $(newImg1).attr("id", "img1" + id);
    $(newImg1).click({id: "img1"+id}, selectImage); 
    $("#row1").append(newImg1);

    var newImg2 = document.createElement("img");
    $(newImg2).attr("src", "images/i2.jpg");
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
    $(this).css({'margin' : "0px"});
    if (row == 1) {
        var otherRow = 2;
    }
    else {
        var otherRow = 1;
    }
    $("#img" + otherRow + col).css({'border': "none"});
    $("#img" + otherRow + col).css({'margin': "5px"});
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
        $("#img" + highlighted + id).css({'margin': "0px"});
        selectedImages = new Array(id+1).fill(0);
        console.log(selectedImages)
        id++;
    } 
    else if (response['action'] == 'evaluate'){
        var win = response['win'];
        var answer = response['answer'];
        
        if (win == false){
            $("#message").text("Oh no, it's not the right one!")
        } 
        else if (win == "pass") {
            add_images();
        }
        else {
            $("#check").css({'visibility' : 'hidden'});
            alert("GG! You win. Click OK to see result, and play again.")
        }
    }
}

function resetImages() {
    $("img").css({"border": "none"});
}

function displayResult() {
    return true;
}
