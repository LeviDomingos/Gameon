/* paste this line in verbatim */
var cells = 16;
var cell;

window.onload = function(){

  let startplaying = document.getElementById("startplaying")  
  let idgame = document.getElementById("idgame");
  let createboard= document.getElementById("createboard");

  startplaying.addEventListener("click", function(){
    $("#createboard").removeClass("btn-off-visible");
    $("#createboard").addClass("btn-on-visible");
    for(var i = 1; i <= cells; i ++){
      cell = $('<div>').addClass('box').attr('data-cell', i).text("");
      cell.addClass('box');
      $('#idgame').append(cell);
    }
  });

  createboard.addEventListener("click", function(){


  });
};



























 
 
 
 
 
 
 
 
