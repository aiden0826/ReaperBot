require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
});

const PREFIX = ".";

// load commands from src/commands
client.commands = new Map();
const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if (command && command.name && typeof command.execute === 'function') {
      client.commands.set(command.name, command);
      console.log(`Loaded command: ${command.name}`);
    } else {
      console.warn(`Skipping ${file} — missing name or execute()`);
    }
  }
} else {
  console.warn("Commands folder not found at", commandsPath);
}

// ready event
client.on('clientReady', () => {
  console.log(`${client.user.tag} is ready!`);
  client.user.setActivity('Looking to translate!');
});

// messageCreate handler (prefix commands AND simple message replies)
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // prefix commands
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) {
    // optional: let user know command not found
    // message.reply(`Unknown command: ${commandName}`);
    return;
  }

  try {
    await command.execute(message, args);
  } catch (err) {
    console.error(`Error running command ${commandName}:`, err);
    message.reply('There was an error running that command.');
  }
});

client.login(process.env.TOKEN);
