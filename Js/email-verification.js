const Email = document.getElementById("email");
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (user.emailVerified) {
          window.location.assign("./home.html");
        } else {
          Email.innerHTML = user.email;
          console.log("email false")
        }
      } else {
        window.location.assign("./login.html");
      }
    });


    let message = document.getElementById("message");
    const ResendEmail = () => {
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          message.innerHTML = "Email verification sent!";
          message.style.color = "green";
        })
        .catch((err) => {
          message.innerHTML = err.message;
          message.style.color = "red";
        });
    };
function Verified  ()  {
  location.reload();
};
