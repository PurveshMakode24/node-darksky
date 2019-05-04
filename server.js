var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var apiKey = '*********************'; //Add your API key here
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
});

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body);
      if(weather.main === undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${((weather.main.temp-32)*5/9).toFixed(2)}(°C) degrees celsius in ${weather.name}!`; // precised to 2 decimal
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
});

app.listen(port);
console.log("Server is running... Head over to localhost:3000 in your browser")
