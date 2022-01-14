module.exports = async (distube, message, query) =>
{
    const embed = new MessageEmbed()
        .setColor(color)
        .setDescription(`No result found for \`${query}\``)
    await message.channel.send({ embeds: [embed] })
}