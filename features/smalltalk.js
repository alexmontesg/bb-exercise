const intentListener = require('../intent-hears');

module.exports = (controller) => {
  controller.hears(intentListener('greetings'), 'message,direct_message', async (bot, message) => {
    await bot.reply(message, 'hi');
  });

  controller.hears(intentListener('Default Fallback Intent'), 'message,direct_message', async (bot, message) => {
    await bot.reply(message, 'uh?');
  });
};
