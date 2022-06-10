let cells; /*this varible is part of the build up board*/
let switchFromMenuToLevel = 0; /*make sure that user can switch from menu to level */
let controlLightUp = 0;
let controlIdGameOn = 0;
let controlLight = 0; 
let getmediaquery;
let stoptime = 0; /*stop the clock or time from ticking */
let pairsavailable = 0; /** control how many pairs or match are available in the board */
let allowtoclick = false; /* stop user from clicking the board untill all conditions meet a true requirement */
let randomarraytoplay = []; /** to make sure that all arrays with objects are played by the user or player and reset ever time that all are played */
let cannotclicktwice = 0; /* not allow the user to click twice on the same square*/
let popularebardgamesize = 0; /** i fill up the board based on it size */
let levelplaying = 0; /**level playing on select level or fucntion only */
let levelfromstartmenu = 0; /**level to play from the menu only */
let notAllowToPlaySameLevelAgain = []; /*to make sure that the player do not play or select the same level twice and play it again*/
let fiveseconds = 5; /** allow the player to see the obeject to select for five sec and after vanishes  */
let stopclock = 0;
let seconds = 60; /** seconds for the game or time to play each level or section */
let gameon = true;
let myArray = []; /*first array with raandom number, based on the size of the game or pairs to match */
let saveClicked =[]; /**i save the click to make sure the match is perfect */
let saveSquareId =[]; /**i save the square id to macth if selected twice to avoid duplication */
let compareValueClickedWithArray =[]; /**store all the object of the game then compare if matches  */
let scoreTwenty = []; /** everytime the object matches save 20 points */
let scoreFive = []; /**do not match or fails to save 5 points */
let numOfCombination = 0; /**i control the pairs available then if reaches the limit stop the game, no more pair out there:) */
let allowToPaly = false; /* if is true means that the game is on and cannot select any othe rlevel until finishes the current level on */
let secondsLeft = 0; /**make sure if any seconds left than i use to add to score or move to next level */
let failedlevel = 0; /**hold the seconds for the failed level */
const emoji = ["&#129493;&#127996;", "&#127798;", "&#128512;", "&#129495;&#127995;", "&#127947;", "&#9200;", "&#128514;", "&#127947;&#127999;", "&#9201;", "&#128520;", "&#127947;&#127998;", "&#128525;", "&#127947;&#127995;", "&#128525;", "&#128115;&#127996;", "&#128545;", "&#128692;&#127999;", "&#129312;", "&#128692;&#127995;", "&#128115;&#127995;" ,"&#129314;", "&#127940;&#127999;", "&#127940;&#127998;", "&#127940;&#127997;", "&#127940;&#127996;", "&#127940;&#127995;"];
const alphabeticletters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const alphabetandnumbers = ["A", "2", "C", "D", "4", "E", "F", "6", "G", "H", "8", "I", "J", "10", "K", "L", "12", "M", "13", "N", "X", "24", "Y", "25", "Z", "26"];
const mixeofdarrays = ["LD","CD", "70","&#127914;", "&#127863;", "55", "&#127801;", "B", "5", "&#127798;", "&#128692;&#127999;", "LO", "&#129312;", "&#128692;&#127995;", "&#128115;&#127995;", "TA", "TE", "&#129314;", "&#127940;&#127999;", "&#127940;&#127998;", "BA", "&#127940;&#127997;", "&#127940;&#127996;", "&#127919;", "99", "&#127929;"];

window.onload = function() {

  /* i can turn this function on or off to lightup the logo, very optional. */
  /* lightUpGameOn(controlIdGameOn);  */
  /**---------------------------------------------------------------- */

  const closebutton = document.getElementById("closebutton");
  const idhowtoplay = document.getElementById("idhowtoplay");
  const idscoringrules = document.getElementById("idscoringrules");
  const idmenupairs = document.getElementById("idmenupairs");
  const hideboardgame = document.getElementById("idhideboardgame");
  const startplaying = document.getElementById("idstartplaying"); 
  const game = document.getElementById("idgame");
  const starttime = document.getElementById("idstarttime");
  const joinus = document.getElementById("idjoinus");
  
  const registerMemberButton = document.getElementById("submit");
  const loginMemberButton = document.getElementById("submitbt");
  addClickEventToNumbers();


  /**for the login page  */
  loginMemberButton.addEventListener("click", function() {


  });

  /* for the main page */
  registerMemberButton.addEventListener("click", function(){
    let nickname = document.getElementById("nickname");
    let password = document.getElementById("pwd");
    let retypwd = document.getElementById("retypwd");
    let email = document.getElementById("email");

    if(validateFields() === true && validateFields() === true && validatePassword() === true) {
      window.localStorage.setItem("nickname", nickname.innerText);
      window.localStorage.setItem("password", password.innerText);
      window.localStorage.setItem("retypwd", retypwd);
      window.localStorage.setItem("email", email.innerText);
    }
    else {
      alert("Make sure that the nickname, password are not empty and have 4 character at least each.");
    }

  });

  function validateFields(nickname, password, retypepwd, email) {
    if(nickname.length === 0 || password.length === 0 || retypepwd === 0 || email) {
      return false;
    }
  }

  function validateLength() {nickname, password, retypepwd} {
    if(nickname.length < 4 || passwor.length < 4 || retypepwd.length < 4) {
      return false;
    }
  }

  function validatePassword(pwd, retypepwd) {
      if(pwd.length === retypepwd.length && pwd === retypepwd) {
        return true;
      }
    }
  }
  /* fucntion that allows to show the board or tiles*/
  /* the board is not available when the first is load only when cliked on start playing menu*/
  startplaying && startplaying.addEventListener("click", function() {

      if(gameon === true && switchFromMenuToLevel == 0) {
        numOfCombination = 0;
        allowToPaly = true;
        removeAndAddClass();
        levelfromstartmenu = 1;
        gameon = false;
        switchFromMenuToLevel = 1;
      }
      else
      {
        let resultConfirm = confirm("You chose to Play From Level Selection. Would you Like to Switch?");
        if(resultConfirm === true) {
          gameon = true;
          allowToPaly = true;
          switchFromMenuToLevel = 0;
          clearInterval(stoptime);
        }
      }
    clearInterval(controlLight);
  });

  /*light up the logo or game on. A very simple animation, change the background color */
  function lightUpGameOn(x) {
  
    controlLight =  setInterval(function() {
      if(controlLightUp === 0) {
        document.getElementById("id" + x).style.backgroundColor = "black";
        document.getElementById("id" + x).style.color = "orange"; 
        controlLightUp++;
      }
      else
      {
        if(controlLightUp === 1) {
          document.getElementById("id" + x).style.backgroundColor = "#187b00";
          document.getElementById("id" + x).style.color = "white"; 
          x++;
          document.getElementById("id" + x).style.backgroundColor = "black";
          document.getElementById("id" + x).style.color = "orange"; 
          controlLightUp++;
        }        
        else {
          if(controlLightUp === 2) {
            document.getElementById("id" + x).style.backgroundColor = "#187b00";
            document.getElementById("id" + x).style.color = "white"; 
            x++;
            document.getElementById("id" + x).style.backgroundColor = "black";
            document.getElementById("id" + x).style.color = "orange"; 
            controlLightUp++;
          }
          else {
            if(controlLightUp === 3) {
              document.getElementById("id" + x).style.backgroundColor = "#187b00"
              document.getElementById("id" + x).style.color = "white"; 
              x++;
              document.getElementById("id" + x).style.backgroundColor = "black";
              document.getElementById("id" + x).style.color = "orange"; 
              controlLightUp++;
            }
            else {
              if(controlLightUp === 4) {
                document.getElementById("id" + x).style.backgroundColor = "#187b00"
                document.getElementById("id" + x).style.color = "white"; 

                x = 0;
                controlLightUp++;
              }
              else{
                if(controlLightUp === 5) {
                  document.getElementById("id" + x).style.backgroundColor = "blue"; 
                  controlLightUp++;
                }
                else
                {
                  if(controlLightUp === 6) {
                    document.getElementById("id" + x).style.backgroundColor = "#187b00";
                    x++;
                    document.getElementById("id" + x).style.backgroundColor = "blue";
                    controlLightUp++;
                  }        
                  else {
                    if(controlLightUp === 7) {
                      document.getElementById("id" + x).style.backgroundColor = "#187b00";
                      x++;
                      document.getElementById("id" + x).style.backgroundColor = "blue";
                      controlLightUp++;
                    }
                    else {
                      if(controlLightUp === 8) {
                        document.getElementById("id" + x).style.backgroundColor = "#187b00"
                        x++;
                        document.getElementById("id" + x).style.backgroundColor = "blue";
                        controlLightUp++;
                      }
                      else {
                        if(controlLightUp === 9) {
                          document.getElementById("id" + x).style.backgroundColor = "#187b00"
                          x = 0;
                          controlLightUp = 0;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },800);
    
  }

  /*this function will show the area in which the board game is displayed when the page is loaded the area is hidden from the user*/
  function removeAndAddClass(){
    /*jquery */
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
      allowToPaly = true;
      seconds = failedlevel;
      /** play from the level menu */
    if(allowToPaly === true && gameon === true) {
      notAllowToPlaySameLevelAgain.push(levelplaying);
      populateBoardGame(popularebardgamesize);
      stopclock = setInterval(fiveSencondToMemorize, 1000);
      document.getElementById("idstarttime").disabled = true;
      document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
    }   
    else{
      if(gameon === false && allowToPaly === true) {
        /*to play from the start paying menu */
        playFromMenu();
        populateBoardGame(popularebardgamesize);
        stopclock = setInterval(fiveSencondToMemorize, 1000);
        document.getElementById("idstarttime").disabled = true; 
        document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
        
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
        document.getElementById("idresultofmatch").innerText = "Run Out OF Time. Try Again Please.";
        timeOut();
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

    if(randomarraytoplay.length === 0) {
      for(let x = 0;  x < i; x++) {
        var element = document.getElementById("idsquare" + x);
        element.innerText = compareValueClickedWithArray[x];
      }
    }
    else {
      if(randomarraytoplay.length === 1) {
        for(let x = 0;  x < i; x++) {
          var element = document.getElementById("idsquare" + x);
          element.innerHTML = emoji[compareValueClickedWithArray[x]];
        }
      }
      else {
        if(randomarraytoplay.length === 2) {
          for(let x = 0;  x < i; x++) {
            var element = document.getElementById("idsquare" + x);
            element.innerText = alphabeticletters[compareValueClickedWithArray[x]];
          }
        }
        else {
          if(randomarraytoplay.length === 3) {
            for(let x = 0;  x < i; x++) {
              var element = document.getElementById("idsquare" + x);
              element.innerText = alphabetandnumbers[compareValueClickedWithArray[x]];
            }
          }
          else {
            if(randomarraytoplay.length === 4) {
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
    
    if(allowtoclick == true && cannotclicktwice === 0) {
      cannotclicktwice = this.id;
      allowtoclick = false;

      var element = document.getElementById("idresultofmatch");

      if(this.style.backgroundColor === "wheat") {
        cannotclicktwice = 0;
        allowtoclick = true;
          
      }
      else{
        revealValuecliked(this.id);
        saveClicked.push(this.innerText);
        saveSquareId.push(this.id);
        allowtoclick = true;

      }
    }

    else
    {
      if(allowtoclick === true && cannotclicktwice !== this.id) {
        
        allowtoclick = false;
        var element = document.getElementById("idresultofmatch");
        if(this.style.backgroundColor === "wheat") {
          allowtoclick = true;
        }
        else {
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
    //allowtoclick = true;
  };
  
  function revealValuecliked(x) { 
    if(x.length === 9) {
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
      if(randomarraytoplay.length === 0){
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

  addUp = (total, num) =>{
    return total + Math.round(num);
  };

  function finalScore() {
    /* playing from the menu */
    let x = scoreTwenty.reduce(addUp, 0) * secondsLeft; 
    let element = document.getElementById("idresultofmatch");
    var elementFinalScore = document.getElementById("idscores");
    myArray = [];
    saveClicked =[];
    saveSquareId =[];
    scoreTwenty = [];
    scoreFive = [];
    numOfCombination = 0;
    let time = setInterval(function() {
      /**if the user is playing by selecting level than this code runs to validate scores */
      if(gameon === true && allowToPaly === true) {
        if(secondsLeft > 25){
          element.innerText = "Well Done. Select Next Level.";
          element.style.color = "blue";
          elementFinalScore.innerText = x;
          document.getElementById("idstarttime").disabled = true;
          allowToPaly = false;
          randomarraytoplay.push(1);
          resetArayasOfObjects();
          numOfCombination = 0;
          pairsavailable = 0;
          restoreWhiteBackgroundAgain();
        }
        else
        {
          element.innerText = "Failed. Try again please.";
          document.getElementById("idstarttime").disabled = false;
          element.style.color = "blue";
          elementFinalScore.innerText = 0;
          restoreWhiteBackgroundAgain();
        }    
        clearInterval(time);
      }
      else
      {
        if(secondsLeft > 25){
          element.innerText = "Well Done. Next Level.";
          element.style.color = "blue";
          elementFinalScore.innerText = x;
          document.getElementById("idstarttime").disabled = false;
          allowToPaly = false;
          randomarraytoplay.push(1);
          levelfromstartmenu += 1;
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
        }    
        clearInterval(time);
      }
      },900);
  };

  function timeOut() {
    document.getElementById("idstarttime").disabled = false;
    let element = document.getElementById("idresultofmatch");
    element.innerText = "Time out. Try again please.";
    restoreWhiteBackgroundAgain();
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
          alert("Select a different Level Please. You already played level :" +  i + "Thanks");
          return true;
        }
      }
    }
    return false;
  }

  /*this fucntion will create the tiles or the game board acordsing to the level selected by the user 
  I have four board game with different sizes; from 4x3; 4x4; 5x4 6x6*/
  function addBoardGameViaSelectLevel() {
    document.getElementById("idresultofmatch").innerText = "";
    if(starttime.disabled === false & allowToPaly === true && switchFromMenuToLevel === 1) { 
      let resultConfirm = confirm("Would You Like 2 Play By Selecting Level?");
      starttime.disabled = true;
      if(resultConfirm === true) {
        gameon = false;
        allowToPaly = false;
        alert("The Game Will Lock and Allow You 2 Play From Level Selection ONLY. SELECT THE LEVEL YOU WANT PLEASE. THANKS");
        switchFromMenuToLevel = 3;
      }
    }
    else { 
      clearInterval(controlLight);
      if(checkIfHasPlayesThisLevel(this.innerText) === false) {
      
        if(allowToPaly === false) {
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
    }
  }

  function playFromMenu() {
    document.getElementById("idresultofmatch").innerText = "";
    if(allowToPaly === true && gameon ==  false) {
      myArray = [];
      saveClicked =[];
      saveSquareId =[];
      scoreTwenty = [];
      scoreFive = [];
      numOfCombination = 0;
      document.getElementById("idstarttime").disabled = false;
      removeAndAddClass();

      if(levelfromstartmenu  <= 10) {
        removeDivBoard(12, "board-game-one");
        addClickEventToSqaureBoard(12);
        pairsavailable = 6;
        popularebardgamesize = 12;
        document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
        document.getElementById("idlevel").innerText = levelfromstartmenu;
        populateMyArray(pairsavailable);
        sortOutFinalArray();
        seconds = 60;
        failedlevel = seconds;
       
      }
      else {
        if(levelfromstartmenu  >= 11 && levelfromstartmenu  <= 19) {
          removeDivBoard(16, "board-game-two");
          addClickEventToSqaureBoard(16);
          pairsavailable = 8;
          popularebardgamesize = 16;
          document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
          document.getElementById("idlevel").innerText = levelfromstartmenu;
          populateMyArray(pairsavailable);
          sortOutFinalArray();
          seconds = 60; 
          failedlevel = seconds;
        }
        else {
          if(levelfromstartmenu  >= 20 && levelfromstartmenu  <= 34) {
            removeDivBoard(20, "board-game-three");
            addClickEventToSqaureBoard(20); 
            pairsavailable = 10;
            popularebardgamesize = 20
            seconds = 70;
            failedlevel = seconds;
            document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
            document.getElementById("idlevel").innerText = levelfromstartmenu;
            populateMyArray(pairsavailable);
            sortOutFinalArray();
          }
          else {
            if(levelfromstartmenu  >= 35 && levelfromstartmenu <= 40) {
              removeDivBoard(36, "board-game-four");
              addClickEventToSqaureBoard(36);
              pairsavailable = 18;
              popularebardgamesize = 36;
              seconds = 90;
              failedlevel = seconds;
              document.getElementById("idcountdown").innerHTML =  " : " + seconds; 
              document.getElementById("idlevel").innerText = levelfromstartmenu;
              populateMyArray(pairsavailable);
              sortOutFinalArray();
            }
          }
        }
      }
    } 
  }

  /* Media query section for alert message*/
  /**---------------------------------------------------------------------------------------------------- */

  closebutton.addEventListener("click", function(){
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