const reqString = 
{
    type: String,
    required: true
}

const commandDeleteSchema = new mongoose.Schema
({
    // Guild ID
    guildId: reqString,
    channelId: reqString,
    channel: reqString,
    time: reqString,
    messageId: reqString,
    epoch: reqString
})

module.exports = mongoose.model('auto-delete', commandDeleteSchema)