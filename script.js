"use strict";

const key = "e38336df8ed6ab9f4ba2f79bd7a0a104";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const dates = time.getDate();
  const day = time.getDay();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  const date = document.querySelector(".date");
  date.innerHTML =
    days[day] +
    ", " +
    dates +
    " " +
    months[month] +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
}, 1000); // this function will be called every 1 second

const setQuerry = (e) => {
  if (e.keyCode == "13") {
    getResult(searchBar.value);
  }
};

const getResult = (cityName) => {
  let querry = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;
  fetch(querry)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
};

const displayResult = (result) => {
  let city = document.querySelector(".city");
  city.innerText = `${result.name}, ${result.sys.country}`;

  let temp = document.querySelector(".temp");
  temp.innerText = `${Math.round(result.main.temp)}°C`;

  let situation = document.querySelector(".situation");
  situation.innerText = `${result.weather[0].description}`;

  let minmax = document.querySelector(".minmax");
  minmax.innerText = `min ${Math.round(
    result.main.temp_min
  )}°C / max ${Math.round(result.main.temp_max)}°C`;
};

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keydown", setQuerry);
