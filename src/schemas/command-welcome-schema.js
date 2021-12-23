const reqString = 
{
    type: String,
    required: true
}

const commandWelcomeSchema = new mongoose.Schema
({
    // Guild ID
    _id: reqString,
    channelId: reqString,
    text: reqString
})

module.exports = mongoose.model('welcome-messages', commandWelcomeSchema)