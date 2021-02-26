const { conversation } = require('@assistant/conversation');
const dashbot = require('dashbot');

const app = conversation();
const googleDashbot = dashbot('EEhwP2NkrTda9RJeIEEEdCFrS6YbnWJM7bv88DHp', {debug: true}).google;

app.handle('greeting', conv => {
  googleDashbot.setOutgoingIntent({
    "name": "WEATHER_RESPONSE",
    "inputs": [
      {
        "name": "forecast",
        "value": "68 and sunny"
      }
    ]
  });
  let message = 'Looks like you\' been here before. Would you like to see the last recipe viewed?';
  if (!conv.user.lastSeenTime) {
    message = 'Hi I\'m Soo. Would you like to search for a recipe?';
  }
  conv.add(message);
  conv.user.params.dashbot = "{\"dashbotUser\":{\"userId\":\"Joe Smith\"}}"
});

googleDashbot.configHandler(app);

exports.fulfillment = app;
