$(document).ready(start);

var data;
var temp;
var CFindex = 0;

function start() {
  getLocation();  
}

function getLocation () {  
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(pos){   
   getWeather(oneDP(pos.coords.latitude), oneDP(pos.coords.longitude));   
  });
  }
  else {
    $("h1").html("Geolocation not supported in browser");
  }
}

function getWeather(lat, long) {   
  $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long, function(val){
    //If weather API returns default refresh weather data
    if (val.coord.lat === 35 && val.coord.lon === 139) {
      getWeather(lat, long);
      return;
    }
    data = val;
    console.log(val);
    temp = [data.main.temp + "&deg;C", convertToF(data.main.temp) + "&deg;F"]
    $("#tempBtn").html("Fahrenheit");
    $("#tempBtn").click(toggleTemp);
    updateDisplay();
  })
}

function updateDisplay(){
  $("h1").html(data.name + ", " + data.sys.country);
    $("#localWeather").html(data.weather[0].main + " "+ temp[CFindex]);
    $("#wthDesc").html(data.weather[0].description);
    $("#weatherImg").attr('src', data.weather[0].icon);  
}

function toggleTemp() {
  if (CFindex === 0){
    CFindex = 1;
    $("#tempBtn").html("Celsius");
  }
  else {
    CFindex = 0;
    $("#tempBtn").html("Fahrenheit");
  }
  updateDisplay();
}

function oneDP (num){
  return Math.round(num*10)/10;
}

function convertToF(celsius) {  
  return Math.round(celsius * 9/5 + 32);
}