const Discord = require('discord.js');
const db = require('../database')

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
    db.executeQuery("SELECT * FROM xp WHERE user_id = " + message.author.id + " AND guild_id = " + message.guildId)
        .then((resp) => {
            if (resp[0]) {
                // console.log(message.member._roles);
                const level = resp[0].xp_level
                const roleName = 'Niveau ' + level
                var nbr = 0
                const role = message.guild.roles.cache.map(r => r)
                for (var i = 0; i < role.length; i++) {
                    // Si il trouve le role ayant le bon nom alors il l'ajoute a l'utilisateur
                    if (role[i].name == roleName) {
                        message.member.roles.add(role[i].id)
                        message.channel.send(`<@${message.author.id}> Vous avez le role ` + roleName)
                    }
                    // Si il trouve le role ayant un niveau inférieur a celui voulu alors il l'enlève a l'utilisateur
                    else if (role[i].name.split(' ')[0] == 'Niveau') {
                        message.member.roles.remove(role[i].id)
                        nbr += 1
                        if (nbr == role.length) {
                            message.guild.roles.create({
                                    name: roleName,
                                })
                                .then((res) => {
                                    message.member.roles.add(res.id)
                                    message.channel.send(`<@${message.author.id}> Vous avez le rôle ` + roleName)
                                })
                        }
                    } else {
                        nbr += 1
                        // Si la valeur de nbr est égale a role.length, c'est que le role n'existe pas alors le bot créer le role et l'atribue a l'utilisateur
                        if (nbr == role.length) {
                            message.guild.roles.create({
                                    name: roleName,
                                })
                                .then((res) => {
                                    message.member.roles.add(res.id)
                                    message.channel.send(`<@${message.author.id}>  Vous avez le rôle ` + roleName)
                                })
                        }
                    }
                }
            }
        })
};

module.exports.name = 'claim';