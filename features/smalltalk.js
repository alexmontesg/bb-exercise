const intentListener = require('../intent-hears');
const i18n = require('i18n');
const { RequestPowerLevel } = require('../responses');

module.exports = (controller) => {
  controller.hears(intentListener('greetings'), 'message,direct_message', async (bot, message) => {
    await bot.reply(message, i18n.__('welcome.text'));
    await bot.reply(message, i18n.__('welcome.expertise_inquire'));
    await bot.reply(message, RequestPowerLevel);
  });

  controller.hears(intentListener('Default Fallback Intent'), 'message,direct_message', async (bot, message) => {
    await bot.reply(message, i18n.__('fallback'));
  });
};
