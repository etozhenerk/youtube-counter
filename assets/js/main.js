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
var idChannel = "UCVswRUcKC-M35RzgPRv8qUg";
var part = "statistics,brandingSettings";

var titleChannel = document.querySelector("#title-channel");
var descrChannel = document.querySelector("#description-channel");
var imageChannel = document.querySelector("#image-channel");
var count = document.querySelector("#count");

var form = document.querySelector("#form");

var showStat = function showStat(id) {
  client.get("https://www.googleapis.com/youtube/v3/channels?part=" + part + "&id=" + id + "&key=AIzaSyB7pT0HMSiGxTzmU8gI5kR3XRTAbqt55k0", function (response) {
    var info = JSON.parse(response).items[0];
    titleChannel.innerText = info.brandingSettings.channel.title;
    descrChannel.innerText = info.brandingSettings.channel.description;
    imageChannel.src = info.brandingSettings.image.bannerImageUrl;
    count.innerText = info.statistics.subscriberCount;
  });
};

var searchChannel = function searchChannel(nameChannel) {
  client.get("https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=" + nameChannel + "&key=AIzaSyB7pT0HMSiGxTzmU8gI5kR3XRTAbqt55k0", function (response) {
    var info = JSON.parse(response).items[0].snippet.channelId;
    showStat(info);
  });
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var nameChannel = document.querySelector("#name-channel").value;
  searchChannel(nameChannel);
});

showStat(idChannel);