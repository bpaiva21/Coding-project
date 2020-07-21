const functions = require('firebase-functions');
const axios = require('axios');

const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

//exports.helloWorld = functions.https.onRequest((request, response) => {
  //functions.logger.info("Hello logs!", {structuredData: true});
 // response.send("Hello from Firebase!");

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(async (request, response) => {
  const agent = new WebhookClient({ request, response });

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
 
  }
async function temperatura(cidade){
    tempJSON = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=1d60e33f83d9c153b647775111a26d1f`)
    tempkelvin = tempJSON.data.main.temp
    tempCelcius = tempkelvin - 273
     return tempCelcius.toFixed(1);
}
 
 async function previsao(agent) {
   const cidade = agent.parameters.location.city
   const temp = await temperatura(cidade);
    agent.add(`A temperatura em ${cidade} é de ${temp}°c`);
 

    const quickReplies = new Suggestion(
      {
        title: 'Está quente ou frio?',
        reply: 'Frio'
      }
    )
    quickReplies.addReply_('Quente')
    agent.add(quickReplies)
  }
  console.log(request)
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('previsão de tempo', previsao);
 await agent.handleRequest(intentMap);
});

