const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '809df559bfbd12502f5090417c8cbeee';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', { weather: null, error: null });
})

app.post('/', function (req, res) {
  // let today = new Date().getDay();
  // console.log(6+today);
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=Mumbai,IN&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if (err) {
      console.log(err);
      res.render('index', { weather: null, error: 'Error, please try again' });
    } else {
      let weather = JSON.parse(body);
      if (!weather.list) {
        res.render('index', { weather: null, error: 'Error, please try again' });
      } else {
        let weekdays = [];
        let recordsArray = weather.list;
        recordsArray.map(day => {
          let parseDate = new Date(day.dt_txt).getDay();
          weekdays[parseDate] = day.main.temp + "℃";
        });
        console.log(weekdays);
        res.render('index', { weather: weekdays, error: null });
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
