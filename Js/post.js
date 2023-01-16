let uid;
let fileURl = "";
let fileType = "";
firebase.auth().onAuthStateChanged((user) => {
    if(user){
  uid=user.uid
    if(user.emailVerified){
        // window.location.assign("./home.html");
    }else{
        window.location.assign("./email-verification.html");
    }
  }else{
    window.location.assign("./login.html");
  }
  })
let Post = document.getElementById("post")
let Message = document.getElementById("message")
function Postbutton(){
if(Post.value===""){
    Message.innerHTML="Type Somthing...."
    Message.style.color="red"

}else{
    let PostData ={
PostData : Post.value,
     uid:uid,
     fileURl:fileURl,
     fileType:fileType,
     like: [],
     dislike: [],
     comment: [],
    }
    console.log(PostData);
    firebase
    .firestore().collection("posts/").add(PostData)
    .then((res)=>{
        console.log(res)
        Message.innerHTML = "added";
        Message.style.color = "green";
        firebase
        .firestore()
        .collection("posts/")
        .doc(res.id)
        .update({
          id: res.id,
        })
        .then(() => {
          setTimeout(() => {
            location.reload();
          }, 2000);
        });

    })
    .catch((err)=>{
        console.log(err)
    })
}
}
//PostImg
let ProgressBar = document.getElementById("progressbar")
let PostImage = (event) => {
    var targetFile = event.target.files[0];
    // console.log(event.target.files[0])
    fileType = targetFile.type;
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef
      .child(`postFiles/${targetFile.name}`)
      .put(targetFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        ProgressBar.style.display="block";
        ProgressBar.style.width=`${Math.round(progress)}%`;
        ProgressBar.innerHTML=`${Math.round(progress)}%`
      },
      (error) => {
        
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          fileURl = downloadURL;
        });
      }
    );
  };

