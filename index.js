const API_KEY = "17d23eb51ff8fa7f691641c30447368b";

const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const Search_box = document.querySelector(".search input");
const Search_btn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  let response;
  try {
    response = await fetch(API_URL + city + `&appid=${API_KEY}`);
    document.querySelector(".error_msg").style.display = "none";
    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      let data = await response.json();

      console.log(data);

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML =
        Math.round(data.wind.speed) + "Km/h";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "sun_and_clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "bright_sun.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "mist.png";
      } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "snow.png";
      }

      document.querySelector(".error").style.display = "none";
      document.querySelector(".weather").style.display = "block";
    }
  } catch (err) {
    console.log(err);
    document.querySelector(".error_msg").style.display = "block";

    document.querySelector(".weather").style.display = "none";
  }
}

Search_btn.addEventListener("click", () => {
  checkWeather(Search_box.value);
});
