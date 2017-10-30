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



var spruch = [
  "Wieso funktioniert das nöd ihr wixxers?",
  "Ihr sind doch alles Höde!",
  "Ich bi din Chef du huere wixxer",
  "Ihr huere Höde",
  "Ihr sind doch alles wixxers",
  "Huere bullshit",
  "Niete ohni Chopf",
  "Huere stift",
  "Ihr sind scho huere luschtigi",
  "Booooooooooooris",
  "Gits eh Zigi?",
  "Ich gang jetzt eis go Vape",
  "Würkli?",
  "Aaah maxl!",
  "Die beschte Herdöpfel gits bim Nachbuur",
  "Langsam chummi dere Sach da nächer",
  "Shett Lohn geh, huere guet! Jetzt chani mir wieder zmittag chaufe!",
  "Verstasc wasi meine?",
  "Womer grad bim Thema sind, gömmer eis go rauche?",
  "Du hesch guet lache du hode",
  "Das hesch jetzt devo du hode",
  "Das isch de reinschti huere Fick",
  "Nei ohni scheiss, isch etzt weniger luschtig",
  "Chumme nöd drus!",
  "Wieso Gras?",
  "Dini Mueter chunnt nöd drus",
  "Was isch los?",
  "Du bisch scho en huere banaus, ha dir das schomal gseit?",
  "Oh Boris, wenn du wüsstisch",
  "Wenn du wüsstisch du huere hode",
  ":notes:Stadler muess jetzt gah trolololololoooo:notes:",
  "Moll, ich bin de chef du wixxer",
  "Machs doch selber",
  "Wieso machts etz das nöd sälber? Huere manuelli Scheisse da",
  "Ficked eu ihr wixxer",
  "Nei aber für so öppis wirdi nöd zahlt... Isch doch truurig",
  "Ich los jetzt musig, denn mussi nöd vo eu Höde lose",
  "Hey wenn ich dich mal wieder so gseh weissi grad wieder warums Mensche git wo fertig sind mit de Menschheit",
  "Ihr chönnd mir all ade chlööte hange ihr Volldeppe",
  "You fancy mofos",
  "Sache gits die gits gar nöd",
  "Das macht mich grad e chli grantig",
  "Easy Hitler...",
  "Also merci, figgdi",
  "Figgdi, isch guet hemmer en deal?",
  "HÄMMER EN DEAL?",
  "Jatzt wäri fascht hässig worde",
  "Dini Müetere, dini Müetere",
  "Nananana-na Führer!",
  "Hey, I do what I want",
  "Ich glaub mir hetted eus jetzt würklich euses Bier verdient"
];

var url_ear = [
  "https://www.youtube.com/watch?v=4gSOMba1UdM",
  "https://www.youtube.com/watch?v=BX7Ar3Z-oTo",
  "https://www.youtube.com/watch?v=Q3E7L_RoyTU",
  "https://www.youtube.com/watch?v=6ua6OahzdwQ",
  "https://www.youtube.com/watch?v=6GBathdMJ3M",
  "https://www.youtube.com/watch?v=my42f60JTTo",
  "https://www.youtube.com/watch?v=0rsu2pk5UvU",
  "https://www.youtube.com/watch?v=oxxgzQbtKMg",
  "https://www.youtube.com/watch?v=Saepkl7c84A",
  "https://www.youtube.com/watch?v=stlZEKoJg10",
  "https://www.youtube.com/watch?v=TX-6qPppbjY",
  "https://www.youtube.com/watch?v=GW--4j1vkEw",
  "https://www.youtube.com/watch?v=n-02t7pAS4Y"
]

controller.hears(['stadler', 'patrick', 'chef', 'ceo', 'wixxer', 'wixer', 'höde', 'hode', 'stift', 'huere scheiss'], ['ambient,message_received'], function(bot, message) {

  var reply = spruch[Math.floor(Math.random()*spruch.length)]
  bot.reply(message, '*de Chef seit:* ' + reply);
});

controller.hears(['earrape', 'ohrechräbs', 'earcancer'], ['ambient,message_received'], function(bot, message) {

  var reply = spruch[Math.floor(Math.random()*url_ear.length)]
  bot.reply(message, 'Ich glaub du meinsch das:' + reply);
});

controller.hears(['danke leo'], ['ambient,message_received'], function(bot, message) {
  bot.reply(message, 'Bitte gerngscheh;)');
});

controller.hears(['scheiss bot'], ['ambient,message_received'], function(bot, message) {
  bot.reply(message, 'Fick dich au...');
});

  function square(num) {
    return num * num;
  }

      square(12);


  console.log(12);