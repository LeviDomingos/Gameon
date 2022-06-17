let cells; //this varible is part of the build up boar
let controlIdGameOn = 0;
let getmediaquery;
let stoptime = 0; //top the clock or time from ticking 
let pairsavailable = 0; //control how many pairs or match are available in the board 
let allowtoclick = false; //stop user from clicking the board untill all conditions meet a true requirement 
let randomarraytoplay = []; //to make sure that all arrays with objects are played by the user or player and 
//reset ever time that all are played 
let cannotclicktwice = 0; //not allow the user to click twice on the same square
let popularebardgamesize = 0; // i fill up the board based on it size 
let levelplaying = 1; //level playing on select level or fucntion only 
let levelfromstartmenu = 1; //level to play from the menu only
let notAllowToPlaySameLevelAgain = []; //to make sure that the player do not play or select the same level twice and play it again
let fiveseconds = 5; //allow the player to see the obeject to select for five sec and after vanishes
let stopclock = 0;
let seconds = 60; // seconds for the game or time to play each level or section 
let gameon = true;
let myArray = []; //first array with raandom number, based on the size of the game or pairs to match 
let saveClicked =[]; // i save the click to make sure the match is perfect */
let saveSquareId =[]; // i save the square id to macth if selected twice to avoid duplication 
let compareValueClickedWithArray =[]; // store all the object of the game then compare if matches  
let scoreTwenty = []; // everytime the object matches save 20 points */
let scoreFive = []; // do not match or fails to save 5 points */
let numOfCombination = 0; // i control the pairs available then if reaches the limit stop the game, no more pair out there:)
let allowToPaly = false; // if is true means that the game is on and cannot select any othe rlevel until finishes the current level on 
let secondsLeft = 0; // make sure if any seconds left than i use to add to score or move to next level 
let failedlevel = 0; // hold the seconds for the failed level 
const emoji = [
  "&#129493;&#127996;", "&#127798;", "&#128512;", 
  "&#129495;&#127995;", "&#127947;", "&#9200;",
  "&#128514;", "&#127947;&#127999;", "&#9201;", 
  "&#128520;", "&#127947;&#127998;", "&#128525;", 
  "&#127947;&#127995;", "&#128525;", "&#128115;&#127996;", 
  "&#128545;", "&#128692;&#127999;", "&#129312;", 
  "&#128692;&#127995;", "&#128115;&#127995;",
  "&#129314;", "&#127940;&#127999;", "&#127940;&#127998;", 
  "&#127940;&#127997;", "&#127940;&#127996;", "&#127940;&#127995;"
];
const alphabeticletters = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
   "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];
const alphabetandnumbers = [
  "A", "2", "C", "D", "4", "E", "F", "6", "G", "H", "8", "I", "J", 
  "10", "K", "L", "12", "M", "13", "N", "X", "24", "Y", "25", "Z", "26"
];
const mixeofdarrays = [
  "LD","CD", "70","&#127914;", "&#127863;", "55", "&#127801;", "B", "5",
  "&#127798;", "&#128692;&#127999;", "LO", "&#129312;", "&#128692;&#127995;", 
  "&#128115;&#127995;", "TA", "TE", "&#129314;", "&#127940;&#127999;", 
  "&#127940;&#127998;", "BA", "&#127940;&#127997;", "&#127940;&#127996;", 
  "&#127919;", "99", "&#127929;"
];

window.onload = function() {

  //i can turn this function on or off to lightup the logo, very optional.
  //lightUpGameOn(controlIdGameOn);

  const closeButton = document.getElementById("closebutton");
  const idhowtoplay = document.getElementById("idhowtoplay");
  const idscoringrules = document.getElementById("idscoringrules");
  const idmenupairs = document.getElementById("idmenupairs");
  const starttime = document.getElementById("idstarttime");
  addClickEventToNumbers();
  removeDivBoard(12, "board-game-one");
  starttime.disabled = true;
  // fucntion that allows to show the board or tiles
  // the board is not available when the first is load only when cliked on start playing menu
  // this function will show the area in which the board game is displayed when the page is loaded the area is hidden from the user
  
  function removeAndAddClass(){
    //jquery
    $("#idcreateboard").removeClass("btn-off-visible");
    $("#idcreateboard").addClass("btn-on-visible");
    $("#idhideboardgame").removeClass("btn-off-visible");
    $("#idhideboardgame").addClass("btn-on-visible");
  };

  if(playOnsmallDevice()) {
    document.getElementById("idstarttime").disabled = false;
  }

  /* the button to start the time*/
  starttime && starttime.addEventListener("click", function() {
    seconds = failedlevel;
    allowToPaly = true 
    /** play from the level menu */
    if(playOnsmallDevice()) {
      stopclock = setInterval(fiveSencondToMemorize, 1000);
      document.getElementById("idstarttime").disabled = true;
      document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
      PlayFlailedLevel(levelfromstartmenu);
      populateBoardGame(popularebardgamesize);

    }
    else {

      if(allowToPaly && gameon) {
        notAllowToPlaySameLevelAgain.push(levelplaying);
        populateBoardGame(popularebardgamesize);
        stopclock = setInterval(fiveSencondToMemorize, 1000);
        document.getElementById("idstarttime").disabled = true;
        document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
        gameon = false;
      }   
      else
      {
        if(!gameon && allowToPaly){
          //the player must repeat the same level
          stopclock = setInterval(fiveSencondToMemorize, 1000);
          document.getElementById("idstarttime").disabled = true;
          document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
          PlayFlailedLevel(levelplaying);
          populateBoardGame(popularebardgamesize);
        }
      }
    }
  });

  /*depending on the level allow player to see the board with its images for few seconds before playing*/
  function fiveSencondToMemorize(){
    fiveseconds--;
    let elementResult = document.getElementById("idresultofmatch");
    elementResult.innerText = "Few Seconds to memorize the board " + fiveseconds;
    if(fiveseconds == 0){
      elementResult.innerText = "";
      cleanBoardAfterFiveSeconds();
      allowtoclick = true;
      stoptime = setInterval(myTime, 1000);
      clearInterval(stopclock);
      fiveseconds = 5;
    }
  }

  function myTime() {
    seconds--;    
    // Display the seconds in the element with id="countdown //"
    document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
      if(numOfCombination === pairsavailable){
        allowToPaly = true;
        secondsLeft = seconds;
        finalScore();
        clearInterval(stoptime);
      }
      if(seconds === 0) {
        clearInterval(stoptime);
        seconds = 0;
        document.getElementById("idresultofmatch").innerText = "Run Out OF Time. Try Again Please.";
        document.getElementById("idstarttime").disabled = false;
        compareValueClickedWithArray = [];
        restoreWhiteBackgroundAgain();
       
      } 
  }
    
  /* this function is responsible to fill up the array with numbers or images */
  function populateMyArray(i) { 
    compareValueClickedWithArray = [];
    for(let x = 0; x < 500; x++) {
      let p = Math.floor((Math.random() * 25) + 1);
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
    alert("You are playing LEVEL : " + levelplaying + " Thanks");
    if(levelplaying == 1 || levelplaying ==  6 || levelplaying == 12 || 
      levelplaying == 16 || levelplaying == 20 || levelplaying == 25 || 
      levelplaying == 28 || levelplaying == 34 || levelplaying == 38) {

      for(let x = 0;  x < i; x++) {
        var element = document.getElementById("idsquare" + x);
        element.innerText = compareValueClickedWithArray[x];
      }
    }
    else {
      if(levelplaying == 2 || levelplaying == 7 || levelplaying === 11 || 
        levelplaying == 17 || levelplaying == 21 || levelplaying == 27 ||
        levelplaying == 29 || levelplaying == 33 || levelplaying == 37) {

        for(let x = 0;  x < i; x++) {
          var element = document.getElementById("idsquare" + x);
          element.innerHTML = emoji[compareValueClickedWithArray[x]];
        }
      }
      else {
        if(levelplaying == 3 || levelplaying == 8 || levelplaying == 13 || 
          levelplaying == 18 || levelplaying == 22 || levelplaying == 26 ||
          levelplaying == 30 || levelplaying == 32 || levelplaying == 36) {

          for(let x = 0;  x < i; x++){
            var element = document.getElementById("idsquare" + x);
            element.innerText = alphabeticletters[compareValueClickedWithArray[x]];
          }
        }
        else {
          if(levelplaying == 4 || levelplaying == 9 || levelplaying == 14 || 
            levelplaying == 19 || levelplaying == 23 || levelplaying == 31 ||
            levelplaying == 39) {

            for(let x = 0;  x < i; x++) {
              var element = document.getElementById("idsquare" + x);
              element.innerText = alphabetandnumbers[compareValueClickedWithArray[x]];
            }
          }
          else {
            if(levelplaying == 5 || levelplaying == 10 || levelplaying == 15 || 
              levelplaying == 24 || levelplaying == 35 || levelplaying == 40) {
              for(let x = 0;  x < i; x++) {
                var element = document.getElementById("idsquare" + x);
                element.innerHTML = mixeofdarrays[[compareValueClickedWithArray[x]]];
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
      element.innerHTML ="";
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
    
    if(allowtoclick == true && cannotclicktwice === 0 && compareValueClickedWithArray.length > 1) {
      cannotclicktwice = this.id;
      allowtoclick = false;

      var element = document.getElementById("idresultofmatch");

      if(this.style.backgroundColor === "wheat") {
        cannotclicktwice = 0;
        allowtoclick = true;
          
      }
      else{
        revealValueclicked(this.id);
        saveClicked.push(this.innerText);
        saveSquareId.push(this.id);
        allowtoclick = true;

      }
    }

    else
    {
      if(allowtoclick === true && cannotclicktwice !== this.id && compareValueClickedWithArray.length > 1) {
        
        allowtoclick = false;
        var element = document.getElementById("idresultofmatch");
        if(this.style.backgroundColor === "wheat") {
          allowtoclick = true;
        }
        else {
          revealValueclicked(this.id);
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
    //allowtoclick = true;
  };
  
  function revealValueclicked(x) { 
    if(x.length === 9 && compareValueClickedWithArray.length > 1) {
      var i = x.charAt(8);
      var element = document.getElementById(x);
      if(randomarraytoplay.length === 0){
        element.innerText = compareValueClickedWithArray[i];
      }
      if(randomarraytoplay.length === 1){
        element.innerHTML = emoji[compareValueClickedWithArray[i]];
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
      if(randomarraytoplay.length === 0 && compareValueClickedWithArray.length > 1){
        element.innerText = compareValueClickedWithArray[y];
      }
      if(randomarraytoplay.length === 1){
        element.innerHTML = emoji[compareValueClickedWithArray[y]];
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

  const addUp = (total, num)=> total + Math.round(num);

  function finalScore() {
    /* playing from the menu */
    let x = scoreTwenty.reduce(addUp, 0) * secondsLeft; 
    let element = document.getElementById("idresultofmatch");
    let elementFinalScore = document.getElementById("idscores");
    numOfCombination = 0;
    let time = setInterval(function() {
      /**if the user is playing by selecting level than this code runs to validate scores */
      if(playOnsmallDevice()) {
        if(secondsLeft > 25){
          element.innerText = "Well Done. Next Level.";
          element.style.color = "blue";
          elementFinalScore.innerText = x;
          document.getElementById("idstarttime").disabled = false;
          compareValueClickedWithArray =[];
          randomarraytoplay.push(1);
          levelfromstartmenu += 1;
          levelplaying = levelfromstartmenu;
          resetArayasOfObjects();
          restoreWhiteBackgroundAgain();
        }
        else {
          element.innerText = "Failed. Try again please.";
          document.getElementById("idstarttime").disabled = false;
          element.style.color = "blue";
          restoreWhiteBackgroundAgain();
          compareValueClickedWithArray = [];
        }
      }
      else {
     
        if(secondsLeft > 25){
          element.innerText = "Well Done. Next Level.";
          element.style.color = "blue";
          elementFinalScore.innerText = x;
          document.getElementById("idstarttime").disabled = true;
          allowToPaly = false;
          gameon = true;
          compareValueClickedWithArray =[];
          randomarraytoplay.push(1);
          resetArayasOfObjects();
          restoreWhiteBackgroundAgain();
        }
        else
        {
          element.innerText = "Failed. Try again please.";
          document.getElementById("idstarttime").disabled = false;
          element.style.color = "blue";
          elementFinalScore.innerText = 0;
          restoreWhiteBackgroundAgain();
          compareValueClickedWithArray = [];
          gameon = false;
        }
      }    
      clearInterval(time);
    },900);
  };

  function resetArayasOfObjects() {
    if(randomarraytoplay.length > 4){
      randomarraytoplay = [];
    }
  }

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


  /*this checks if the player selected the same level if he did not allow to play again but select a different one */
  function checkIfHasPlayesThisLevel(i) {
    let n = notAllowToPlaySameLevelAgain.length;
    if(n > 0) {
      for(let x = 0;  x < n; x++) {
        if(notAllowToPlaySameLevelAgain[x] === i){
          alert("Select a different Level Please. You already played level : " +  i + ". Thank you.");
          return true;
        }
      }
    }
    return false;
  }

  //his fucntion will create the tiles or the game board acordsing to the level selected by the user 
  //I have four board game with different sizes; from 4x3; 4x4; 5x4 6x6
  function addBoardGameViaSelectLevel() {
    document.getElementById("idresultofmatch").innerText = "";
    if(!allowToPaly && !checkIfHasPlayesThisLevel(this.innerText)) {
      levelplaying = this.innerText;
      myArray = [];
      saveClicked =[];
      saveSquareId =[];
      scoreTwenty = [];
      scoreFive = [];
      numOfCombination = 0;
      document.getElementById("idstarttime").disabled = false;
      removeAndAddClass();
      if(this.innerText <= 10) {
        removeDivBoard(12, "board-game-one");
        addClickEventToSqaureBoard(12);
        pairsavailable = 6;
        popularebardgamesize = 12;
        document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
        document.getElementById("idlevel").innerText = this.innerText;
        populateMyArray(pairsavailable);
        sortOutFinalArray();
        seconds = 60;
        failedlevel = seconds;
      
      }
      else {
        if(this.innerText >= 11 && this.innerText <= 19) {
          removeDivBoard(16, "board-game-two");
          addClickEventToSqaureBoard(16);
          pairsavailable = 8;
          popularebardgamesize = 16;
          document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
          document.getElementById("idlevel").innerText = this.innerText;
          populateMyArray(pairsavailable);
          sortOutFinalArray();
          seconds = 60;
          failedlevel = seconds;
        }
        else {
          if(this.innerText >= 20 && this.innerText <= 34) {
            removeDivBoard(20, "board-game-three");
            addClickEventToSqaureBoard(20); 
            pairsavailable = 10;
            popularebardgamesize = 20
            seconds = 70;
            failedlevel = seconds;
            document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
            document.getElementById("idlevel").innerText = this.innerText;
            populateMyArray(pairsavailable);
            sortOutFinalArray();
          }
          else {
            if(this.innerText >= 35 && this.innerText <= 40) {
              removeDivBoard(36, "board-game-four");
              addClickEventToSqaureBoard(36);
              pairsavailable = 18;
              popularebardgamesize = 36;
              seconds = 90;
              failedlevel = 90;
              document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
              document.getElementById("idlevel").innerText = this.innerText;
              populateMyArray(pairsavailable);
              sortOutFinalArray();
            }
          }
        }
      }
    }
  }
 
  //play from here if fails level
  function PlayFlailedLevel(levelplaying) {
    document.getElementById("idresultofmatch").innerText = "";
    numOfCombination = 0;
    document.getElementById("idstarttime").disabled = true;
    if(levelplaying <= 10) {
      removeDivBoard(12, "board-game-one");
      addClickEventToSqaureBoard(12);
      pairsavailable = 6;
      popularebardgamesize = 12;
      document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
      document.getElementById("idlevel").innerText = levelplaying;
      populateMyArray(pairsavailable);
      sortOutFinalArray();
      seconds = 60;
      failedlevel = seconds;
    
    }
    else {
      if(levelplaying >= 11 && levelplaying <= 19) {
        removeDivBoard(16, "board-game-two");
        addClickEventToSqaureBoard(16);
        pairsavailable = 8;
        popularebardgamesize = 16;
        document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
        document.getElementById("idlevel").innerText =levelplaying;
        populateMyArray(pairsavailable);
        sortOutFinalArray();
        seconds = 60;
        failedlevel = seconds;
      }
      else {
        if(levelplaying >= 20 && levelplaying <= 34) {
          removeDivBoard(20, "board-game-three");
          addClickEventToSqaureBoard(20); 
          pairsavailable = 10;
          popularebardgamesize = 20
          seconds = 70;
          failedlevel = seconds;
          document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
          document.getElementById("idlevel").innerText = levelplaying;
          populateMyArray(pairsavailable);
          sortOutFinalArray();
        }
        else {
          if(levelplaying >= 35 && levelplaying <= 40) {
            removeDivBoard(36, "board-game-four");
            addClickEventToSqaureBoard(36);
            pairsavailable = 18;
            popularebardgamesize = 36;
            seconds = 90;
            failedlevel = 90;
            document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
            document.getElementById("idlevel").innerText = levelplaying;
            populateMyArray(pairsavailable);
            sortOutFinalArray();
          }
        }
      }
    }
  }

  // Media query section for alert message*/
  /**---------------------------------------------------------------------------------------------------- */


  function playOnsmallDevice() {
    myArray = [];
    saveClicked =[];
    saveSquareId =[];
    scoreTwenty = [];
    scoreFive = [];
    numOfCombination = 0;
    const getmediaquery = window.matchMedia("(max-width: 400px)");
    if (getmediaquery.matches) { // If media query matches
      document.getElementById("idstarttime").disabled = false;
      return true;
    }
  }
  closeButton.addEventListener("click", function(){
    //this.parentNode.style.display = "hidden";
    let element = document.getElementById("idcallout");
    element.classList.remove("show-pairs");
    element.classList.add("hide-pairs");
  });

    /*this an alert message for the menu. when the user click on pairs */
  idmenupairs.addEventListener("click", function(){

    getmediaquery = window.matchMedia("(max-width: 400px)");
    if (getmediaquery.matches) { // If media query matches
      let element = document.getElementById("idcallout");
      element.classList.remove("hide-pairs");
      element.classList.add("show-pairs");
      let elementtitle = document.getElementById("callouttitle");
      elementtitle.innerText = "Pairs";
      let elementinfo = document.getElementById("calloutinfo");
      elementinfo.innerText = "Pairs is a memory game where you need to match pairs of tiles. " + 
      "Playing is very simple - you turn over one tile and then try to find a matching tile. " + 
      "In some levels, all the tiles are revealed initially for a 5 seconds. " +
      "This makes it easier to score a perfect recall as it as  assumes you remember where each tile is.";
    } 
  });

   /*this an alert message for the menu. when the user click on how to play */

   idhowtoplay.addEventListener("click", function() {
    getmediaquery = window.matchMedia("(max-width: 400px)");
    if (getmediaquery.matches) { // If media query matches
      let element = document.getElementById("idcallout");
      element.classList.remove("hide-pairs");
      element.classList.add("show-pairs");
      let elementtitle = document.getElementById("callouttitle");
      elementtitle.innerText = "How To Play";
      let elementinfo = document.getElementById("calloutinfo");
      elementinfo.innerText = "Playing is very simple - you turn over one tile and then try to find a matching tile. " +
      "When you click on the first tile - beacuse you have been given the oportunity to memorize the board " +
      "you should be able to rember the matching tile. ";
    } 

   });

   /*this an alert message for the menu. when the user click scoring rules */
  idscoringrules.addEventListener("click", function(){
    getmediaquery = window.matchMedia("(max-width: 400px)");
    if (getmediaquery.matches) { // If media query matches
      let element = document.getElementById("idcallout");
      element.classList.remove("hide-pairs");
      element.classList.add("show-pairs");
      let elementtitle = document.getElementById("callouttitle");
      elementtitle.innerText = "Scoring Rules";
      let elementinfo = document.getElementById("calloutinfo");
      elementinfo.innerText = "Each time you make a successful match you score 20 points. " +
      "If you fail to match you score miner 5." + 
      "At the end of a level, if successful, you score a bonus of the number of seconds remaining.";
    }
  });

};