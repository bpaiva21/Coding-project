const axios = require('axios');
const { default: Axios } = require('axios');

 
async function getTemp(cidade){
   tempJSON = await Axios.get('http://api.openweathermap.org/data/2.5/weather?q='+cidade+'&appid=1d60e33f83d9c153b647775111a26d1f')
   tempkelvin = tempJSON.data.main.temp
   tempCelcius = tempkelvin - 273
   console.log(tempCelcius)
}
getTemp('Londres')
//const temperaturaJSON =
