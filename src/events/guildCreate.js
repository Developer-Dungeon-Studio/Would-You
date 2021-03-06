const { EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

const guildcreate = require('../util/Models/guildModel.js');

module.exports = async(client, guild) => {
  guildcreate.findOne({ guildID: guild.id }).then(async (result) => {
    if (!result) {
      await guildcreate.create({
        guildID: guild.id,
        language: 'en_EN',
        botJoined: (Date.now() / 1000) | 0,
      });
    } else {
    }
  });
  const channel = client.channels.cache.get(config.logs);
  let own = await guild.fetchOwner();
  const embed = new EmbedBuilder()
    .setThumbnail(guild.iconURL({ format: 'webp', dynamic: true, size: 1024 }))
    .setTitle('Joined a Guild !!')
    .addFields('Name: ', `${guild.name}`)
    .addFields('ID:', ` ${guild.id}`)
    .addFields('Owner: ', ` ${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : 'Unknown user'} ${own.id} `)
    .addFields('Member Count:', ` ${guild.memberCount} Members`)
    .addFields('Joined:', ` <t:${(Date.now() / 1000) | 0}:R>`)
    .setColor('GREEN')
    .addFields(`${client.user.username}'s Server Count:`, `\`${client.guilds.cache.size}\` Severs`);

  await channel.send({ embeds: [embed] });
};