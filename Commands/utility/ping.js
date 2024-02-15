// This is a simple ping command that will reply with "Pong!" when called.

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    // await interaction.reply({content: 'Pong!', emphemeral: true});
    if (interaction.commandName === 'ping') {
      await interaction.reply({
        content: 'Secret Pong!',
        ephemeral: true,
      });
    }
  },
};
