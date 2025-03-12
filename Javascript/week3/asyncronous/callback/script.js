function addCallBack(z, callBackfn) {
  return callBackfn(z, 6);
}
function add(a, b) {
  return a + b;
}
console.log(addCallBack(10, add));

// netflix login
function loginUser(email, password, callBackfn) {
  setTimeout(() => {
    console.log(`We are logged into Netflix`);
    callBackfn({ userEmail: email, userPassword: password });
  }, 1000);
}
function getAllVideos({ userEmail }, callbackfn) {
  //we need the email and password to get all videos from the callbackfn in loginUser
  setTimeout(() => {
    console.log(`We have all the recently watched videos`);
    callbackfn({
      userEmail,
      videosInfo: ["Star wars", "The Mando", "The Lord of the rings"],
    });
  }, 1000);
}

//get details of one video
function getVideoInfo(videosInfoObj, callbackfn) {
  //videos info is coming from get all videos which was passed inside callbackfn from getAllVideos
  setTimeout(() => {
    console.log(`We have the details of one vifeo`);
    callbackfn({ video: videosInfoObj.videosInfo[1] }); //The Mando
  }, 1000);
}

loginUser("jay@duff.com", "1234rhgivshcbjk", (userObj) => {
  console.log(userObj.userEmail);
  getAllVideos(userObj, (videosDetailsObj) => {
    console.log(videosDetailsObj);
    getVideoInfo(videosDetailsObj, (video) => {
      console.log(video);
    });
  });
});
