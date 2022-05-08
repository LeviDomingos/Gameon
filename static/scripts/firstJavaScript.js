/* paste this line in verbatim */
var cells;
var numberofsquares = 16;
let seconds = 60;
let x = 0;
let g = 0;
var gameon = true;
var myArray = [];
var firstclick =0;
var secondclick =0;
var three =3;
var boardArray=[];
var savewrong =[];

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
    gameon = false;  
    
  });
 
  /* join membership function button */
  joinus && joinus.addEventListener("click", function(){
    $("#join").removeClass("btn-off-visible");
    $("#join").addClass("btn-on-visible");   
  });

  /* the button to start the time*/
  starttime && starttime.addEventListener("click", function(){
    
    x = setInterval(function(){
    
     seconds--;
      
      // Display the seconds in the element with id="countdown //"
     document.getElementById("countdown").innerHTML =  " : " + seconds; 
      
     if (seconds == 55){
       cleanboard();
       callClcik();
      }
      else{
        if(seconds ==0){
          clearInterval(x);
          seconds = 60;
        }
      };
    }, 1000);
  
   document.getElementById("starttime").disabled = true;
   fillBoard();
   
  }); 

  function fillUpArray(){ 
    var stopiffull =0;
    for(let i = 0; i < 15; i++){
      if(stopiffull == 9){
        i = 15;
        myArray.pop();
        break;
      }
      else{
        var p = Math.floor(Math.random() * 99) + 1;
        if(i == 0){
          myArray.push(p);
          stopiffull++;
        }
        else{
          for(let x = 0; x < myArray.length; x++){
            if(myArray[x] == p){
              break;
            }
            else{
              if(x == myArray.length -1){
                myArray.push(p);
               stopiffull++;
               break;
              }
            }
          }
        }
      }
    }
  };


  function fillupsquare(){
    fillUpArray();
    for(let x = 0; x < myArray.length; x++){
        var p = x + 1;  
        boardArray.push(myArray[x]);
      }
    sortMyArray();
  };

  function sortMyArray(){
    var newmyArray = myArray.sort();
    for(let x = 0; x < newmyArray.length; x++){
      var y = x + 9;
      boardArray.push(newmyArray[x]);
    }
    myArray = [];
  };
  
  function fillBoard()
  {
    fillupsquare();
    for(let x = 0; x < boardArray.length; x++){
      var y = x + 1;
      document.getElementById('square' + y).innerText = boardArray[x];
    }
  }

  function cleanboard(){
    for(let x = 1;  x <= 16; x++){
      document.getElementById("square" + x).innerText ="";

    }
    //assigned click event to the board
    
  };

  function callClcik(){
    $(function() {
       for (i = 0; i < boardArray.length; i++) {
         (function(i) {
           var s = i + 1
           $("#square" + s).click(function() {
             if(firstclick == 0)
             {
               firstclick = boardArray[i];
               document.getElementById("square" + s).innerText = firstclick;
               savewrong.push(s)
             }
             else
             {
               secondclick = boardArray[i];
               savewrong.push(s);
               document.getElementById("square" + s).innerText = secondclick;

               if(firstclick ==  secondclick){
                 document.getElementById("square" + s).innerText = secondclick;
                 document.getElementById("square" + savewrong[0]).style.backgroundColor = "wheat";
                 document.getElementById("square" + savewrong[1]).style.backgroundColor = "wheat";

                 firstclick = 0;
                 secondclick = 0;
                 savewrong =[];
               }
               else{
                cleanwrongguess();
                 firstclick = 0;
                 secondclick = 0;
                 

               }
              }
           });
        })(i);
      }
     
     });
     desableclick();
  }
  
  function cleanwrongguess(){
       
    g = setInterval(function(){
        // Display the seconds in the element with id="countdown //"
        document.getElementById("square" + savewrong[0]).innerText = "";
        document.getElementById("square" + savewrong[1]).innerText = "";
        savewrong=[];
        clearInterval(g);
    },300);    
  }
  function desableclick(){
    for(var c =1; c < 16; c++){
      if(document.getElementById("square" + c).style.backgroundColor === "wheat"){
        document.getElementById("square" + c).disabled = true;
      }
    }
  }

};