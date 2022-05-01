/* paste this line in verbatim */
var cells = 16;
var cell;
let minutes =1;
let seconds =60;
let x =0;

window.onload = function(){

  let hideboardgame = document.getElementById("hideboardgame");
  let startplaying = document.getElementById("startplaying"); 
  let idgame = document.getElementById("idgame");
  let starttime= document.getElementById("starttime");

  startplaying.addEventListener("click", function(){
    $("#createboard").removeClass("btn-off-visible");
    $("#hideboardgame").removeClass("btn-off-visible");
    $("#hideboardgame").addClass("btn-on-visible");
    $("#createboard").addClass("btn-on-visible");
    for(var i = 1; i <= cells; i ++){
      cell = $('<div>').addClass('box').attr('data-cell', i).text("");
      cell.addClass('box');
      $('#idgame').append(cell);
    }
  });

  starttime.addEventListener("click", function(){
     
    x = setInterval(function() {
    
    seconds--;
     
      // Display the result in the element with id="demo"
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
