const Discord = require('discord.js');
const db = require('../database');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
    db.executeQuery("SELECT * FROM xp WHERE user_id = " + message.author.id + " AND guild_id = " + message.guildId)
        .then((resp) => {
            // la const badWords permet de stocker tous les mots interdit
            const badWords = ["test", "test2", "test3", "test4", "test5"];
            for (var i = 0; i < badWords.length; i++) {
                // Si le message contient un mot interdit alors il est supprimé
                if (message.content.split(' ').includes(badWords[i])) {
                    // Le message est supprimé
                    message.delete();
                    // On récupère les avertissements de l'utilisateur et on incrémente le nombre d'avertissement
                    const Averto = resp[0].avertissement += 1
                    db.executeQuery("UPDATE `xp` SET `avertissement`='" + Averto + "' WHERE user_id =" + resp[0].user_id + " AND guild_id = " + message.guildId)
                    // Si l'utilisateur atteint le nombre maximum d'avertissement alors il a rôle Banned
                    if (Averto == 4) {
                        const role = message.guild.roles.cache.map(r => r)
                        var ban = false
                        for (var z = 0; z < role.length; z++) {
                            // Si le rôle Banned existe déjà sur le serveur alors il est ajouté
                            if (role[z].name == 'Banned') {
                                ban = true
                                message.member.roles.add(role[z].id)
                                message.channel.send(`<@${message.author.id}> Vous avez été ban`)
                            } else if (ban == false) {
                                ban = true
                                message.guild.roles.create({
                                        name: 'Banned',
                                        color: "RANDOM"
                                    })
                                    .then((res) => {
                                        message.member.roles.add(res.id)
                                        message.channel.send(`<@${message.author.id}> Vous avez été ban`)
                                    })
                            }
                        }
                    } else {
                        // Si l'utilisateur n'a pas encore atteint le nombre maximum d'avertissement
                        message.channel.send(`<@${message.author.id}> Vous avez reçus un avertissement, vous avez ` + Averto + "/4 avertissement(s)");
                    }
                }
            }
        })
};

module.exports.name = 'messageinsulte';