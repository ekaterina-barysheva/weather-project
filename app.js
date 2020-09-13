const express = require("express");
const app = express();

const https = require("https");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const descr = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The weather in " + query + " is " + descr + " with the temperature of " + temp + " degrees Celsius.</h1>");
      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  });
})




app.listen(3000, function() {
  console.log("SERVER IS RUNNING ON PORT 3000.");
})
