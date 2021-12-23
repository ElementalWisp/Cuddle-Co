module.exports = async (distube, message, answer, query) =>
{
    message.delete().catch(error =>
        {
            if(error.code !== 10008)
            {
                console.error('Failed to delete the message:', error)
            }
        })
    answer.delete().catch(error =>
        {
            if(error.code !== 10008)
            {
                console.error('Failed to delete the message:', error)
            }
        })
}