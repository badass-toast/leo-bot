var Botkit = require('botkit');
var request = require('request');

if (!process.env.Client_ID || !process.env.Client_Secret || !process.env.Verification_Token|| !process.env.PORT) {
  console.log('Error: Specify clientId clientSecret and port in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
  json_file_store: '../tmp/db_slackbutton_slashcommand/'
}).configureSlackApp({
  clientId: process.env.Client_ID,
  clientSecret: process.env.Client_Secret,
  scopes: ['bot']
});


controller.setupWebserver(process.env.PORT,function(err,webserver) {
  controller.createWebhookEndpoints(controller.webserver);

  controller.createOauthEndpoints(controller.webserver,function(err,req,res) {
    if (err) {
      res.status(500).send('ERROR: ' + err);
    } else {
      res.send('Success!');
    }
  });
});

var _bots = {};
function trackBot(bot) {
  _bots[bot.config.token] = bot;
}


controller.startTicking();



controller.on('direct_message,direct_mention,mention', function(bot, message) {
});

controller.hears(['horse', 'pferd', 'ross', 'rössli', 'cheval', 'gaul', 'лошадь'], ['ambient,message_received'], function(bot, message) {
  var request = require("request");
  var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=horse";

  request({ url: url, json: true }, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      var stringify = JSON.stringify(body);
      var GIF = body.data.image_original_url;
      bot.reply(message, 'Here is your random gif:smile::hrs:: ' +GIF+ '');
    } else {
      bot.reply(message, 'There was a problem with the API. Sorry:cry: no Gif right now');
    }
  });
});

controller.hears(['bojack'], ['ambient,message_received'], function(bot, message) {
  var request = require("request");
  var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=bojack";

  request({ url: url, json: true }, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      var stringify = JSON.stringify(body);
      var GIF = body.data.image_original_url;
      bot.reply(message, 'Here is your random gif:smile::hrs:: ' +GIF+ '');
    } else {
      bot.reply(message, 'There was a problem with the API. Sorry:cry: no Gif right now');
    }
  });
});

controller.hears(['unicorn', 'einhorn'], ['ambient,message_received'], function(bot, message) {
  var request = require("request");
  var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=unicorn";

  request({ url: url, json: true }, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      var stringify = JSON.stringify(body);
      var GIF = body.data.image_original_url;
      bot.reply(message, 'Here is your random gif, FABULOUS edition:smile: ' +GIF+ '');
    } else {
      bot.reply(message, 'There was a problem with the API. Sorry:cry: no Gif right now');
    }
  });
});





controller.on('create_bot',function(bot,config) {

  if (_bots[bot.config.token]) {
    // already online! do nothing.
  } else {
    bot.startRTM(function(err) {

      if (!err) {
        trackBot(bot);
      }
    });
  }

});


// Handle events related to the websocket connection to Slack
controller.on('rtm_open',function(bot) {
  console.log('** The RTM api just connected!');
});

controller.on('rtm_close',function(bot) {
  console.log('** The RTM api just closed');
  bot.startRTM(function(err) {

    if (!err) {
      trackBot(bot);
    }
  });
});

controller.hears('stop dude!!','direct_message',function(bot,message) {
  bot.rtm.close();
});