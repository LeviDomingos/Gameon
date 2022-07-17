//"use strict";
let scoreValue = 0;
let startPlaying = 0;
let secondsToPlay = 0;
let myArray =[];
let boardZise = 0;
let populateFinalArray =[];
let gameToPlay = 0; // will select what array of objects to display and play -- could be emoji, numbers etc...
let saveValueCliked =[];
let saveIndex = [];
let countDownTime = 0;
let fiveMinutes = 0;
let perfectMatch =[];
let time = 0;
let levelPlayed =[];//save all the levels played not to reap it
let stringLevelPlayed = "";
let spareTime = 0;
let queryLevelToPlay = 1;
let finalScore = 0;

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
const alphabLetters = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
   "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];
const alphaNumbers = [
  "A", "2", "C", "D", "4", "E", "F", "6", "G", "H", "8", "I", "J", 
  "10", "K", "L", "12", "M", "13", "N", "X", "24", "Y", "25", "Z", "26"
];
const mixedArrays = [
  "LD","CD", "70","&#127914;", "&#127863;", "55", "&#127801;", "B", "5",
  "&#127798;", "&#128692;&#127999;", "LO", "&#129312;", "&#128692;&#127995;", 
  "&#128115;&#127995;", "TA", "TE", "&#129314;", "&#127940;&#127999;", 
  "&#127940;&#127998;", "BA", "&#127940;&#127997;", "&#127940;&#127996;", 
  "&#127919;", "99", "&#127929;"
];

const arrayOfNumbers = [
  99, 89, 66, 56, 10, 26, 40, 11, 4, 7, 6, 2, 77, 
  70, 40, 33, 31, 22, 29, 55, 90, 79, 17, 1, 6, 9
];

window.onload = function() {

  document.querySelectorAll(".dropdown-item").forEach(cell=> cell.addEventListener("click", wellcomeInfo));
  const setValues = document.querySelectorAll(".col-md-4");
  const getMediaQuery = window.matchMedia("(max-width: 412px)");
  
  document.querySelectorAll(".col-md-2").forEach(cell=> cell.addEventListener("click", handleLevelClicked));
  document.getElementById("id-start-time").addEventListener("click", handleButton);
  document.getElementById("id-start-time").disabled = true  ;
  
  function handleButton() {
    const element = document.getElementById("id-board-game");
    countDownTime =  setInterval(playTime, 1000);

    if(element.className === "board-game-one" || element.className === "board-game-two") {
      document.getElementById("id-start-time").disabled = true;
      document.getElementById("id-info").innerText = "Start Now...";
      document.querySelectorAll(".box").forEach(cell=> cell.addEventListener("click", handleEventClickToBox));
      levelPlayed.push(stringLevelPlayed);
    }
    else
    {
      document.getElementById("id-info").innerText = "Memorise de Board...";
      document.getElementById("id-start-time").disabled = true;
      showBoardForFiveSecond();
      levelPlayed.push(stringLevelPlayed);

    }
    startPlaying = 2;
    perfectMatch = [];
    saveValueCliked =[];
    saveIndex = [];
  } 

  function playTime() {
    secondsToPlay--;
    document.getElementById("id-countdown").innerText = secondsToPlay;
    if(secondsToPlay === fiveMinutes) {
      removeAllAfterFiveSeconds();
      document.getElementById("id-info").innerText = "Start Now...";
      document.querySelectorAll(".box").forEach(cell=> cell.addEventListener("click", handleEventClickToBox));
    } 

    if(perfectMatch.length === boardZise && startPlaying == 2) {
      clearInterval(countDownTime);
      secondsLeft = secondsToPlay;
      time = setInterval(totalScore, 900);
    }

    if(secondsToPlay === 0) {
      clearInterval(countDownTime);
      document.getElementById("id-info").innerText = "Try again level:"  + stringLevelPlayed;
      startPlaying = 1; // means that failed to win the level 
      clearInterval(countDownTime);
      if(getMediaQuery.matches) {
        fireEvent(getMediaQuery); // for media query only
      }
    }
  } 

  function totalScore() {
    if(secondsToPlay > 25) {
      finalScore = scoreValue *= secondsToPlay;
      document.getElementById("id-info").innerText = "Total Score: " + finalScore + ". Choose Level";
      const element = document.querySelectorAll(".col-md-2");
      element[stringLevelPlayed -1].style.backgroundColor = "wheat";
      startPlaying = 0; // won the game and play another game
      scoreValue = 0; 
      clearInterval(time);
      if(getMediaQuery.matches) {
        fireEvent(getMediaQuery); // for media query only
      }
   }
   else {
      finalScore = scoreValue -= secondsToPlay; 
      document.getElementById("id-info").innerText = "Total Score:" + finalScore + ", Try again level: " + stringLevelPlayed;
      document.getElementById("id-start-time").disabled = true;
      startPlaying = 1; // represent repeating the level again
      scoreValue = 0;
      clearInterval(time);
      if(getMediaQuery.matches) {
        fireEvent(getMediaQuery); // for media query only
      }
    }  
  } 

  function handleLevelClicked(clickedCellEvent) {
    secondsToPlay = spareTime;
    const cellValue = clickedCellEvent.target;
    const clickedCellIndex = parseInt(cellValue.getAttribute('data-cell-index'));
    if(startPlaying === 0 && !levelAlreadyPlayer(clickedCellIndex)) {
      const cellValue = clickedCellEvent.target;
      const clickedCellIndex = parseInt(cellValue.getAttribute('data-cell-index'));
      document.getElementById("id-info").innerText = "Level: " + cellValue.innerText;
      document.getElementById("id-start-time").disabled = true;
      buildBoardGame();
      populateMyArray();
      stringLevelPlayed = clickedCellIndex;
    }
    else{
      if(startPlaying === 1 && clickedCellIndex === stringLevelPlayed) {
        //means that he failed to win the game or level
        document.getElementById("id-info").innerText = "Level: " + stringLevelPlayed;
        document.getElementById("id-start-time").disabled = false;
        document.getElementById("id-countdown").innerText = spareTime;
        removeAllAfterFiveSeconds();
      }
    }
  } 

  function addAndRemoveClassToBoardGame() {
    const element = document.getElementById("id-board-game");
    if(element.className === "" || element.className !== "") {
      document.getElementById("id-start-time").disabled = false;
      element.className ="";
      const whatGameToPlay = () => Math.floor(Math.random() * 5) + 1; 
      gameToPlay = whatGameToPlay();
      if(gameToPlay === 1) {
        secondsToPlay = 50;
        document.getElementById("id-countdown").innerText = secondsToPlay;
        element.className = "board-game-one";
        return 12;
      }
      else {
        if(gameToPlay === 2) {
          secondsToPlay = 65;
          document.getElementById("id-countdown").innerText = secondsToPlay;
          element.className ="board-game-two";
          return 16;
        }
        else {
          if(gameToPlay === 3) {
            secondsToPlay = 75;
            document.getElementById("id-countdown").innerText = secondsToPlay;
            element.className ="board-game-three";
            fiveMinutes = secondsToPlay - 5;
            return 20;
          }
          else {
            if(gameToPlay === 4 || gameToPlay === 5) {
              secondsToPlay = 90;
              document.getElementById("id-countdown").innerText = secondsToPlay;
              element.className ="board-game-four";
              fiveMinutes = secondsToPlay - 5;
              return 36;
            }
          }
        }
      }
    }

  } 

  function removeChildrenElement() {
  const list = document.getElementById("id-board-game");
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
  } 

  function levelAlreadyPlayer(x) {
  for(let i = 0; i < levelPlayed.length; i++) {
    if(levelPlayed[i]===x) {
      return true;
    }
  }
  } 
  function disablePerfectMatch(x) {
  for(let i = 0; i < perfectMatch.length; i++) {
    if(perfectMatch[i] === x) {
      return true;
    }
  }
  } 

  function validateCell(x, i) {
  startPlaying += 1;
  const ifInfo =  document.getElementById("id-info");
  const totalScore =  document.getElementById("id-scores");
  const element = document.querySelectorAll(".box");
  if(saveValueCliked.length === 0) {
    saveValueCliked.push(x);
    saveIndex.push(i);
    startPlaying = 2;
  }
  else {
    saveIndex.push(i);
   if(saveIndex[0] === saveIndex[1]) {
      saveIndex.pop();
      startPlaying = 2;
    }
    else {
      saveValueCliked.push(x);
      if(saveValueCliked[0] === saveValueCliked[1]) {
        ifInfo.innerText ="Perfect Match";
        element[saveIndex[0]].style.backgroundColor = "wheat";
        element[saveIndex[1]].style.backgroundColor = "wheat"; 
        perfectMatch.push(saveIndex[0]);
        perfectMatch.push(saveIndex[1]);
        scoreValue += 20;
        totalScore.innerText = scoreValue; 
        wipeWrongPerfectGuessBox(saveIndex[0], saveIndex[1]);
        saveValueCliked = [];
        saveIndex = [];
        playTime();
      }
      else {
        ifInfo.innerHTML ="Wrong Match";
        wipeWrongPerfectGuessBox(saveIndex[0], saveIndex[1]);
        saveValueCliked =[];
        saveIndex = [];
      }
    }
  }
  } 

  function handleEventClickToBox(clickedCell) {
  const cellValue = clickedCell.target;
  const cellIndex = parseInt(cellValue.getAttribute('cell-index'));
  if(gameToPlay === 1 && !disablePerfectMatch(cellIndex) && startPlaying === 2) {
    cellValue.innerHTML = emoji[populateFinalArray[cellIndex]];
    validateCell(cellValue.innerHTML, cellIndex);
  }
  else {
    if(gameToPlay === 2 && !disablePerfectMatch(cellIndex) && startPlaying === 2) {
      cellValue.innerText = alphabLetters[populateFinalArray[cellIndex]];
      validateCell(cellValue.innerText, cellIndex);
    }
    else {
      if(gameToPlay === 3 && !disablePerfectMatch(cellIndex)&& startPlaying === 2) {
        cellValue.innerText = alphaNumbers[populateFinalArray[cellIndex]];
        validateCell(cellValue.innerText, cellIndex)
      }
      else{
        if(gameToPlay === 4 && !disablePerfectMatch(cellIndex)&& startPlaying === 2){
          cellValue.innerHTML = mixedArrays[populateFinalArray[cellIndex]];
          validateCell(cellValue.innerHTML, cellIndex);
        }
        else {
          if(gameToPlay === 5 && !disablePerfectMatch(cellIndex) && startPlaying === 2) {
            cellValue.innerHTML = arrayOfNumbers[populateFinalArray[cellIndex]];
            validateCell(cellValue.innerText, cellIndex);
          }
        }
      }
    }
  }
  } 

  function removeAllAfterFiveSeconds() {
  const element = document.querySelectorAll(".box");
  for(let x = 0; x < element.length; x++) {
    element[x].innerHTML ="";
    element[x].style.backgroundColor = "white";
  }
  } 

  function showBoardForFiveSecond() {
  const element = document.querySelectorAll(".box");
  
  if(gameToPlay === 1) {
    for(let x = 0; x < element.length; x++){
      element[x].innerHTML = emoji[populateFinalArray[x]];
    }
  }
  else {
    if(gameToPlay === 2) {
      for(let x = 0; x < element.length; x++){
        element[x].innerHTML = alphabLetters[populateFinalArray[x]];
      }
    }
    else {
      if(gameToPlay === 3) {
       for(let x = 0; x < element.length; x++){
         element[x].innerHTML = alphaNumbers[populateFinalArray[x]];
       }
      }
      else{
        if(gameToPlay === 4) {
          for(let x = 0; x < element.length; x++){
            element[x].innerHTML = mixedArrays[populateFinalArray[x]];
          }
        }
        else {
          if(gameToPlay === 5) {
            for(let x = 0; x < element.length; x++){
              element[x].innerHTML = arrayOfNumbers[populateFinalArray[x]];
            }
          }
        }
      }
    }
  }
  } 

  //  When the user chooses level to play this function builds the board needed to play the game
  function buildBoardGame() {
    removeChildrenElement();
    boardZise = addAndRemoveClassToBoardGame();
    spareTime = secondsToPlay;
    for(let x = 0; x < boardZise; x++ ) {
      const element = $("<div>").attr("cell-index", x).addClass("box").text("");
      //element.addClass("box");
      $("#id-board-game").append(element);
    }
  }

  function ass() {
    for(let x = 0; x < boardZise; x++ ) {
      const element =  document.createElement("div");
      element.setAttribute("cell-index", x);
      element.className = "box";
      document.getElementById("id-board-game").appendChild(element);
  }
  function build() {
    for(var i = 0; i < x; i ++) {
      cells = $('<div>').addClass('box').attr('id', "idsquare" + i).text("");
      cells.addClass("box");
      $('#idgame').append(cells);
    }
  };

  }

  //function produces an array of numbers neeeded for the game. the amount of number or size of array
  //will be dependent of the size of the board-game 
  function populateMyArray() {
  myArray =[];
  populateFinalArray =[];
  const i = boardZise / 2;
  while(myArray.length < i) {
    let p = Math.floor((Math.random() * 25) + 1);
    if(myArray.length === 0) {
      myArray.push(p);
    }
    else{
      for(let x = 0; x < myArray.length; x++) {
        if(myArray[x]=== p) {
          break;
        }
        else {
          if(x === myArray.length -1) {
            myArray.push(p);
          }
        }
      }
    }
  }   
  for(let j= 0;  j < myArray.length; j++) {
    populateFinalArray.push(myArray[j]);
  }
  for(let v = 0;  v < myArray.length; v++) {
    populateFinalArray.push(myArray.sort()[v]);
  }
  return populateFinalArray;
  } 
  //  if the user gets it wrong or right the imagem being displayes is wiped out;
  function wipeWrongPerfectGuessBox(x, y) {
    const element = document.querySelectorAll(".box");
    const ifInfo =  document.getElementById("id-info");
    var time = setInterval(function() {
      element[x].innerText = "";
      element[y].innerText =""
      ifInfo.innerText = "";
      startPlaying = 2;
      clearInterval(time);
    },900);    
  } 

  function fireEvent(mdq) {
    const element =  document.querySelectorAll(".col-md-2");
    if(mdq.matches && levelPlayed.length === 0) {
      element[0].click();
      document.getElementById("id-info").innerText = "Level: " + queryLevelToPlay;
    }
    else {
      if (mdq.matches && startPlaying === 0 && scoreValue === 0) {// won the game If media query matches
        queryLevelToPlay += 1;
        stringLevelPlayed =  queryLevelToPlay;
        element[queryLevelToPlay].click();
        document.getElementById("id-info").innerText = "Total Score: " + finalScore + ". Level: " + queryLevelToPlay;
        fillUpPerfectMatch();
      }
      else {
        if(mdq.matches && startPlaying === 1 && scoreValue === 0) {//lost the game repeat the level
          stringLevelPlayed =  queryLevelToPlay;
          removeAllAfterFiveSeconds();
          element[queryLevelToPlay].click();
          document.getElementById("id-info").innerText = "Total Score: " + finalScore + ",Try again";
          document.getElementById("id-start-time").disabled = false;
          fillUpPerfectMatch();
        }
        else {
          removeAllAfterFiveSeconds();
          document.getElementById("id-info").innerText ="Try again";
          element[queryLevelToPlay].click();
          document.getElementById("id-start-time").disabled = false;
          fillUpPerfectMatch();
        }
      }
    }
  }

  function fillUpPerfectMatch() {
    for(let x = 30;  perfectMatch.length < boardZise; x++) {
      perfectMatch.push(x);
    }
  }

  function wellcomeInfo(selectMenuToShow) {
    
    const cellValue = selectMenuToShow.target;
    const clickedCellIndex = parseInt(cellValue.getAttribute('data-cell-index'));
    const menuInfo = document.querySelectorAll(".col-md-4");
    const mediaQuery = window.matchMedia("(max-width: 412px)");
  
    if(mediaQuery.matches && clickedCellIndex === 0) {
      $(menuInfo[0]).addClass("show-pairs").removeClass("hide-section-two");
      $(menuInfo[1]).addClass("hide-section-two").removeClass("show-pairs");
      $(menuInfo[2]).addClass("hide-section-two").removeClass("show-pairs");
    }
    if(mediaQuery.matches && clickedCellIndex === 1) {
      $(menuInfo[1]).addClass("show-pairs").removeClass("hide-section-two");
      $(menuInfo[0]).addClass("hide-section-two").removeClass("show-pairs");
      $(menuInfo[2]).addClass("hide-section-two").removeClass("show-pairs");
    }
    if(mediaQuery.matches && clickedCellIndex === 2) {
      $(menuInfo[2]).addClass("show-pairs").removeClass("hide-section-two");
      $(menuInfo[0]).addClass("hide-section-two").removeClass("show-pairs");
      $(menuInfo[1]).addClass("hide-section-two").removeClass("show-pairs");
    }
    if(mediaQuery.matches && clickedCellIndex == 3) {
      fireEvent(getMediaQuery); // for media query only
      $(menuInfo[0]).addClass("hide-section-two");
      $(menuInfo[1]).addClass("hide-section-two");
      $(menuInfo[2]).addClass("hide-section-two");
    }
  }
} 