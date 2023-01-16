setTimeout(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          window.location.assign("./Pages/home.html");
        } else {
          window.location.assign("./Pages/email-verification.html");
        }
      } else {
        window.location.assign("./Pages/login.html");
      }
    });
  }, 2000);