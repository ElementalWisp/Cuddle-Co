module.exports = async (distube, message, query) =>
{
    message.channel.send(`No result found for \`${query}\``)
}