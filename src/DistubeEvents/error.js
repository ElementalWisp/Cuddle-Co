myId = '199283830702604299'

module.exports = async (distube, textChannel, e) => 
{
    const user = await distube.client.users.fetch(myId).catch(error =>
        {
            if(error.code !== 10013)
            {
                console.error('Failed to fetch the master:', error)
            }
        })

    if (e.isArrray)
    {
        textChannel.send(`Was not able to play - please try again or try another video/link`)
        if(user)
        {
            user.send(`A Distube error encountered in ${textChannel.guild.name}: \`${e.slice(0, 2000)}\``)
        }
        else
        {
            console.error(e)
        }
    }
    else
    {
        textChannel.send(`Was not able to play - please try again or try another video/link`)
        if(user)
        {
            user.send(`A Distube error encountered in ${textChannel.guild.name}: \`${e}\``)
        }
        else
        {
            console.error(e)
        }
    }
}