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
            name: 'English',
            value: 'EN',
        },
        {
            name: 'Spanish',
            value: 'ES',
        },
        {
            name: 'German',
            value: 'DE',
        },
        {
            name: 'French',
            value: 'FR',
        },
        {
            name: 'Italian',
            value: 'IT',
        },
      )
      .setTimestamp();

    return message.channel.send({ embeds: [languages] });
  }
};