const Name = document.getElementById("name")
const FatherName = document.getElementById("fathername");
  const Email = document.getElementById("email");
  const ContNumber = document.getElementById("number");
  const CNIC = document.getElementById("nic")
  const ProfilePic= document.getElementById("profileIMG")
  const CoverPic = document.getElementById("CoverImg")
  const Massage = document.getElementById("massage");
  let uid;
  firebase.auth().onAuthStateChanged((user) => {
    if(user){
  uid=user.uid;
    if(user.emailVerified){
        firebase
        .firestore().collection("users/").doc(uid).get()
        .then((res) => {
          let currentUserData = res.data();
          console.log(currentUserData)
          Name.setAttribute("value", currentUserData.Name);
          FatherName.setAttribute("value", currentUserData.FatherName);
          Email.setAttribute("value", currentUserData.Email);
          ContNumber.setAttribute("value", currentUserData.ContNumber);
          CNIC.setAttribute("value", currentUserData.CNIC);
          ProfilePic.setAttribute(
            "src",
            currentUserData.profileImagePath === ""
              ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              : currentUserData.profileImagePath
          );
          CoverPic.setAttribute("src",
          currentUserData.CoverIMgPath=== ""
              ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              : currentUserData.CoverIMgPath
          )

        });
        let postshow = document.getElementById("postshow")
        //post
        console.log(uid)
        firebase
        .firestore()
        .collection("posts/")
        .where( "uid", "==", uid)
        .get()
        .then((PostRes) => {
          // console.log("postRes",PostRes.docs[document].data);
          PostRes.forEach((MyPost)=>{
            console.log(MyPost.Name)
            let postdetails = document.createElement("div")
            postdetails.appendChild(postshow)
            let Posts = document.createElement("p")
            Posts.appendChild(postdetails)
            Posts.innerHTML=MyPost.id,MyPost.data().PostData
          })
        });
      }else{
        window.location.assign("./email-verification.html");
      }proto

    }else{
      window.location.assign("./login.html");
    }
  })
// Update User Data
function Update(){
    let UserD
    ata={
      Name: Name.value,
      FatherName: FatherName.value,
      CNIC:CNIC.value,
      ContactNumber:ContNumber.value, 
          
    
    }
    // console.log(UserData)
    firebase
    .firestore()
    .collection("users/")
    .doc(uid)
    .update(UserData)
  }

  // Profile Img
  let ProgressBar = document.getElementById("progressbar")

  function UploadProfilePic(event){
    // console.log(event.target.files[0])
    var storageRef = firebase.storage().ref()
    var ImgRef = event.target.files[0];
var uploadTask = storageRef.child(`prfile/${uid}`).put(ImgRef);

uploadTask.on('state_changed', 
  (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    ProgressBar.style.display="block";
    ProgressBar.style.width=`${Math.round(progress)}%`;
    ProgressBar.innerHTML=`${Math.round(progress)}%`
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      
      console.log('File available at', downloadURL);
      ProfilePic.setAttribute=("src", downloadURL)
      
      firebase.firestore().collection("users/").doc(uid).update({profileImagePath: downloadURL})
      .then(()=>{
        ProgressBar.style.display="none";

      })

    });

  }
);
}
//Cover Img
function UploadCoverImg(event){
  // console.log(event.target.files[0])
  var storageRef = firebase.storage().ref()
  var ImgRef = event.target.files[0];
var uploadTask = storageRef.child(`CoverImg/${uid}`).put(ImgRef);

uploadTask.on('state_changed', 
(snapshot) => {
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  ProgressBar.style.display="block";
  ProgressBar.style.width=`${Math.round(progress)}%`;
  ProgressBar.innerHTML=`${Math.round(progress)}%`
}, 
(error) => {
  // Handle unsuccessful uploads
}, 
() => {
  uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    
    console.log('File available at', downloadURL);
    CoverPic.setAttribute=("src", downloadURL)
    
    firebase.firestore().collection("users/").doc(uid).update({CoverIMgPath: downloadURL})
    .then(()=>{
      ProgressBar.style.display="none";

    })

  });

}
);
}