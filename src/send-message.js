require('dotenv').config();
const { Client, IntentsBitField, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } = require("discord.js");

const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

const role = [
    {
        id: '1248379004541603960',
        label: 'Red'
    },
    {
        id: '1248379058128162956',
        label: 'Green'
    },
    {
        id: '1248379102147252316',
        label: 'Blue'
    },
]

client.on('ready', async(c) => {
    try {
        const channel = await client.channel.cache.get('1225166671342473379')

        if(!channel) return;

        const row = new ActionRowBuilder();

        role.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                .setCustomId(role.id)
                .setLabel(role.label)
                .setStyle(ButtonStyle.Primary)
            )
        })

        await channel.send({
            content: 'Claim or remove role below.',
            components: [row]
        })

        process.exit();
    } catch (error) {
        console.log(error);
    }
     
    
});



