const fs = require('fs')

class DistubeHandler
{
    constructor(distube)
    {
        this.distube = distube
    }

    init()
    {
        const files = fs.readdirSync('./src/DistubeEvents').filter(x => x.endsWith('.js'))
        for(const file of files)
        {
            const event = require(`../DistubeEvents/${file}`)
            const name = file.split('.')[0]
            this.distube.on(name, event.bind(null, this.distube))
        }
    }   
}

module.exports = DistubeHandler