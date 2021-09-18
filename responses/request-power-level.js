const i18n = require('i18n');

const levels = ['base', 'ssj', 'ssj2', 'ssj3'];
const attachment = {
  type: 'template',
  payload: {
    template_type: 'generic',
    elements: levels.map(l => ({
      title: i18n.__(`power_level.${l}.title`),
      subtitle: i18n.__(`power_level.${l}.subtitle`),
      buttons: [
        {
          type: 'postback',
          title: i18n.__(`power_level.${l}.btn.title`),
          payload: l
        }
      ]
    }))
  }
};

module.exports = { attachment };
