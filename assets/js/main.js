"use strict";

var HttpClient = function HttpClient() {
  this.get = function (aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function () {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) aCallback(anHttpRequest.responseText);
    };

    anHttpRequest.open("GET", aUrl, true);
    anHttpRequest.send(null);
  };
};

var client = new HttpClient();

var showStat = function showStat() {
  client.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCVswRUcKC-M35RzgPRv8qUg&key=AIzaSyB7pT0HMSiGxTzmU8gI5kR3XRTAbqt55k0", function (response) {
    console.log(JSON.parse(response).items[0].statistics.subscriberCount);
  });
};
var showDescr = function showDescr() {
  client.get("https://www.googleapis.com/youtube/v3/channels?part=snippet&id=UCVswRUcKC-M35RzgPRv8qUg&key=AIzaSyB7pT0HMSiGxTzmU8gI5kR3XRTAbqt55k0", function (response) {
    console.log(JSON.parse(response).items[0].snippet.description);
  });
};

showStat();
showDescr();

// let xhr = new XMLHttpRequest();

// xhr.open(
//   "GET",
//   "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCVswRUcKC-M35RzgPRv8qUg&key=AIzaSyB7pT0HMSiGxTzmU8gI5kR3XRTAbqt55k0",
//   false
// );
// xhr.send();

// if (xhr.status != 200) {
//   console.log(xhr.status + ":" + xhr.statusText);
// } else {
//   let subsCount = JSON.parse(xhr.responseText).items[0].statistics
//     .subscriberCount;
//   document.querySelector("#count").textContent = subsCount;
// }