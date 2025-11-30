 const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { name } = require('./commandlist');

 module.exports = {
    name: 'timer',
    description: 'Start a timer.',
    data: new SlashCommandBuilder ()
    .setName('timer')
    .setDescription('Start a timer.')
    .addNumberOption(option => option.setName('timer-number').setDescription('Timer number in SECONDS').setRequired(true)),
    async execute (interaction) {

        const {option} = interaction; 
        const num = option.getNumber('timer-number')

        async function sendMessage (message, edit){
            const embed = new EmbedBuilder()
            .setColor('blue')
            .setDescription(message)
            .setFooter({ text:`this may be a couple seconds off.`});

            if (edit) {
                await interaction,editReply({ embeds: [embed ]}).catch(err => {});
            } else {
                
            }
        }
    }
 }