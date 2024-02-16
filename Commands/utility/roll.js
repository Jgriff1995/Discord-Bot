/* Roll.js is a function that is meant to allow the user
 to roll a die set between 4 and 20 sides, then will roll
  the die and display it for only that user
 */

// Log all the dice rolls to a file for auditing purposes
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    new winston.transports.File({ filename: 'Logs/die-roll.log', level: 'info' }),
  ],
});

let teamName = 'Power Bottoms';
let taskName = 'Tombs of Amascut: Recieve one purple!';
let pointValue = 10;
let competitionName = 'Moonclan Bingo!';

const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttatchmentBuilder,
  bold,
} = require('discord.js');

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
    let string = bold(`${interaction.member.displayName} , Rolled a ${sides}-sided die and got a ${roll} !`);
    const logString = `${interaction.user.username} / ${interaction.member.displayName} , rolled a ${roll} on a ${sides}-sided die. on: ${new Date()}`;
    logger.log('info', logString);

    // switch statement do decide what image to use
    let image = '';

    // create the embed
    const exampleEmbed = new EmbedBuilder()
      .setTitle('Dice Roll')
      .setColor(0x0099ff)
      .setDescription(string)
      .setTimestamp()
      .setImage('https://i.imgur.com/NyxGnsj.jpeg')
      .addFields(
        { name: 'Roll', value: `${roll}`, inline: true },
        { name: 'Sides', value: `${sides}`, inline: true },
      );

    // send the embed
    // await interaction.reply({ embeds: [exampleEmbed] });


    // test embed
    // Power bottoms will be replaced with a literal of the team name that rolled the dice
    // must complete will be replaced with the task that the team must complete
    // point value will be assigned based on the tile board
    // url will be replaced with the image of the tile board
    // thumbnail will be replaced with the team's icon OR the unique they must acquire

    const testEmbed = {
      type: "rich",
      title: `${teamName} rolled the dice..`,
      description: `The ${teamName} must complete: **${taskName}**`,
      color: 0x00FFFF,
      fields: [
        {
          name: `Dice roll result`,
          value: `${roll}`,
          inline: true
        },
        {
          name: `Point value`,
          value: `${pointValue}`
        }
      ],
      image: {
        url: `https://i.imgur.com/tFH54b6.jpeg`,
      },
      thumbnail: {
        url: `https://oldschool.runescape.wiki/images/thumb/Lightbearer_detail.png/240px-Lightbearer_detail.png?3576d`,

      },
      timestamp: new Date().toISOString(),
      footer: {
        text: `Competition_Name: ${competitionName} Team_Name: ${teamName} Task_Name: ${taskName} Point_Value: ${pointValue}`,
        icon_url: `https://i.imgur.com/3Wlo2Tz.jpeg`,
      },
    };

    // send the embed
    await interaction.reply({ embeds: [testEmbed] });

  }
}

