const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'commands',
    description: 'List all available commands.',
    async execute (message, args) {
        const reapers = new EmbedBuilder()
      .setTitle('Commands')
      .setDescription('List of all available commands.')
      .setThumbnail('https://cdns3.royaleapi.com/cdn-cgi/image/w=64,h=64,format=auto/static/img/badge/Skull_06.png')
      .setColor('DarkButNotBlack')
      .setTimestamp();
      

    message.channel.send({ embeds: [reapers] });
    return;
    }
}