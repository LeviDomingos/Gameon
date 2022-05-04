/* paste this line in verbatim */
var cells = 16;
let seconds = 60;
let x = 0;


window.onload = function(){
  
  let hideboardgame = document.getElementById("hideboardgame");
  let startplaying = document.getElementById("startplaying"); 
  let idgame = document.getElementById("idgame");
  let starttime = document.getElementById("starttime");
  let joinus = document.getElementById("joinus");
  
  /* fucntion that allows to show the board or tiles*/

  startplaying && startplaying.addEventListener("click", function(){
    $("#createboard").removeClass("btn-off-visible");
    $("#hideboardgame").removeClass("btn-off-visible");
    $("#hideboardgame").addClass("btn-on-visible");
    $("#createboard").addClass("btn-on-visible");
    for(var i = 1; i <= cells; i ++){
      cells = $('<div>').addClass('box').attr('data-cell', i).text("");
      cells.addClass('box');
      $('#idgame').append(cells);
    }
  });

  /* join membership function button */
  joinus && joinus.addEventListener("click", function(){
    $("#join").removeClass("btn-off-visible");
    $("#join").addClass("btn-on-visible");   
  });

  /* the button to start the time*/
  starttime && starttime.addEventListener("click", function(){
     
    x = setInterval(function() {
    
    seconds--;
      // Display the seconds in the element with id="countdown //"
    document.getElementById("countdown").innerHTML =  " : " + seconds;
          
          if (seconds ==0)
          {
            clearInterval(x);
            seconds = 60;
          }
   }, 1000);
   document.getElementById("starttime").disabled = true;
  });    
 
};
