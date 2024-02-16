/* Roll.js is a function that is meant to allow the user
 to roll a die set between 4 and 20 sides, then will roll
  the die and display it for only that user
 */
const logger = require('./logger');
const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require('discord.js');

const teamName = 'Power Bottoms';
const taskName = 'Tombs of Amascut: Recieve one purple!';
const pointValue = 10;
const competitionName = 'Moonclan Bingo!';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolls a die')
    .addStringOption((option) =>
      option
        .setName('sides')
        .setDescription('The number of sides on the die')
        .setRequired(true)
        .addChoices(
          { name: '4', value: '4' },
          { name: '6', value: '6' },
          { name: '8', value: '8' },
          { name: '10', value: '10' },
          { name: '12', value: '12' },
          { name: '20', value: '20' },
        ),
    ),

  async execute(interaction) {
    // gather the information, roll the dice, and log the roll
    const sides = interaction.options.getString('sides');
    const roll = Math.floor(Math.random() * sides) + 1;
    const logString = `${interaction.user.username} / ${interaction.member.displayName} , rolled a ${roll} on a ${sides}-sided die. on: ${new Date()}`;
    logger.log('info', logString);

    // create the embed
    const embed = new EmbedBuilder()
      .setTitle(`${teamName} rolled the dice..`)
      .setColor(0x00ffff)
      .setDescription(`The ${teamName} must complete: **${taskName}**`)
      .setTimestamp(new Date().toISOString())
      .setImage('https://i.imgur.com/NyxGnsj.jpeg')
      .setThumbnail('')
      .setFooter({
        text: `Competition_Name: ${competitionName} Team_Name: ${teamName} Task_Name: ${taskName} Point_Value: ${pointValue}`,
        icon_url: `https://i.imgur.com/3Wlo2Tz.jpeg`,
      })
      .addFields(
        {
          name: `Dice roll result`,
          value: `${roll}`,
          inline: true,
        },
        {
          name: `Point value`,
          value: `${pointValue}`,
        }
      );

    // send the embed
    await interaction.reply({ embeds: [embed] });
  },
};
