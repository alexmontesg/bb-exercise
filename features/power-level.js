const i18n = require('i18n');
module.exports = (controller) => {
  const state = require('../store/state')(controller.plugins.store);

  controller.hears(['base', 'ssj', 'ssj2', 'ssj3'], 'facebook_postback', async (bot, message) => {
    state.addToState(message.user, 'level', message.text);
  });
};
