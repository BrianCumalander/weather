const form = document.querySelector('#SearchForm');
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const searchTerm = form.elements.cityQuery.value;
  //weather_api key created in netlify as globally scoped for all weather_api needs.
  const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm},us&appid=${apikey}&units=imperial`);
  console.log(res.data);
  showWeather(res.data) // calls the function (below) to display the data. --res is short for result
  form.elements.cityQuery.value = ""; // clear the search box 
})


let searchHistory;
/* ----------build the json to be displayed------------*/
const showWeather = (weather) => {
  const resIcon = `${weather.weather[0].icon}`;
  const icon = `<img src="https://openweathermap.org/img/wn/${resIcon}@2x.png">`;
  const resDescription = `${weather.name}<br>${icon}<br>${weather.weather[0].description}<p></p>`;
  const resTemps = `The temperature is currently ${weather.main.temp}F<br>Feels like ${weather.main.feels_like}F`;
  searchHistory = `${weather.name}- ${weather.weather[0].description}. Low ${weather.main.temp_min}F, high ${weather.main.temp_max}F.`;

  /*------ display the queries on to the DOM ----------*/
  document.querySelector('#resDescription').innerHTML = resDescription;
  document.querySelector('#resTemps').innerHTML = resTemps;
  document.querySelector('#history').innerHTML = searchHistory;
}






/*----------- build the search history -------------*/
let n = [];
function pushData() {
  let i, searchLen, inputText, text;

  inputText = searchHistory.value;
  n.push(searchHistory);
  searchLen = n.length;

  text = "Search History:<l>";
  /*--builds the HTML for listing the search history items array later on--*/
  for (i = 0; i < searchLen; i++) {
    text += "<li>" + n[i] + "</li>";
  }
  text += "</l>";


  /*----------- display the search history 'text' list to the DOM -------------*/
  document.getElementById('lists').innerHTML = text;
}

