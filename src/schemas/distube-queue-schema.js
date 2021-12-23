const distubeQueues = new mongoose.Schema
({
    // Guild ID
    _id: 
    {
        type: String,
        required: true
    },

    channelId:
    {
        type: String,
        required: true
    },

    voicechannelId:
    {
        type: String,
        required: true
    },

    urls:
    {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('distube-queues', distubeQueues)