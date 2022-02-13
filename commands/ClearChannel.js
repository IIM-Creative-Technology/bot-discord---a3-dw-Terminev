const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
    /* Fonction permettant de supprimer entre 1 et 100 messages sur le channel ou la commande est utilisée */
    var nbr = message.content.split(" ")[1]
    nbr = parseInt(nbr)
    if(nbr <= 100){
        message.channel.bulkDelete(nbr)
        message.channel.send(`<@${message.author.id}> **` + nbr + `** messages ont été supprimés !`)
    }else{
        message.channel.send(`<@${message.author.id}> Vous ne pouvez supprimez que 100 messages à la fois`)
    }
    
};

module.exports.name = 'clear';