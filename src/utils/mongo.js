global.mongoose = require('mongoose')
const mongooseconnectionstring = (process.env.mongoose)

mongoose.connect(mongooseconnectionstring, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true
    })
    .then(() =>
    {
        console.log('Connected to database')
    })
    .catch(err => console.log('error', err))

module.exports.mongoose = mongoose