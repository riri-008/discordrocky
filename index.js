require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers, 
    ],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', async member => {
    const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
    const channel = member.guild.channels.cache.get(welcomeChannelId);

    if (channel) {
        channel.send(`Welcome to the server, ${member}! 
- Make sure to read {#1277630697024131094}.
- Head over to {#1277630697183510673} to verify.`);
    } else {
        console.error('Welcome channel not found');
    }
});

client.login(process.env.DISCORD_TOKEN);