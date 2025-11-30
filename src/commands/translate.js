const axios = require('axios');
const languages = require('../languages'); // import the language map

module.exports = {
  name: 't',
  description: 'Translate text using DeepL',
  async execute(message, args) {
    const targetName = args[0]?.toLowerCase(); // e.g., 'english'
    const text = args.slice(1).join(' ');

    if (!targetName || !text) {
      return message.reply('Usage: `!translate <LANGUAGE> <text>` e.g. `!translate English hola`');
    }

    const target = languages[targetName];
    if (!target) {
      return message.reply('Unknown language. Please provide a valid language name.');
    }

    try {
      const res = await axios({
        method: 'POST',
        url: process.env.DEEPL_API,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: new URLSearchParams({
          auth_key: process.env.DEEPL_KEY,
          text: text,
          target_lang: target
        })
      });

      const translated = res.data.translations?.[0]?.text;
      if (!translated) throw new Error('No translation returned');

      message.reply(`**Translated (${targetName}):** ${translated}`);
    } catch (err) {
      console.error('DeepL error:', err?.response?.data || err.message || err);
      message.reply('Error translating with DeepL.');
    }
  }
};

