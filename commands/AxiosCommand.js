const Discord = require('discord.js');
const axios = require("axios")

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
    const channel = message.channel;

    
    axios.get('https://api.x.immutable.com/v1/collections/0xdbce5b8b8befa06057459767c8a585a418a6e8d2')
        .then(async function (response) {
            
            const embed = new Discord.MessageEmbed();
                embed.setTitle(response.data.name)
                embed.setDescription(response.data.description)
                embed.setImage(response.data.icon_url)
            
            await channel.send({
                embeds : [
                    embed
                ]
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

};

module.exports.name = 'getNFT';