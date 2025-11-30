require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
});

const PREFIX = ".";

// ---- Load Commands ----
client.commands = new Map();
const commandsPath = path.join(__dirname, 'commands');

if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if (command && command.name && typeof command.execute === 'function') {
      client.commands.set(command.name.toLowerCase(), command);
      console.log(`Loaded command: ${command.name}`);
    } else {
      console.warn(`Skipping ${file} — missing name or execute()`);
    }
  }
} else {
  console.warn("Commands folder not found at", commandsPath);
}

// ---- DeepL Translate Function ----
async function translateText(text, targetLang = "EN") {
  try {
    const response = await fetch(process.env.DEEPL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        auth_key: process.env.DEEPL_KEY,
        text: text,
        target_lang: targetLang
      })
    });

    const data = await response.json();

    if (!data.translations || !data.translations[0]) return null;

    return data.translations[0].text;
  } catch (err) {
    console.error("DeepL error:", err);
    return null;
  }
}

// ---- Bot Ready ----
client.on('clientReady', () => {
  console.log(`${client.user.tag} is ready!`);
  client.user.setActivity('Listening for .commands');
});

// ---- Auto Translation ----
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // ignore prefix commands
  if (message.content.startsWith(PREFIX)) return;

  const translated = await translateText(message.content, "EN");

  if (translated && translated.toLowerCase() !== message.content.toLowerCase()) {
    message.reply(`🌍 **Translated:** ${translated}`);
  }
});

// ---- Prefix command handler ----
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (err) {
    console.error(`Error running command ${commandName}:`, err);
    message.reply('There was an error running that command.');
  }
});

client.login(process.env.TOKEN);

