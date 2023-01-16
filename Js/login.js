function Login(){
    const Email = document.getElementById("email");
    const Password = document.getElementById("password");
    const Massage = document.getElementById("massage");
    if(Email.value===""){
        Massage.innerHTML="Type Email";
        Massage.style.color="red";
        Email.focus();
        
      
    }else if(Password.value === ""){
        Massage.innerHTML="Type Password";
        Massage.style.color="red";
        Password.focus();
    }else{
    let Data = {
        email : Email.value,
        password : Password.value,
    }
  
    firebase.auth().signInWithEmailAndPassword(Data.email, Data.password)
  .then((resolve) => {
      Massage.innerHTML = "Successfully Login";
      Massage.style.color="green";
      window.location.assign("./home.html");
  if (resolve.user.emailVerified){
  }
  else{
    window.location.assign("./emailverfication.html");
  }
    
  })
  .catch((err) => {
    console.log(err.message)
    Massage.innerHTML = err.message;
    Massage.style.color="red";

  });
}}