window.onload = function() {
  
  const loginMemberButton = document.getElementById("submitbt");

      /**for the login page  */
    loginMemberButton.addEventListener("click", function() {
        let nickname = window.localStorage.nickname;
        let email = window.localStorage.email;
        let password = window.localStorage.password;
        let firstNameOrEmail = document.getElementById("idnickname").innerText;
        let personalPassword = document.getElementById("pwd").innerText;
        
        if(firstNameOrEmail === nickname || firstNameOrEmail === email && personalPassword === password) {
          alert("Welcome " + nickname || email);
        }
      });

}