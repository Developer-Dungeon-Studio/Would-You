const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const guildLang = require('../util/Models/guildModel.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sideeffect')
    .setDescription('You get a superpower but with a sideeffect from a random user'),

  async execute(interaction, client) {
    guildLang
      .findOne({ guildID: interaction.guild.id })
      .then(async (result) => {
        const { Random } = await require(`../languages/${result.language}.json`);
        const {
          Useful_Superpowers,
        } = await require(`../data/superpower-${result.language}.json`);

        let randMember;
        const members = await interaction.guild.members.fetch();

        randMember = await members.random();

        const randomEmbed = new EmbedBuilder()
          .setColor('#0598F6')
          .setFooter({ text: `${Random.embed.footer}` })
          .setTimestamp()
          .setAuthor({
            name: `${client.user.username}`,
            iconURL: client.user.avatarURL(),
          })
          .addFields({
            name: `${Random.embed.text1} **${randMember.user.username}** ${Random.embed.text2}`,
            value: `> ${ 
              Useful_Superpowers[
                Math.floor(Math.random() * (Useful_Superpowers.length))
              ]
            }`,
            inline: false,
          });

          const message = await interaction.reply({ embeds: [randomEmbed], fetchReply: true })
          try {
          await message.react('✅');
          await message.react('❌');
        } catch (error) {
          return;
        }
       });
  },
};
