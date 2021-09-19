const i18n = require('i18n');
const intentListener = require('../intent-hears');
const { LEVELS, TOPICS } = require('../variables');
const { RequestPowerLevel, RequestTopic } = require('../responses');

async function offerCourse (bot, message, { level, skill }) {
  const course = i18n.__(`course.${level}.${skill}`);
  await bot.reply(message, i18n.__('course.recommendation', { course }));
  const code = `${level.substring(0, 4)}_${skill.substring(0, 2)}_${message.user.substring(0, 5)}`.toUpperCase();
  await bot.reply(message, i18n.__('voucher', { code }));
  // TODO Schedule reminder.
}

function addEntitiesToState (message, state) {
  const { entities } = message;
  const { level, skill } = entities;
  if (level && level.length > 0) {
    state.addToState(message.user, 'level', level);
  }
  if (skill && skill.length > 0) {
    state.addToState(message.user, 'skill', skill);
  }
}

module.exports = (controller) => {
  const state = require('../store/state')(controller.plugins.store);

  controller.hears(intentListener('request_course'), 'message,direct_message', async (bot, message) => {
    addEntitiesToState(message, state);
    const level = state.getFromState(message.user, 'level');
    const skill = state.getFromState(message.user, 'skill');
    if (level && skill) {
      await offerCourse(bot, message, { level, skill });
    } else if (level) {
      await bot.reply(message, RequestTopic);
    } else {
      await bot.reply(message, i18n.__('welcome.expertise_inquire'));
      await bot.reply(message, RequestPowerLevel);
    }
  });

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
