//Serverside JS File

var img = new Array();
var rightImg = new Array();

function init(num){
    for (var i = 0; i<num; i++){
        img[i] = Math.random()*4-1;//assigns id 1 - 4 corresponding to an image
        rightImg[i] = Math.random(); //assigns a number from 0 - 1 
    }
}

function checkRight(i, num){

    if(rightImg[i]==num){
        return true;
    }
    else{
        return false;
    }

}