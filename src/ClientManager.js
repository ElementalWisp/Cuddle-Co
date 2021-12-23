const
{
   Client,
   Collection,
} = require ('discord.js')
const EventHandler = require('./utils/LoadEvents')
const DistubeHandler = require('./utils/LoadDistubeEvents')

module.exports = class ClientManager extends Client
{
    constructor(options)
    {
        super(options)
        this.commands = new Collection()
        this.aliases = new Collection()
    }

    setup() 
    {
        
        this.events = new EventHandler(this)
        this.events.init()
        
        this.music = new DistubeHandler(this.distube)
        this.music.init()

        require('./utils/LoadCommands')(this)

        this.login(process.env.token)
    }
    
}