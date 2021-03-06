NodeList.prototype.map = Array.prototype.map;



//get the location
document.addEventListener("load", getLocation());

let x = document.getElementById("title");
let submit = document.getElementById('submit')
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    x.innerText = "Geolocation is not supported by this browser.";
  }
}

function getWeather(position) {
  const { latitude, longitude } = position.coords;
  if (latitude === 0) {
    submit.disable = true
  }
  document.getElementById("lat").value = latitude;
  document.getElementById("lon").value = longitude;
}


// Change the icon of the weather base on the weather
const imageComponent = document.querySelectorAll(".icon");
imageComponent.map(item => {
  const span = item.querySelectorAll("span");
  span.map(check => {
    if (check.innerText === "Clouds") {
      const icon = item.querySelectorAll(".image");
      icon.map(photo => (photo.src = "/icon/Cloudy_w.png"));
    } else if (check.innerText === "Clear") {
      const icon = item.querySelectorAll(".image");
      icon.map(photo => (photo.src = "/icon/Sunny_w.png"));
    }
  });
});

// ad the validation to the search key
const search = document.getElementById("search");
const city = document.getElementById("city");

search.addEventListener("click", event => {
  if (city.value === "") {
    event.preventDefault();
    window.alert("please write the name of a city to check the weather");
  }
});

//registering service workers to the page

// (function () {
//   if ("serviceWorker" in navigator) {
//     console.log("service worker registration in progress.");
//     navigator.serviceWorker.register("service-worker.js").then(
//       function () {
//         console.log("service worker registration complete.");
//       },
//       function () {
//         console.log("service worker registration failure.");
//       }
//     );
//   } else {
//     console.log("service worker is not supported.");
//   }
// })();
