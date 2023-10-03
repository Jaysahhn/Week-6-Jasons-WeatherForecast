// var APIkey = "1d09c5caca1c902dc3c7ece9e3224bd1";

var today = dayjs();
var presentTime = today.format('YYYY-MM-DD HH:mm:ss');

$('#presentDay').text(today.format('MMM D, YYYY')); // allows the display of the current date

$("#searchButton").click(function (event) {
    event.preventDefault();
    var inputEl = $("#searchInput");
    var cityName = inputEl.val();

    // code to allow usage of weather api
    var encodedCityName = encodeURIComponent(cityName);
    var presentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + encodedCityName + "&appid=1d09c5caca1c902dc3c7ece9e3224bd1";
    var futureDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + encodedCityName + "&appid=1d09c5caca1c902dc3c7ece9e3224bd1";

    fetch(presentDay)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // setting variables to hold weather data
            var wind = data.wind.speed;
            var temp = data.main.temp;
            var humidity = data.main.humidity;
            var temperatureFixed = (temp - 273.15) * 9 / 5 + 32;

            // displaying the msg in the id presented 
            $("#presentWind").text("Wind Speed: " + wind + " m/s");
            $("#presentTemp").text("Temperature: " + temperatureFixed + " F");
            $("#presentHumidity").text("Humidity: " + humidity + " %");

            return fetch(futureDay)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    for (var i = 0; i < 5; i++) {
                        //same as above but for the future data
                        var forecastResults = data.list[i];
                        var futureWind = forecastResults.wind.speed;
                        var futureHumidity = forecastResults.main.humidity;
                        var temp = forecastResults.main.temp;
                        var futureTemp = Math.floor(temp - 273.15) * 9 / 5 + 32;
                        var tempFixed = futureTemp;
                        var targetEl = $(".day" + (i + 1));

                        //same as above but for the future data
                        targetEl.find("#futureWind").text("Wind Speed: " + futureWind + " m/s");
                        targetEl.find("#futureTemp").text("Temperature: " + tempFixed + " F");
                        targetEl.find("#futureHumidity").text("Humidity: " + futureHumidity + " %");
                    };
                });
        })


});

// var history = document.getElementById("searchHistory")
// var savedHistory = localStorage.getItem("searchHistory")
// JSON.parse(localStorage.getItem("searchHistory"));
// var histList = (text) => {
//     var historylist = document.createElement("li");
//     historylist.innerText = text;
//     searchHistory.appendChild(historylist);
// }
// local storage attempt