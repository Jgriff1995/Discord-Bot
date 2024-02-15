/* Roll.js is a function that is meant to allow the user
 to roll a die set between 4 and 20 sides, then will roll
  the die and display it for only that user
 */

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
        // gather the information, roll the dice
        const sides = interaction.options.getString('sides');
        const roll = Math.floor(Math.random() * sides) + 1;
        const string = bold(
            `${interaction.member.displayName} , Rolled a ${sides}-sided die and got a ${roll} !`,
        );
        console.log(string);

        // create the embed
        const exampleEmbed = new EmbedBuilder()
            .setTitle('Dice Roll')
            .setColor(0x0099ff)
            .setDescription(string)
            .setTimestamp()
            .setImage('https://i.imgur.com/NyxGnsj.jpeg');

        // send the embed
        await interaction.reply({ embeds: [exampleEmbed] });
    },
};
