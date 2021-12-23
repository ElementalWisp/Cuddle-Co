const reqString = 
{
    type: String,
    required: true
}

const commandAutorole = new mongoose.Schema
({
    // Guild ID
    _id: reqString,
    roles:
    {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('autoroles', commandAutorole)