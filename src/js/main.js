var HttpClient = function() {
  this.get = function(aUrl, aCallback) {
    let anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function() {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
        aCallback(anHttpRequest.responseText);
    };

    anHttpRequest.open("GET", aUrl, true);
    anHttpRequest.send(null);
  };
};

let client = new HttpClient();
let idChannel = "UCVswRUcKC-M35RzgPRv8qUg";
let part = "statistics,brandingSettings";

let nameChannel = document.querySelector("#name-channel");
let descrChannel = document.querySelector("#description-channel");
let imageChannel = document.querySelector("#image-channel");
let count = document.querySelector("#count");

let showStat = () => {
  client.get(`https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${idChannel}&key=AIzaSyB7pT0HMSiGxTzmU8gI5kR3XRTAbqt55k0`,(response) => {
    let info = JSON.parse(response).items[0];
    nameChannel.textContent = info.brandingSettings.channel.title;
    descrChannel.textContent = info.brandingSettings.channel.description;
    imageChannel.src = info.brandingSettings.image.bannerImageUrl;
    count.textContent = info.statistics.subscriberCount;
  });
};

showStat();


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
