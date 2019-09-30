let xhr = new XMLHttpRequest();

xhr.open(
  "GET",
  "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCVswRUcKC-M35RzgPRv8qUg&key=AIzaSyB7pT0HMSiGxTzmU8gI5kR3XRTAbqt55k0",
  false
);
xhr.send();

if (xhr.status != 200) {
  console.log(xhr.status + ":" + xhr.statusText);
} else {
  let subsCount = JSON.parse(xhr.responseText).items[0].statistics.subscriberCount;
  document.querySelector("#count").textContent = subsCount;
}
