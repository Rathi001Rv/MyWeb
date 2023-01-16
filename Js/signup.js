function SignUp(){
  const Name = document.getElementById("name");
  const FatherName = document.getElementById("fathername");
    const Email = document.getElementById("email");
    const Number = document.getElementById("contnumber");
    const CNIC = document.getElementById("nic")
    const Password = document.getElementById("password");
    const ProfilePic= document.getElementById("profile")
    const Massage = document.getElementById("massage");

    if(Email.value===""){
      setTimeout(() => {
        Massage.innerHTML="Type Email";
        Massage.style.color="red";
        
      }, 3000);
        Email.focus();
    }else if(Password.value === ""){
      setTimeout(() => {
        Massage.innerHTML="Type Password";
        Massage.style.color="red";
        
      }, 3000);
        Password.focus();
    }else{
    let Data = {
      Name: Name.value,
      FatherName: FatherName.value,
        Email : Email.value,
        Password:Password.value,
        CNIC:CNIC.value,
        Number:Number.value,
        profileImagePath:"",
        CoverIMgPath:"",
    }
  // console.log(Data)
  
    firebase.auth().createUserWithEmailAndPassword(Data.Email, Data.Password)
    .then((resolve) => {
      console.log(resolve)
      Massage.innerHTML = "Successfully SingUp";
      Massage.style.color="green";
      resolve.user.sendEmailVerification()
      firebase
      .firestore().collection("users/").doc(resolve.user.uid).set(Data)
      .then((res)=>{
        console.log(res);
        setTimeout(() => {
        window.location.assign("./email-verification.html ");
      }, 2000);
      })
      .catch((err)=>{
        console.log(err)
      })
      
        
        // firebase.database().ref("users/" + resolve.user.uid).set(
          //   Data
          // )
    
    // setTimeout(() => {
      
      // window.location.assign("./home.html");
    // }, 2000);
  })
  .catch((err) => {
    console.log(err.message)
    Massage.innerHTML = err.message;

    Massage.style.color="red";

  });
}
}
