/* paste this line in verbatim */
let cells;
let seconds = 60;
let gameon = true;
let myArray = [];
let saveClicked =[];
let saveSquareId =[];
let startgame = false;
let compareValueClickedWithArray =[]
let scoreTwenty = [];
let scoreFive = [];
let leftInTheClock = 0;
let numOfCombination = 0;
let allowToPaly = true;
let secondsLeft = 0;
let emoji = ["&#128512", "&#128514", "&#128520", "&#128525", "&#128525", "&#128545", "&#129312", "&#129314"];

window.onload = function(){
  
  let hideboardgame = document.getElementById("idhideboardgame");
  let startplaying = document.getElementById("idstartplaying"); 
  let game = document.getElementById("idgame");
  let starttime = document.getElementById("idstarttime");
  let joinus = document.getElementById("idjoinus");
  
  /* fucntion that allows to show the board or tiles*/
  /* the board is not available when the first is load only when cliked on start playing menu*/
  startplaying && startplaying.addEventListener("click", function(){

    if(gameon == true) {
      $("#idcreateboard").removeClass("btn-off-visible");
      $("#idhideboardgame").removeClass("btn-off-visible");
      $("#idhideboardgame").addClass("btn-on-visible");
      $("#idcreateboard").addClass("btn-on-visible");
      createBoardGame(15);
      addClickEventToSqaureBoard();
    }
    gameon = false;
    
  });

  //here i define the size of the board or tile, a function with param. 
  function createBoardGame(x) {
    for(var i = 0; i <= x; i ++){
      cells = $('<div>').addClass('box').attr('id', "idsquare" + i).text("");
      cells.addClass('box');
      $('#idgame').append(cells);
    }
  };
 
  /* join membership function button */
  joinus && joinus.addEventListener("click", function(){
    $("#join").removeClass("btn-off-visible");
    $("#join").addClass("btn-on-visible");   
  });

  /* the button to start the time*/
  starttime && starttime.addEventListener("click", function() {
    populateBoardGame();
    myTime();
    populateMyArray();
    document.getElementById("idstarttime").disabled = true;
    
  });
  
  function myTime() {
    
    var elementResult = document.getElementById("idresultofmatch");
    elementResult.innerHTML = "You have 5 Seconds to memorize the board";    
    
    var time = setInterval(function() {
      seconds--;
      // Display the seconds in the element with id="countdown //"
      document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
      if(seconds == 55) {
        elementResult.innerText = "";
        cleanBoardGame(startgame);
      }
      else {
       
       if(numOfCombination == 8) {
         secondsLeft = seconds;
         clearTimeout(time);
         finalScore();
       }
      
       else {
         if(seconds == 0) {
          clearTimeout(time);
           elementResult.innerText = "You run out of time. Try again please.";
           startgame = true;
           timeOut();
           cleanBoardGame(startgame);
         }
         if(startgame == true) {
           startgame = false;
         }
       }
     }
    }, 1000);
  }
    
  function populateMyArray(){ 
    for(let x = 0; x <= 15; x++) {
      let p = Math.floor((Math.random() * 99) + 1);
      if(x == 0) {
        myArray.push(p);
      }
      else {
        for(let y = 0; y < myArray.length; y++) {
          if(myArray[y] == p) {
            break;
          }
          else {
            if(y == myArray.length -1) {
              myArray.push(p);
              break;
            }
            if(myArray.length == 8) {
              x =16;
              break;
            }
          }
        }
      }
    }
  };

  function sortOutFinalArray() {
    for(let y = 0;  y < myArray.length; y++) {
      compareValueClickedWithArray.push(myArray[y]);

      if(y == myArray.length -1){
        var myNewArray = myArray.sort();

        for(let x = 0; x < myArray.length; x++){
          compareValueClickedWithArray.push(myNewArray[x]);
        }
      }
    }
  };

  function populateBoardGame() {
    sortOutFinalArray();
    var y = 0;
    for(let x = 0;  x <= 15; x++){
      var element = document.getElementById("idsquare" + x);
      element.innerText = compareValueClickedWithArray[y];
      y++;
    }
  }

  function cleanBoardGame(cleanBoard) {
    if(cleanBoard == false) {
      for(let x = 0;  x <= 15; x++) {
        var element = document.getElementById("idsquare" + x);
        element.innerText = "";
      }
    }
    else {
      for(let i = 0;  i <= 15; i++) {
        var element = document.getElementById("idsquare" + i);
        element.style.backgroundColor = "white";
      }
    }
  };

  function addClickEventToSqaureBoard(){
    for(let x = 0; x <= 15; x++) {
      var element = document.getElementById("idsquare" + x);
      element && element.addEventListener("click", getValueAfterClick);
    }
    populateMyArray();
  };

  function getValueAfterClick() {
    var element = document.getElementById("idresultofmatch");
    if(startgame == false) {

      if(this.style.backgroundColor !== "wheat") {
        revealValuecliked(this.id);
        saveClicked.push(this.innerText);
        saveSquareId.push(this.id);
      }
      
      if(saveClicked.length == 2) {

        if (saveClicked[0] == saveClicked[1]) {
          element.innerText = "Perfect Match";
          disablePerfectMatch(saveSquareId[0], saveSquareId[1]);
          scoreTwenty.push(20);
          UpDateScores(scoreTwenty);
          numOfCombination++;
          saveClicked =[];
          saveSquareId=[];
          
          if(numOfCombination == 8){
            finalScore();
          }
        }
    
        else {
          scoreFive.push(5);
          cleanwrongguess(saveSquareId[0], saveSquareId[1]);
          saveClicked =[];
          saveSquareId =[];
        } 
      }
    }
    
  };
  
  function revealValuecliked(x){
    if(x.length == 9){
      var i = x.charAt(8);
      var element = document.getElementById(x);
      element.innerText = compareValueClickedWithArray[i];
      
    }
    else {
      var y = x.charAt(8) + x.charAt(9);
      var element = document.getElementById(x);
      element.innerText = compareValueClickedWithArray[y];
    }
  }

  function cleanwrongguess(x, y){
    var element = document.getElementById("idresultofmatch");
    element.innerText = "Wrong Match";
    element.style.color = "black";
    
    var time = setInterval(function(){
      // Display the seconds in the element with id="countdown //"
      var elementOne = document.getElementById(x);
      elementOne.innerText = "";
      
      var elementTwo = document.getElementById(y);
      elementTwo.innerText = "";

      element.innerText = "";
      
      clearInterval(time);
    },700);    
  }

  function disablePerfectMatch(x, y){
    var element = document.getElementById("idresultofmatch");
    element.innerText = "Perfect Match";
    element.style.color = "blue";
    
    var time = setInterval(function(){
      var elementOne = document.getElementById(x);
      elementOne.innerText = "";
      elementOne.style.backgroundColor = "wheat";
      elementOne.disabled = true;
      
      var elementTwo = document.getElementById(y);
      elementTwo.innerText = "";
      elementTwo.style.backgroundColor = "wheat";
      elementTwo.disabled = true;
      
      element.innerText = "";
      
      clearInterval(time);
    },700);    
  }

  function UpDateScores(a){
    var element = document.getElementById("idscores");
    element.innerText =  a.reduce(addUp, 0) ; 
  }

  function addUp(total, num){
    return total + Math.round(num);
  }

  function takeAway(total, num){
    return total + Math.round(num);
  }

  function finalScore() {
    clearInterval(0);
    let x = scoreTwenty.reduce(addUp, 0) * secondsLeft; 

    var element = document.getElementById("idresultofmatch");
    if(x >= 3500) {
      element.innerText = "Well Done. Next Level";
      element.style.color = "blue";
      var elementFinalScore = document.getElementById("idscores");
      elementFinalScore.innerText = x;
    } 
    else {
      element.innerText = "Failed to score minimun of: 3500 Try again.";
      element.style.color = "blue";
    }
  }

  function timeOut() {
    myArray = [];
    compareValueClickedWithArray = [];
    numOfCombination = 0;
    seconds = 60;
    saveClicked =[];
    saveSquareId=[];
    var element = document.getElementById("idscores");
    element.innerText = 0;
    populateMyArray();
    document.getElementById("idstarttime").disabled = false;

  }
};