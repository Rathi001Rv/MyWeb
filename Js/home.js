let ShowData = document.getElementById("showdata");
let Loading = document.getElementById("loading");
let Section2Profile = document.getElementById("myprofile");
let Section2Name = document.getElementById("section2-1")
let uid=""
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    if (user.emailVerified) {
      //Section2
      firebase
      .firestore()
      .collection("users/")
      .doc(uid)
      .get()
      .then((res)=>{
        // console.log(res.data())
        let currentUserData = res.data();
        Section2Profile.setAttribute(
          "src",
          currentUserData.profileImagePath === ""
            ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            : currentUserData.profileImagePath
        );
        Section2Name.innerHTML=`What's in your mind? ${currentUserData.Name}`

      })
      // window.location.assign("./home.html");
      firebase
        .firestore()
        .collection("posts")
        .onSnapshot(async(querySnapshot) => {
          Loading.style.display = "none";
          ShowData.style.display = "block";
          ShowData.innerHTML = "";
          var AllPosts = [];
          // console.log(res);
          if (querySnapshot.size === 0) {
            let H1 = document.createElement("h1");
            ShowData.appendChild(H1);
            H1.innerHTML = "Data Not Availble";
          } else {
            querySnapshot.forEach((res) => {
              AllPosts.push(res.data());
            });
            //loop
            for (var postIndex = 0; postIndex < AllPosts.length; postIndex++) {
              let likeArray = AllPosts[postIndex].like;
              let dislikeArray = AllPosts[postIndex].dislike;
              let commentArray = AllPosts[postIndex].comment;
              console.log(AllPosts[postIndex]);
              let PostMain = document.createElement("div");
              ShowData.appendChild(PostMain);
              let UserProfiele = document.createElement("div");
              PostMain.appendChild(UserProfiele);
              UserProfiele.setAttribute("id", "UserProfiele");
              let ProfileImg = document.createElement("img");
              UserProfiele.appendChild(ProfileImg);
              ProfileImg.setAttribute("id", "PostPrfile");
              let UserName = document.createElement("h4");
              UserProfiele.appendChild(UserName);

            await  firebase
                .firestore()
                .collection("users/")
                .doc(AllPosts[postIndex].uid)
                .get()
                .then((userres) => {
                  ProfileImg.setAttribute(
                    "src",
                    userres.data().profileImagePath === ""
                      ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      : userres.data().profileImagePath
                  );
                  
                  UserName.innerHTML = userres.data().Name;
                });
                
                //PostDetails
                let PostDetails = document.createElement("p");
                PostMain.appendChild(PostDetails);
                // PostMain.setAttribute("id","scroll")
                PostDetails.innerHTML = AllPosts[postIndex].PostData;

              // Post Image
              if (AllPosts[postIndex].fileURl!== "") {
                if (
                  AllPosts[postIndex].fileType === "image/png" ||
                  AllPosts[postIndex].fileType === "image/jpeg" ||
                  AllPosts[postIndex].fileType === "image/jpg"
                ) {
                  let PostImage = document.createElement("img");
                PostImage.setAttribute("id","Postimg")
                  PostMain.appendChild(PostImage);
                  PostImage.setAttribute("class", "postImage");
                  PostImage.setAttribute(
                    "src", AllPosts[postIndex].fileURl);
                } else {
                  // Post Video
                  let Video = document.createElement("video");
                  PostMain.appendChild(Video);
                  Video.setAttribute("controls", "true");
                  Video.setAttribute("class", "postVideo");
                  let Source = document.createElement("source");
                  Video.appendChild(Source);
                  Source.setAttribute("src",AllPosts[postIndex].fileURl);
                  Source.setAttribute("type", "video/mp4");
                }
              }
              // Footer

              let FooterMain = document.createElement("div");
              PostMain.appendChild(FooterMain);
              FooterMain.setAttribute("class", "footerMain");
              // like button
              let likeButton = document.createElement("img");
              FooterMain.appendChild(likeButton);
              likeButton.innerHTML = `Like ${likeArray.length}`;
              likeButton.setAttribute("id", postIndex);
              if (likeArray.length === 0) {
                likeButton.setAttribute("src" , "https://cdn-icons-png.flaticon.com/128/2961/2961957.png");
                likeButton.setAttribute("class" ,"likeimg-1")
                // likeButton.style.color = "red";
              } else {
                for (
                  let checkLikeIndex = 0;
                  checkLikeIndex < likeArray.length;
                  checkLikeIndex++
                ) {
                  if (likeArray[checkLikeIndex] === uid) {
                    likeButton.setAttribute("src" , "https://cdn-icons-png.flaticon.com/512/2589/2589175.png");
                    likeButton.setAttribute("class" ,"likeimg-1")
                    // likeButton.style.color = "green";
                  } else {
                    likeButton.setAttribute("src" , "https://cdn-icons-png.flaticon.com/128/2961/2961957.png");
                    likeButton.setAttribute("class" ,"likeimg-1")
                    // likeButton.style.color = "red";
                  }
                }
              }
              //Like Function
              likeButton.addEventListener("click", () => {
                let like = false;
                for (let likeIndex = 0;likeIndex < likeArray.length;likeIndex++) {
                  if (likeArray[likeIndex] === uid) {
                    like = true;
                    likeArray.splice(likeIndex, 1);
                  }
                }
                if (!like) {
                  likeArray.push(uid);
                }
                // Update like in Firebase
                firebase
                  .firestore()
                  .collection("posts/")
                  .doc(AllPosts[likeButton.id].id)
                  .update({
                    like: likeArray,
                  });
              }); //>>>Like Section End 

              // dislike button
              let dislikeButton = document.createElement("img");
              FooterMain.appendChild(dislikeButton);
              dislikeButton.innerHTML = `Dislike ${dislikeArray.length}`;
              dislikeButton.setAttribute("id", postIndex);
              if (dislikeArray.length === 0) {
                dislikeButton.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/7201/7201910.png")
                dislikeButton.setAttribute("class" ,"likeimg-1")
                // dislikeButton.style.color = "red";

              } else {
                for (
                  let checkDislikeIndex = 0;
                  checkDislikeIndex < dislikeArray.length;
                  checkDislikeIndex++
                ) {
                  if (dislikeArray[checkDislikeIndex] === uid) {
                    dislikeButton.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/8181/8181141.png")
                    dislikeButton.setAttribute("class" ,"likeimg-1")
                    // dislikeButton.style.color = "green";
                  } else {
                    // dislikeButton.style.color = "red";
                    dislikeButton.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/7201/7201910.png")
                dislikeButton.setAttribute("class" ,"likeimg-1")
                  }
                }
              }
              //DisLike Function
              dislikeButton.addEventListener("click", () => {
                let dislike = false;
                for (
                  let dislikeIndex = 0;
                  dislikeIndex < dislikeArray.length;
                  dislikeIndex++
                ) {
                  if (dislikeArray[dislikeIndex] === uid) {
                    dislike = true;
                    dislikeArray.splice(dislikeIndex, 1);
                  }
                }
                if (!dislike) {
                  dislikeArray.push(uid);
                }
                //
                firebase
                  .firestore()
                  .collection("posts/")
                  .doc(AllPosts[dislikeButton.id].id)
                  .update({
                    dislike: dislikeArray,
                  });
              });//>>>DisLike Section End

              // comment button
              let commentButton = document.createElement("img");
              commentButton.setAttribute("src","https://cdn-icons-png.flaticon.com/512/2593/2593463.png");
              commentButton.setAttribute("class" ,"likeimg-1");
              FooterMain.appendChild(commentButton);
              commentButton.innerHTML = `Comment ${commentArray.length}`;
              // Show Comment
              if (commentArray.length !== 0) {
              let ShowCommentMain = document.createElement("div");
              PostMain.appendChild(ShowCommentMain);
              // comment
              for (var i = 0; i < commentArray.length; i++) {
              let Comment = document.createElement("div");
              ShowCommentMain.appendChild(Comment);
              Comment.setAttribute("class", "comment");
              // comment profile
              let ComentProfile = document.createElement("img");
              Comment.appendChild(ComentProfile);
              // ComentProfile.setAttribute("src",res.data().profileImagePath);
              ComentProfile.setAttribute("class", "comentProfile");
              // comment user name
              let CommentUserName = document.createElement("b");
              Comment.appendChild(CommentUserName);
              // commentUserName.innerHTML = "testing";
              firebase
              .firestore()
              .collection("users/")
              .doc(commentArray[i].uid)
              .get()
              .then((commentUserData) => {
                ComentProfile.setAttribute(
                  "src",
                  commentUserData.data().profileImagePath === ""
                    ? "https://image.shutterstock.com/image-vector/human-head-vector-isolated-260nw-147002768.jpg"
                    : commentUserData.data().profileImagePath);
              CommentUserName.innerHTML = commentUserData.data().Name;



              })
              // comment details
              let CommnetDetails = document.createElement("p");
              Comment.appendChild(CommnetDetails);
              CommnetDetails.innerHTML=commentArray[i].CommentValue;
              // CommnetDetails.appendChild(CommnetDetailsText);
              }
              }
              // write comment
              var WriteCommentMain = document.createElement("div");
              PostMain.appendChild(WriteCommentMain);
              var Textarea = document.createElement("textarea");
              Textarea.setAttribute("id", `textarea${postIndex}`);
              Textarea.setAttribute("placeholder", "Type Comment");
              WriteCommentMain.appendChild(Textarea);
              // Send Commnet
              let SendCommnet = document.createElement("button");
              WriteCommentMain.appendChild(SendCommnet);
              SendCommnet.innerHTML = "Send";
              SendCommnet.setAttribute("id", postIndex);
                // comment function
              SendCommnet.addEventListener("click", () => {
                let targetTextarea = document.getElementById(`textarea${SendCommnet.id}`);
                if (targetTextarea.value === "") {
                  alert("type something...");
                } else {
                  let CommentData = {
                    CommentValue: targetTextarea.value,
                    uid: uid,
                  };
                  commentArray.push(CommentData);
                  // comment update
                  firebase
                    .firestore()
                    .collection("posts/")
                    .doc(AllPosts[SendCommnet.id].id)
                    .update({
                      comment: commentArray,
                    });
                }
              });

            }
          }
        });

        
    } else {
      window.location.assign("./email-verification.html");
    }
  } else {
    window.location.assign("./login.html");
  }
});
function Logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.assign("./login.html");
    });
}
