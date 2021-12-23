const {prefix} = require('../../config.json')
const cleanchannelmessages = require('../utils/CheckChannelMessages')

module.exports = (client) =>
{
	console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity(`It\'s a cuddle party! Listening to ${prefix}help`)
    
    cleanchannelmessages.cleanChannelMessages(client)
}