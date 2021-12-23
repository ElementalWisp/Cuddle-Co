myId = '199283830702604299'

module.exports = async (client, e) => 
{
    const user = await client.users.fetch(myId).catch(error =>
        {
            if(error.code !== 10013)
            {
                console.error('Failed to fetch the master:', error)
            }
        })

    if (e.isArrray)
    {
        if(user)
        {
            user.send(`An error encountered: \`${e.slice(0, 2000)}\``)
        }
        else
        {
            console.error(e)
        }
    }
    else
    {
        if(user)
        {
            user.send(`An Distube encountered: \`${e}\``)
        }
        else
        {
            console.error(e)
        }
    }
}