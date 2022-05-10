/* paste this line in verbatim */
let cells;
let numberofsquares = 16;
let seconds = 60;
let gameon = true;
let myArray = [];
let saveClicked =[];
let saveSquareId =[];
let startgame = false;
let compareValueClickedWithArray =[]
window.onload = function(){
  
  let hideboardgame = document.getElementById("hideboardgame");
  let startplaying = document.getElementById("startplaying"); 
  let idgame = document.getElementById("idgame");
  let starttime = document.getElementById("starttime");
  let joinus = document.getElementById("joinus");
  
  /* fucntion that allows to show the board or tiles*/

  startplaying && startplaying.addEventListener("click", function(){

    if(gameon == true){
      $("#createboard").removeClass("btn-off-visible");
      $("#hideboardgame").removeClass("btn-off-visible");
      $("#hideboardgame").addClass("btn-on-visible");
      $("#createboard").addClass("btn-on-visible");

      for(var i = 1; i <= numberofsquares; i ++){
        cells = $('<div>').addClass('box').attr('id', "square" + i).text("");
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
  starttime && starttime.addEventListener("click", function(){
    populateBoardGame();
    x = setInterval(function() {
    
     seconds--;
      
      // Display the seconds in the element with id="countdown //"
     document.getElementById("countdown").innerHTML =  " : " + seconds; 
     
     if (seconds == 55){
       startgame = true;
       cleanBoardGame();
       
      }
      else{
        if(seconds ==0){
          clearInterval(x);
          seconds = 60;
        }
      };
    }, 1000);
  
   document.getElementById("starttime").disabled = true;
  });
  
  
  function populateMyArray(){ 
    for(let x = 0; x < 16; x++) {
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
    for(let x = 1;  x <= 16; x++){
      var element = document.getElementById("square" + x);
      element.innerText = compareValueClickedWithArray[y];
      y++;
    }

  }

  function cleanBoardGame(){
    for(let x = 1;  x <= 16; x++){
      var element = document.getElementById("square" + x);
      element.innerText = "";
    }
  };

  function addClickEventToSqaureBoard(){
    for(let x = 1; x <= 16; x++) {
      var element = document.getElementById("square" + x);
      element && element.addEventListener("click", getValueAfterClick);
    };
    populateMyArray();
    
  };

  function getValueAfterClick() {
    if(startgame !== false){
      var element = document.getElementById("resultofmatch");
      
      revealValuecliked(this.id);
      
      saveClicked.push(this.innerText);
      
      saveSquareId.push(this.id);

      if(saveClicked.length == 2) {
        if(saveClicked[0] == saveClicked[1]) {
          
          element.innerText ="Match Found";
          
          saveClicked = [];
          saveSquareId =[];
        }
        else {
          element.innerText = "Wrong Match";
          cleanwrongguess();
          saveClicked =[];
        }
      };
    };
  }
  
  function revealValuecliked(x){
    if(x == "square1"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[0];
    }
    if(x == "square2"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[1];
    }
    if(x == "square3"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[2];
    }
    if(x == "square4"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[3];
    }
    if(x == "square5"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[4];
    }
    if(x == "square6"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[5];
    }
    if(x == "square7"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[6];
    }
    if(x == "square8"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[7];
    }
    if(x == "square9"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[8];
    }
    if(x == "square10"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[9];
    }
    if(x == "square11"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[10];
    }
    if(x == "square12"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[11];
    }
    if(x == "square13"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[12];
    }
    if(x == "square14"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[13];
    }
    if(x == "square15"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[14];
    }
    if(x == "square16"){
      var element = document.getElementById(x).innerText = compareValueClickedWithArray[15];
    }
  };

  function cleanwrongguess(){
    g = setInterval(function(){
        // Display the seconds in the element with id="countdown //"
        var elementOne = document.getElementById(saveSquareId[0]);
        var elementTwo = document.getElementById(saveSquareId[1]);
        elementOne.innerText = "";
        elementTwo.innerHTML = "";
        saveSquareId = [];
        clearInterval(g);
    },400);    
  };

};