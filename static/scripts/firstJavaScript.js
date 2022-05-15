/* paste this line in verbatim */
let cells;
let numberofsquares = 15;
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

window.onload = function(){
  
  let hideboardgame = document.getElementById("idhideboardgame");
  let startplaying = document.getElementById("idstartplaying"); 
  let game = document.getElementById("idgame");
  let starttime = document.getElementById("idstarttime");
  let joinus = document.getElementById("idjoinus");
  
  /* fucntion that allows to show the board or tiles*/
  /* the board is not available when the first is load only when cliked on start playing menu*/
  startplaying && startplaying.addEventListener("click", function(){

    if(gameon == true){
      $("#idcreateboard").removeClass("btn-off-visible");
      $("#idhideboardgame").removeClass("btn-off-visible");
      $("#idhideboardgame").addClass("btn-on-visible");
      $("#idcreateboard").addClass("btn-on-visible");

      for(var i = 0; i <= numberofsquares; i ++){
        cells = $('<div>').addClass('box').attr('id', "idsquare" + i).text("");
        cells.addClass('box');
        $('#idgame').append(cells);
      }
      
    }
    addClickEventToSqaureBoard();
    gameon = false;
    
  });
 
  /* join membership function button */
  joinus && joinus.addEventListener("click", function(){
    $("#join").removeClass("btn-off-visible");
    $("#join").addClass("btn-on-visible");   
  });

  /* the button to start the time*/
  starttime && starttime.addEventListener("click", function() {
    populateBoardGame();
    myTime();
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
        startgame = true;
        cleanBoardGame();
      }
      else {
       
       if(numOfCombination == 8) {
         clearTimeout(time);
       }
      
       else {
         if(seconds == 0) {
           elementResult.innerText = "You run out of time. Try again please.";
           seconds = 60;
           numOfCombination = 0;
           clearTimeout(time);
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

    alert(compareValueClickedWithArray);
    var y = 0;
    for(let x = 0;  x <= 15; x++){
      var element = document.getElementById("idsquare" + x);
      element.innerText = compareValueClickedWithArray[y];
      y++;
    }

  }

  function cleanBoardGame(){
    for(let x = 0;  x <= 15; x++){
      var element = document.getElementById("idsquare" + x);
      element.innerText = "";
    }
  };

  function addClickEventToSqaureBoard(){
    for(let x = 0; x <= 15; x++) {
      var element = document.getElementById("idsquare" + x);
      element && element.addEventListener("click", getValueAfterClick);
    };
    populateMyArray();
    
  };

  function getValueAfterClick() {
    var element = document.getElementById("idresultofmatch");
    if(startgame !== false) {

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
        }
        else {
          scoreFive.push(5);
          cleanwrongguess(saveSquareId[0], saveSquareId[1]);
          saveClicked =[];
          saveSquareId =[];
        } 
      }
    }
    if(numOfCombination == 8){
      var elementFinalScore = document.getElementById("idscores");
      var x =  scoreTwenty.reduce(addUp, 0);
      var i = scoreFive.reduce(takeAway, 0);
      var total = x * seconds; 
      alert(total + ":" + i);
      elementFinalScore.innerText = total - i;
      alert(total);
      finalScore(total);
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

  function finalScore(x) {
    var element = document.getElementById("idresultofmatch");
    if(x >= 3500) {
      element.innerText = "Well Done. Next Level";
      element.style.color = "blue";
    } 
    else {
      element.innerText = "Failed to score minimun score: 3500 Try again.";
      element.style.color = "blue";
    }
  }
};