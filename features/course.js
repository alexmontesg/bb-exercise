const i18n = require('i18n');
const { LEVELS, TOPICS } = require('../variables');
const { RequestPowerLevel, RequestTopic } = require('../responses');

async function offerCourse (bot, message, { level, skill }) {
  const course = i18n.__(`course.${level}.${skill}`);
  await bot.reply(message, i18n.__('course.recommendation', { course }));
  const code = `${level.substring(0, 2)}_${skill.substring(0, 2)}_${message.user.substring(0, 5)}`.toUpperCase();
  await bot.reply(message, i18n.__('voucher', { code }));
  // TODO Schedule reminder.
}

module.exports = (controller) => {
  const state = require('../store/state')(controller.plugins.store);

  controller.hears(LEVELS, 'facebook_postback', async (bot, message) => {
    state.addToState(message.user, 'level', message.text);
    const skill = state.getFromState(message.user, 'skill');
    if (skill) {
      await offerCourse(bot, message, { level: message.text, skill });
    } else {
      await bot.reply(message, RequestTopic);
    }
  });

  controller.hears(TOPICS, 'facebook_postback', async (bot, message) => {
    state.addToState(message.user, 'skill', message.text);
    const level = state.getFromState(message.user, 'level');
    if (level) {
      await offerCourse(bot, message, { level, skill: message.text });
    } else {
      await bot.reply(message, RequestPowerLevel);
    }
  });
};