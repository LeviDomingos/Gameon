window.onload = function() {

  const loginMemberButton = document.getElementById("submitbt");

  /**for the login page  */
  loginMemberButton.addEventListener("click", function() {
    let nickname = window.localStorage.nickname;
    let email = window.localStorage.email;
    let password = window.localStorage.password;
        
    let firstNameOrEmail = document.getElementById("nickname");
    let personalPassword = document.getElementById("pwd");
      
    if(firstNameOrEmail.innerText === nickname || firstNameOrEmail.innerText === email && personalPassword.innerText === password) {
      alert("Welcome " + nickname || email);
    }
  });

}