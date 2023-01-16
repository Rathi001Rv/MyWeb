firebase
.firestore()
.collection("posts/")
.where( "fileType", "==", "video/mp4")
.get()
.then((res) => {
    console.log(res)

})