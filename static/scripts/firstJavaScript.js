
let pairsavailable = 0;
let allowtoclick = false; /* stop user from clicking the board untill all conditions meet a true requirement */
let randomarraytoplay = [];
let cannotclicktwice = 0; /* not allow the user to click twice on the same square*/
let popularebardgamesize =0;
let levelplaying = 0;
let cells;
let seconds = 60;
let gameon = true;
let myArray = [];
let saveClicked =[];
let saveSquareId =[];
let compareValueClickedWithArray =[];
let scoreTwenty = [];
let scoreFive = [];
let leftInTheClock = 0;
let numOfCombination = 0;
let allowToPaly = true; /* if is true means that the game is on and cannot select any othe rlevel until finishes the current level on */
let secondsLeft = 0;
const emoje = ["&#129493;&#127996;", "&#127798;", "&#128512;", "&#129495;&#127995;", "&#127947;", "&#9200;", "&#128514;", "&#127947;&#127999;", "&#9201;", "&#128520;", "&#127947;&#127998;", "&#128525;", "&#127947;&#127995;", "&#128525;", "&#128115;&#127996;", "&#128545;", "&#128692;&#127999;", "&#129312;", "&#128692;&#127995;", "&#128115;&#127995;" ,"&#129314;", "&#127940;&#127999;", "&#127940;&#127998;", "&#127940;&#127997;", "&#127940;&#127996;", "&#127940;&#127995;"];
const alphabeticletters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const alphabetandnumbers = ["A", "2", "C", "D", "4", "E", "F", "6", "G", "H", "8", "I", "J", "10", "K", "L", "12", "M", "13", "N", "X", "24", "Y", "25", "Z", "26"];
const mixeofdarrays =["LD","CD", "70","&#127914;", "&#127863;", "55","&#127801;", "B", "5", "&#127798;", "&#128692;&#127999;", "LO", "&#129312;", "&#128692;&#127995;", "&#128115;&#127995;", "TA", "TE", "&#129314;", "&#127940;&#127999;", "&#127940;&#127998;", "BA", "&#127940;&#127997;", "&#127940;&#127996;", "&#127919;", "99", "&#127929;"];

window.onload = function() {
  
  const hideboardgame = document.getElementById("idhideboardgame");
  const startplaying = document.getElementById("idstartplaying"); 
  const game = document.getElementById("idgame");
  const starttime = document.getElementById("idstarttime");
  const joinus = document.getElementById("idjoinus");
  addClickEventToNumbers();
  
  /* fucntion that allows to show the board or tiles*/
  /* the board is not available when the first is load only when cliked on start playing menu*/
  startplaying && startplaying.addEventListener("click", function(){

    if(gameon === true) {
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
  joinus && joinus.addEventListener("click", function() {
    $("#join").removeClass("btn-off-visible");
    $("#join").addClass("btn-on-visible");   
  });

  /* the button to start the time*/
  starttime && starttime.addEventListener("click", function() {
    if(allowToPaly === true) {
      myTime();
      populateMyArray(pairsavailable);
      sortOutFinalArray();
      populateBoardGame(popularebardgamesize);
      document.getElementById("idlevel").innerText = levelplaying;
      document.getElementById("idstarttime").disabled = true;
      myArray = [];
      saveClicked =[];
      saveSquareId =[];
      scoreTwenty = [];
      scoreFive = [];
    };
    allowToPaly = false;
  });


  function myTime() {
    seconds--;
    var elementResult = document.getElementById("idresultofmatch");
    // Display the seconds in the element with id="countdown //"
    document.getElementById("idcountdown").innerHTML =  " : " + seconds; 

    let stoptime = setInterval(function(){
      
      if(seconds == 55) {
        elementResult.innerText = "";
        cleanBoardAfterFiveSeconds();
        allowtoclick = true;
      }
      if(numOfCombination === pairsavailable){
        allowToPaly = true;
        secondsLeft = seconds;
        finalScore();
        clearInterval(stoptime);
      }

      if(seconds === 0) {
        clearInterval(stoptime);
        elementResult.innerText = "You run out of time. Try again please.";
        timeOut();
      }
    },1000);
  }
    
  /* this function is responsible to fill up the array with numbers or images */
  function populateMyArray(i) { 
    compareValueClickedWithArray = [];
    for(let x = 0; x < 500; x++) {
      let p = Math.floor((Math.random() * 26) + 1);
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
            if(myArray.length === i) {
              x += 501;
              break;
            }
          }
        }
      }
    };
  }

  function sortOutFinalArray(){
    var arraysize = myArray.length;
    for(let y = 0;  y < arraysize; y++) {
      compareValueClickedWithArray.push(myArray[y]);
    }
    arraysize = myArray.length;
    for(let y = 0;  y < arraysize; y++) {
      compareValueClickedWithArray.push(myArray.sort()[y]);
    }
  }

  function populateBoardGame(i){

    if(randomarraytoplay.length == 0) {
      for(let x = 0;  x < i; x++) {
        var element = document.getElementById("idsquare" + x);
        element.innerText = compareValueClickedWithArray[x];
      }
    }
    else {
      if(randomarraytoplay.length == 1) {
        alert(compareValueClickedWithArray);
        for(let x = 0;  x < i; x++) {
          var element = document.getElementById("idsquare" + x);
          element.innerHTML = emoje[compareValueClickedWithArray[x]];
        }
      }
      else {
        if(randomarraytoplay.length == 2) {
          for(let x = 0;  x < i; x++) {
            var element = document.getElementById("idsquare" + x);
            element.innerText = alphabeticletters[compareValueClickedWithArray[x]];
          }
        }
        else {
          if(randomarraytoplay.length == 3) {
            for(let x = 0;  x < i; x++) {
              var element = document.getElementById("idsquare" + x);
              element.innerText = alphabetandnumbers[compareValueClickedWithArray[x]];
            }
          }
          else {
            if(randomarraytoplay.length == 4) {
              for(let x = 0;  x < i; x++) {
                var element = document.getElementById("idsquare" + x);
                element.innerHTML = mixeofdarrays[[compareValueClickedWithArray[x]]];
                randomarraytoplay = [];
              }
            }
          }
        }

      }

    }
  }

  /*after showing the numbers for 5 seconds i clean the board game */
  function cleanBoardAfterFiveSeconds() {
    var cleanChildren = document.getElementById("idgame").children.length;
    for(let x = 0;  x < cleanChildren; x++) {
      var element = document.getElementById("idsquare" + x);
      element.innerText = "";
    }
  };

  function restoreWhiteBackgroundAgain() {
    var cleanChildren = document.getElementById("idgame").children.length;
    for(let i = 0;  i < cleanChildren; i++) {
      var element = document.getElementById("idsquare" + i);
      element.style.backgroundColor = "white";
    }
  };
 
  function getValueAfterClick() {
    
    if(allowtoclick == true && cannotclicktwice == 0) {
      cannotclicktwice = this.id;
      allowtoclick = false;

      var element = document.getElementById("idresultofmatch");

      if(this.style.backgroundColor !== "wheat") {
        revealValuecliked(this.id);
        saveClicked.push(this.innerText);
        saveSquareId.push(this.id);
        allowtoclick = true;
      } 
    }

    else
    {
      if(allowtoclick == true && cannotclicktwice !== this.id) {
        
        allowtoclick = false;
        var element = document.getElementById("idresultofmatch");
        if(this.style.backgroundColor !== "wheat") {
          revealValuecliked(this.id);
          saveClicked.push(this.innerText);
          saveSquareId.push(this.id);
          if(saveClicked.length === 2) {
            if (saveClicked[0] === saveClicked[1]) {
              element.innerText = "Perfect Match";
              disablePerfectMatch(saveSquareId[0], saveSquareId[1]);
              scoreTwenty.push(20);
              UpDateScores(scoreTwenty);
              numOfCombination++;
              myTime();
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
          else {
            allowtoclick = true;
          } 
        } 
      }

    }
  };
  
  function revealValuecliked(x) { 
    if(x.length === 9) {
      var i = x.charAt(8);
      var element = document.getElementById(x);
      if(randomarraytoplay.length === 0){
        element.innerText = compareValueClickedWithArray[i];
      }
      if(randomarraytoplay.length === 1){
        element.innerHTML = emoje[compareValueClickedWithArray[i]];
      }
      if(randomarraytoplay.length === 2){
        element.innerText = alphabeticletters[compareValueClickedWithArray[i]];
      }
      if(randomarraytoplay.length === 3){
        element.innerText = alphabetandnumbers[compareValueClickedWithArray[i]];
      }
      if(randomarraytoplay.length === 4){
        element.innerHTML = mixeofdarrays[compareValueClickedWithArray[i]];
      }
    }
    else {
      var y = x.charAt(8) + x.charAt(9);
      var element = document.getElementById(x);
      if(randomarraytoplay.length === 0){
        element.innerText = compareValueClickedWithArray[y];
      }
      if(randomarraytoplay.length === 1){
        element.innerHTML = emoje[compareValueClickedWithArray[y]];
      }
      if(randomarraytoplay.length === 2){
        element.innerText = alphabeticletters[compareValueClickedWithArray[y]];
      }
      if(randomarraytoplay.length === 3){
        element.innerText = alphabetandnumbers[compareValueClickedWithArray[y]];
      }
      if(randomarraytoplay.length === 4){
        element.innerHTML = mixeofdarrays[compareValueClickedWithArray[y]];
      }
    }
  };

  /*if the user select a wrong match this function will tell the user */
  function cleanwrongguess(x, y) {
    var element = document.getElementById("idresultofmatch");
    element.innerText = "Wrong Match";
    element.style.color = "black";
    
    var time = setInterval(function() {
      // Display the seconds in the element with id="countdown //"

      var elementOne = document.getElementById(x);
      elementOne.innerText = "";
      
      var elementTwo = document.getElementById(y);
      elementTwo.innerText = "";

      element.innerText = "";
      allowtoclick = true;
      cannotclicktwice = 0;
      clearInterval(time);
      
    },900);    
  };

  function disablePerfectMatch(x, y) {
    var element = document.getElementById("idresultofmatch");
    element.innerText = "Perfect Match";
    element.style.color = "blue";
    
    var time = setInterval(function() {
      var elementOne = document.getElementById(x);
      elementOne.innerText = "";
      elementOne.style.backgroundColor = "wheat";
      elementOne.disabled = true;
      
      var elementTwo = document.getElementById(y);
      elementTwo.innerText = "";
      elementTwo.style.backgroundColor = "wheat";
      elementTwo.disabled = true;
      
      element.innerText = "";
      allowtoclick = true;
      cannotclicktwice = 0; 
      clearInterval(time);
     
    },900);    
  };

  function UpDateScores(a) {
    var element = document.getElementById("idscores");
    element.innerText =  a.reduce(addUp, 0) ; 
  }

  addUp = (total, num) =>{
    return total + Math.round(num);
  };

  function finalScore() {
    
    let x = scoreTwenty.reduce(addUp, 0) * secondsLeft; 

    let element = document.getElementById("idresultofmatch");
    let time = setInterval(function() {
      if(secondsLeft > 25) {
        ++levelplaying;
        element.innerText = "Well Done. Next Level";
        element.style.color = "blue";
        var elementFinalScore = document.getElementById("idscores");
        elementFinalScore.innerText = x;
        randomarraytoplay.push(1);
        restoreWhiteBackgroundAgain();
        document.getElementById("idstarttime").disabled = false;
        //document.getElementById("idlevel").innerText = levelplaying;
        allowToPaly = true;
        seconds = 60;
        clearInterval(time);
      } 
      else {
        element.innerText = "Failed. Try again please.";
        element.style.color = "blue";
        document.getElementById("idstarttime").disabled = false;
        allowToPaly = true;
        restoreWhiteBackgroundAgain();
        clearInterval(time);
      }
     
    },900);
  };

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
    restoreWhiteBackgroundAgain();
  };

  /*this function create the board, based on level selected by the user 
  here i define the size of the board or tile, a function with param. */
  function createBoardGame(x) {
    for(var i = 0; i < x; i ++) {
      cells = $('<div>').addClass('box').attr('id', "idsquare" + i).text("");
      cells.addClass("box");
      $('#idgame').append(cells);
    }
  };

  /*this function add the event click to the board so that when the user clicks in it the object is revaled */
  function addClickEventToSqaureBoard(i){
    for(let x = 0; x < i; x++) {
      var element = document.getElementById("idsquare" + x);
      element && element.addEventListener("click", getValueAfterClick);
    }
    //populateMyArray();
  };


  /*-----------------------------------------------------------------------------------------------------------------------------*/

  /*functions that adds the click event to all the level. the addboardGameViaSelectLevel function will create the board game */
  function addClickEventToNumbers() {
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

    if(allowToPaly === true) {

      removeAndAddClass();
      if(this.innerText <= 10) {
        removeDivBoard(12, "board-game-one");
        addClickEventToSqaureBoard(12);
        pairsavailable = 6;
        popularebardgamesize = 12;
        levelplaying = this.innerText;
        seconds = 60;
        document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
        document.getElementById("idlevel").innerText = levelplaying;
      }
      else {
        if(this.innerText >= 11 && this.innerText <= 19) {

          removeDivBoard(16, "board-game-two");
          addClickEventToSqaureBoard(16);
          pairsavailable = 8;
          popularebardgamesize = 16;
          levelplaying = this.innerText;
          seconds = 80;
          document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
          document.getElementById("idlevel").innerText = levelplaying;
        }

        else {

          if(this.innerText >= 20 && this.innerText <= 34) {
            removeDivBoard(20, "board-game-three");
            addClickEventToSqaureBoard(20); 
            pairsavailable = 10;
            popularebardgamesize = 20
            levelplaying = this.innerText;
            seconds = 90;
            document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
            document.getElementById("idlevel").innerText = levelplaying;
          }

          else {
            if(this.innerText >= 35 && this.innerText <= 40) {
              removeDivBoard(36, "board-game-four");
              addClickEventToSqaureBoard(36);
              pairsavailable = 18;
              popularebardgamesize = 36;
              levelplaying = this.innerText;
              seconds = 120;
              document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
              document.getElementById("idlevel").innerText = levelplaying;
            }
          }
          
        }
      }
    }
  };

};