// src/commands/translate.js
const axios = require('axios');

module.exports = {
  name: 't',
  description: 'Translate text using DeepL',
  async execute(message, args) {
    const target = args[0]?.toLowerCase(); // EN, ES, FR...
    const text = args.slice(1).join(' ');
    if (!target || !text) {
      return message.reply('Usage: `!translate <LANG> <text>` e.g. `!translate EN hola`');
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

      message.reply(`**Translated (${target}):** ${translated}`);
    } catch (err) {
      console.error('DeepL error:', err?.response?.data || err.message || err);
      message.reply('Error translating with DeepL.');
    }
  }
};

