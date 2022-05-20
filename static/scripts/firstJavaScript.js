/* paste this line in verbatim */
let levelselected = 0;
let popularebardgamesize =0;
let levelplaying = 0;
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
  addClickEventToNumbers();
  
  /* fucntion that allows to show the board or tiles*/
  /* the board is not available when the first is load only when cliked on start playing menu*/
  startplaying && startplaying.addEventListener("click", function(){

    if(gameon == true) {
      removeAndAddClass();
    }
    gameon = false;  
  });

  /*this function will show the area in which the board game is displayed when the page is loaded the area is hidden from the user*/
  function removeAndAddClass(){
    $("#idcreateboard").removeClass("btn-off-visible");
    $("#idcreateboard").addClass("btn-on-visible");
    $("#idhideboardgame").removeClass("btn-off-visible");
    $("#idhideboardgame").addClass("btn-on-visible");
  };
 
  /* join membership function button */
  joinus && joinus.addEventListener("click", function(){
    $("#join").removeClass("btn-off-visible");
    $("#join").addClass("btn-on-visible");   
  });

  /* the button to start the time*/
  starttime && starttime.addEventListener("click", function() {
    myTime();
    populateMyArray(levelselected);
    sortOutFinalArray();
    populateBoardGame(popularebardgamesize);
    document.getElementById("idlevel").innerText = levelplaying;
    document.getElementById("idstarttime").disabled = true;
    myArray = [];
    saveClicked =[];
    saveSquareId =[];
    scoreTwenty = [];
    scoreFive = [];
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
       
       if(numOfCombination == levelselected) {
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
    
  /* this function is responsible to fill up the array with numbers or images */
  function populateMyArray(i){ 
    alert(i);
    for(let x = 0; x < 500; x++) {
      let p = Math.floor((Math.random() * 99) + 1);
      if(x == 0) {
        myArray.push(p);
      }
      else {
        var arraysize = myArray.length;
        for(let y = 0; y < arraysize; y++) {
          if(myArray[y] == p) {
            break;
          }
          else {
            if(y == myArray.length-1) {
              myArray.push(p);
              break;
            }
            if(myArray.length == i) {
              x += 501;
              break;
            }
          }
        }
      }
    }
  };

  function sortOutFinalArray() {
    compareValueClickedWithArray = [];
    var arraysize = myArray.length;
    for(let y = 0;  y < arraysize; y++) {
      compareValueClickedWithArray.push(myArray[y]);
    }
    arraysize = myArray.length;
    for(let y = 0;  y < arraysize; y++) {
      compareValueClickedWithArray.push(myArray.sort()[y]);
    }
    
    alert(compareValueClickedWithArray);
  };

  function populateBoardGame(i) {
 
    for(let x = 0;  x < i; x++){
      var element = document.getElementById("idsquare" + x);
      element.innerText = compareValueClickedWithArray[x];
    }
  }

  /*after showing the numbers for 5 seconds i clean the board game */
  function cleanBoardGame(cleanBoard) {
    var cleanChildren = document.getElementById("idgame").children.length;
    if(cleanBoard == false) {

      for(let x = 0;  x < cleanChildren; x++) {
        var element = document.getElementById("idsquare" + x);
        element.innerText = "";
      }
    }
    else {
      for(let i = 0;  i < cleanChildren; i++) {
        var element = document.getElementById("idsquare" + i);
        element.style.backgroundColor = "white";
      }
    }
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
          
          if(numOfCombination == levelselected){
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

  /*if the user select a wrong match this function will tell the user */
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

  /*this function create the board, based on level selected by the user 
  here i define the size of the board or tile, a function with param. */
  function createBoardGame(x) {
    for(var i = 0; i < x; i ++){
      cells = $('<div>').addClass('box').attr('id', "idsquare" + i).text("");
      cells.addClass("box");
      $('#idgame').append(cells);
    }
  }

/*this function add the event click to the board so that when the user clicks in it the object is revaled */
  function addClickEventToSqaureBoard(i){
    for(let x = 0; x < i; x++) {
      var element = document.getElementById("idsquare" + x);
      element && element.addEventListener("click", getValueAfterClick);
    }
    //populateMyArray();
  };


/*-----------------------------------------------------------------------------------------------------------------------------*/

  /*functions that adds the click event to all the level. the addboardGameViaSelectLevel function will create the board game*/
  function addClickEventToNumbers(){
    for(let x = 1; x <= 40; x++) {
      var element = document.getElementById("idlevel" + x);
      element && element.addEventListener("click", addBoardGameViaSelectLevel);
    }
  };
  
  /*this function only applys with the new level have a different board size, tthen i remove the children or the board and 
  create a new board based on selected level*/
  function removeAllChildrenInTheBoard(){
    var getlenghtofchildren = document.getElementById("idgame").children.length;
    for(let x = 0; x < getlenghtofchildren; x++) {
      var element = document.getElementById("idsquare" + x);
      element.remove();
    }
  };


  /*this fucntion remove any previews square board created to allow a new one created based on level selected 
  but if the selected level shares the same board size as the previews one than no need to creat a new one*/
  function removeDivBoard(i, typeofboard){
    var addboardname = document.getElementById("idgame");
    if(addboardname.className === "") {
      addboardname.classList.add(typeofboard);
      createBoardGame(i);
    }
    else {
      var classname = addboardname.className;
      if(addboardname.className === typeofboard) {   
      }
      else{ 
        removeAllChildrenInTheBoard();
        addboardname.classList.remove(classname);
        addboardname.classList.add(typeofboard);
        createBoardGame(i);
      }
    }
   
  }

  /*this fucntion will create the tiles or the game board acordsing to the level selected by the user 
  I have four board game with different sizes; from 4x3; 4x4; 5x4 6x6*/
  function addBoardGameViaSelectLevel() {

    removeAndAddClass();
    if(this.innerText <= 10) {
      removeDivBoard(12, "board-game-one");
      addClickEventToSqaureBoard(12);
      levelselected = 6;
      popularebardgamesize = 12;
      levelplaying = this.innerText;
    }
    else {
      if(this.innerText >= 11 && this.innerText <= 19) {
         removeDivBoard(16, "board-game-two");
         addClickEventToSqaureBoard(16);
         levelselected = 8;
         popularebardgamesize = 16;
         levelplaying = this.innerText;
       } 
       else {
         if(this.innerText >= 20 && this.innerText <= 34) {
           removeDivBoard(20, "board-game-three");
           addClickEventToSqaureBoard(20); 
           levelselected = 10;
           popularebardgamesize = 20
           levelplaying = this.innerText;
         }
         else {
          if(this.innerText >= 35 && this.innerText <= 40) {
           removeDivBoard(36, "board-game-four");
           addClickEventToSqaureBoard(36);
           levelselected = 18;
           popularebardgamesize = 36;
           levelplaying = this.innerText;
          }
        }
      }
    }
  };


};