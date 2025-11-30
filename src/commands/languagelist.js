const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'languages',
  description: 'List all available commands.',
  async execute (message, args) {
    const languages = new EmbedBuilder()
      .setTitle('Available Translations')
      .setDescription('All the available languages.')
      .setColor('DarkButNotBlack')
      .addFields(
        {
            name: 'Bulgarian',
            value: 'BU🇧🇬',
        },
        {
            name: 'Chinese',
            value: 'ZH🇨🇳',
        },
        {
            name: 'Czech',
            value: 'CS🇨🇿',
        },
        {
            name: 'Danish',
            value: 'DA🇩🇰',
        },
        {
            name: 'Dutch',
            value: 'NL🇳🇱',
        },
        {
            name: 'English',
            value: 'EN🇬🇧',
        },
        {
            name: 'Estonian',
            value: 'ET🇪🇪',
        },
        {
            name: 'Finnish',
            value: 'FI🇫🇮',
        },
        {
            name: 'French',
            value: 'FR🇫🇷',
        },
        {
            name: 'German',
            value: 'DE🇩🇪',
        },
        {
            name: 'Greek',
            value: 'EL🇬🇷',
        },
        {
            name: 'Hungarian',
            value: 'HU🇭🇺',
        },
        {
            name: 'Italian',
            value: 'IT🇮🇹',
        },
        {
            name: 'Japanese',
            value: 'JA🇯🇵',
        },
        {
            name: 'Latvian',
            value: 'LV🇱🇻',
        },
        {
            name: 'Lithuanian',
            value: 'LT🇱🇹',
        },
        {
            name: 'Polish',
            value: 'PL🇵🇱',
        },
        {
            name: 'Portuguese',
            value: 'PT🇵🇹',
        },
        {
            name: 'Romanian',
            value: 'RO🇷🇴',
        },
        {
            name: 'Russian',
            value: 'RU🇷🇺',
        },
        {
            name: 'Slovak',
            value: 'SK🇸🇰',
        },
        {
            name: 'Slovenian',
            value: 'SL🇸🇮',
        },
        {
            name: 'Spanish',
            value: 'ES🇪🇸',
        },
        {
            name: 'Swedish',
            value: 'SV🇸🇪',
        }
      )
      .setTimestamp();

    return message.channel.send({ embeds: [languages] });
  }
};