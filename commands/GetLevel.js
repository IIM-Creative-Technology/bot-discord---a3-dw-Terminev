const Discord = require('discord.js');
const db = require('../database');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
    if(!message.author.bot){
        db.executeQuery("SELECT * FROM xp WHERE user_id = " + message.author.id+ " AND guild_id = " + message.guildId)
        .then((resp)=> {
            if(resp[0]){
                // Permets d'envoyer sur le channel le niveau actuel de l'utilisateur
                message.channel.send(`:ballot_box: **| <@${message.author.id}> tu es level ${resp[0].xp_level} et tu as ${resp[0].xp_count}xp**`)
            }
        })
    }
};

module.exports.name = 'level';
