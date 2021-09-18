//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

const logger = require('winston');
const i18n = require('i18n');
const { Botkit } = require('botkit');
const { FacebookAdapter, FacebookEventTypeMiddleware } = require('botbuilder-adapter-facebook');
const dialogflow = require('botkit-middleware-dialogflow')({
  keyFilename: './keys/dialogflow_key.json',
});
const db = require('./store/db');

// Load process.env values from .env file
require('dotenv').config();

if (!process.env.FACEBOOK_ACCESS_TOKEN
  || !process.env.FACEBOOK_VERIFY_TOKEN
  || !process.env.FACEBOOK_APP_SECRET) {
  logger.error('Missing fields on .env file. Required fields are: FACEBOOK_ACCESS_TOKEN, FACEBOOK_VERIFY_TOKEN and FACEBOOK_APP_SECRET');
  process.exit(1);
}

const adapter = new FacebookAdapter({
  verify_token: process.env.FACEBOOK_VERIFY_TOKEN,
  access_token: process.env.FACEBOOK_ACCESS_TOKEN,
  app_secret: process.env.FACEBOOK_APP_SECRET,
})

// emit events based on the type of facebook event being received
adapter.use(new FacebookEventTypeMiddleware());

const controller = new Botkit({
  webhook_uri: '/api/messages',
  adapter,
});

controller.addPluginExtension('store', db);

controller.middleware.receive.use(dialogflow.receive);

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
  // load traditional developer-created local custom feature modules
  controller.loadModules(`${__dirname}/features`);
});

controller.webserver.get('/', (req, res) => {
  res.send(`This app is running Botkit ${controller.version}.`);
});

i18n.configure({
  locales: ['en'],
  directory: `${__dirname}/locales`
});