setTimeout(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          window.location.assign("./home.html");
        } else {
          window.location.assign("./email-verification.html");
        }
      } else {
        window.location.assign("./login.html");
      }
    });
  }, 2000);