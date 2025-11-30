require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const sCommands = [
    {
        name: 'translate',
        description: 'Translates the given text to the specified language.',
                options:[
            {
                name: 'language',
                description: 'The language your translating to.',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'text',
                description: 'The message your translating.',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {
        name: 'add',
        description: 'Adds two numbers together.',
        options:[
            {
                name: 'first-number',
                description: 'The first number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: 'subtract',
        description: 'Subtracts two numbers.',
        options:[
            {
                name: 'first-number',
                description: 'The first number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: 'divide',
        description: 'Divides two numbers.',
        options:[
            {
                name: 'first-number',
                description: 'The first number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: 'multiply',
        description: 'Multiplies two numbers.',
        options:[
            {
                name: 'first-number',
                description: 'The first number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },



];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), 
                {body: sCommands}
        )

        console.log('Slash commands were registered!');
        } catch (error) {
            console.log(`There was an error: ${error}`)
        }
})();