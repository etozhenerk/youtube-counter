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
let idChannel = "UCzlzGhKI5Y1LIeDJI53cWjQ";
let part = "statistics,brandingSettings";

let titleChannel = document.querySelector("#title-channel");
let descrChannel = document.querySelector("#description-channel");
let imageChannel = document.querySelector("#image-channel");
let count = document.querySelector("#count");

let form = document.querySelector("#form");

let showStat = (id) => {
  client.get(
    `https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${id}&key=AIzaSyB7pT0HMSiGxTzmU8gI5kR3XRTAbqt55k0`,
    response => {
      let info = JSON.parse(response).items[0];
      titleChannel.innerText = info.brandingSettings.channel.title;
      descrChannel.innerText = info.brandingSettings.channel.description;
      imageChannel.src = info.brandingSettings.image.bannerImageUrl;
      count.innerText = info.statistics.subscriberCount.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }
  );
};

let searchChannel = (nameChannel) => {
  client.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=${nameChannel}&key=AIzaSyB7pT0HMSiGxTzmU8gI5kR3XRTAbqt55k0`, (response) =>{
    let info = JSON.parse(response).items[0].snippet.channelId;
    showStat(info);
  });
};

form.addEventListener("submit", e => {
  e.preventDefault();

  let nameChannel = document.querySelector("#name-channel").value;
  searchChannel(nameChannel);
});

showStat(idChannel);
