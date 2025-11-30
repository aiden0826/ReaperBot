const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'commands',
  description: 'List all available commands.',
  async execute (message, args) {
    const commands = new EmbedBuilder()
      .setTitle('Commands')
      .setDescription('List of all available commands.')
      .setColor('DarkButNotBlack')
      .addFields(
        { name: '.t [language] [message]', value: 'Translates the given text into the specified language.' },
        { name: '.languages', value: 'Lists all supported languages for translation.' },
        { name: '.commands', value: 'Displays this list of commands.' }
      )
      .setTimestamp();

    return message.channel.send({ embeds: [commands] });
  }
};
