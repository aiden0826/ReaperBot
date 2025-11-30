const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'reapers',
    description: 'Provides information about the Reapers clan.',
    async execute (message, args) {

     const reapers = new EmbedBuilder()
      .setTitle('Reapers')
      .setURL('https://royaleapi.com/clan/G08QP2PJ')
      .setDescription('This clan is owned by <@1175955618167795732>.')
      .setThumbnail('https://cdns3.royaleapi.com/cdn-cgi/image/w=64,h=64,format=auto/static/img/badge/Skull_06.png')
      .setColor('DarkButNotBlack')
      .setTimestamp();

    message.channel.send({ embeds: [reapers] });
    return;
    }
};