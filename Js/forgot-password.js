const Email = document.getElementById("email");
const Message = document.getElementById("message");
function ResetPassword()  {
  if (Email.value === "") {
    Message.innerHTML = "Type Email";
    Message.style.color = "red";
  } else {
    firebase.auth().sendPasswordResetEmail(Email.value)
    .then(() => {
        Message.innerHTML = "Password reset email sent!";
        Message.style.color = "green";
      })
      .catch((erorr) => {
        Message.innerHTML = erorr.message;
        Message.style.color = "red";
      });
  }
};
