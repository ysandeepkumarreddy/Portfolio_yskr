function getWeather() {
  let temperature = document.getElementById("temperature");
  // let description = document.getElementById("description");
  let location = document.getElementById("location");

  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "031448f11e54d1a3ab064ad76005c298";

  location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let url =
      api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=metric";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let temp = data.main.temp;
        temp = temp.toFixed(1);
        temperature.innerHTML = temp + "° C " + data.weather[0].main;
        location.innerHTML = data.name + ", " + data.sys.country;
        // description.innerHTML = data.weather[0].main;
      });
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

getWeather();

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
var dt = new Date();
document.getElementById("datetime").innerHTML =
  dt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }) +
  " " +
  timezone;
