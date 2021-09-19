const i18n = require('i18n');

const { TOPICS } = require('../variables');

const attachment = {
  type: 'template',
  payload: {
    template_type: 'button',
    text: i18n.__('topics.title'),
    buttons: TOPICS.map(t => ({
      type: 'postback',
      title: i18n.__(`topics.${t}.btn.title`),
      payload: t
    }))
  }
};

module.exports = { attachment };
