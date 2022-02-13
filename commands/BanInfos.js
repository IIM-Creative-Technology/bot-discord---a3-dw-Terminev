const Discord = require('discord.js');
const db = require('../database')

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
        db.executeQuery("SELECT * FROM xp WHERE user_id = " + message.author.id+ " AND guild_id = " + message.guildId)
        .then((resp)=> {
            if(resp[0]){
                // Permets de voir le nombre d'avertissement qu'un utilisateur possède sur le serveur discord
                message.channel.send(`:pencil: **| <@${message.author.id}> tu as ${resp[0].xp_level} avertissement(s) **`)
            }
        })
};

module.exports.name = 'baninfo';