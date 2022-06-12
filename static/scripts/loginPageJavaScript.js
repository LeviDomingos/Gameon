let nickname = "";
let email = "";
let password = "";
let firstNameOrEmail = "";
let personalPassword = "";

window.onload = function() {

  let loginMemberButton = document.getElementById("submitbt");

  /**for the login page  */
  loginMemberButton.addEventListener("click", function() {
    
    nickname = localStorage.nickname;
    email = localStorage.email;
    password = localStorage.password;
        
    firstNameOrEmail = document.getElementById("nickname");
    personalPassword = document.getElementById("pwd");
      
    if(validateFields() === false) {
      alert("All the Fields must be filled")
    }
    else {
     if(firstNameOrEmail.innerText === nickname || firstNameOrEmail.innerText === email && personalPassword.innerText === password) {
       alert("Welcome " + nickname || email);
      }
    }
  });

  function validateFields(nickname, password) {
    if(nickname === "" || password === ""){
      return false;
    }

  }

}