// store individual data from the members of the discord in a class, and represented as a JSON file
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // Necessary to fetch all members
  ],
});

client.on('ready', async () => {
  const guild = client.guilds.cache.get(token.guildId);
  if (!guild) return console.error('No token for Moonclan provided to generate members!');

  try {
    // Fetch all members
    const members = await guild.members.fetch();
    const memberData = [];

    // Iterate over the collection of members and construct the data structure
    members.forEach((member) => {
      memberData.push({
        userName: member.user.username,
        displayName: member.displayName,
        userID: member.id,
      });
    });

    // Convert the array of objects to a JSON string
    const dataJSON = JSON.stringify(memberData, null, 4); // Beautify the JSON output

    // Write the JSON string to a file
    fs.writeFile('/Team/Data/members.JSON', dataJSON, (err) => {
      if (err) {
        return console.error('Error writing to file:', err);
      }
      console.info(
        'Members data has been written to members.json successfully.',
      );
    });
  } catch (error) {
    console.error('Error fetching members:', error);
  }
});

client.login(token);
