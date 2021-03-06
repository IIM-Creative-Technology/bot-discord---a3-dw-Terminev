const Discord = require('discord.js');
const db = require('../database');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
    db.executeQuery("SELECT * FROM xp WHERE user_id = " + message.author.id + " AND guild_id = " + message.guildId)
          .then(async(resp) => {
            const role = message.guild.roles.cache.map(r => r)
            if (resp[0]) {
              // On initialise le niveau de difficulté qui augmente au fur et à mesure du niveau de l'utilisateur
              const diff = 4 + resp[0].xp_level
              if (resp[0].xp_count < diff) {
                // Si le score actuel est inférieur à la difficulté alors xp + 1
                const score = resp[0].xp_count += 1
                db.executeQuery("UPDATE `xp` SET `xp_count`='" + score + "' WHERE user_id =" + resp[0].user_id + " AND guild_id = " + message.guildId)
              } else {
                const scoreLevel = resp[0].xp_level += 1
                db.executeQuery("UPDATE `xp` SET `xp_count`='0' ,`xp_level`='" + scoreLevel + "'  WHERE user_id =" + resp[0].user_id + " AND guild_id = " + message.guildId)
                const level = resp[0].xp_level
                const roleName = 'Niveau ' + level
                var nbr = 0
                for (var i = 0; i < role.length; i++) {
                  // Si il trouve le rôle ayant le bon nom alors il l'ajoute à l'utilisateur
                  if (role[i].name == roleName) {
                    message.member.roles.add(role[i].id)
                    message.channel.send(`<@${message.author.id}> Vous avez le role ` + roleName)
                  }
                  // Si il trouve le rôle ayant un niveau inférieur à celui voulu alors il l'enlève a l'utilisateur
                  else if (role[i].name.split(' ')[0] == 'Niveau') {
                    message.member.roles.remove(role[i].id)
                    nbr += 1
                    if (nbr == role.length) {
                      message.guild.roles.create({
                          name: roleName,
                          color: "RANDOM"
                        })
                        .then((res) => {
                          message.member.roles.add(res.id)
                          message.channel.send(`<@${message.author.id}> Vous avez le rôle ` + roleName)
                        })
                    }
                  } else {
                    nbr += 1
                    // Si la valeur de nbr est égale à role.length, c'est que le rôle n'existe pas alors le bot créer le role et l'attribue à l'utilisateur
                    if (nbr == role.length) {
                      message.guild.roles.create({
                          name: roleName,
                          color: "RANDOM"
                        })
                        .then((res) => {
                          message.member.roles.add(res.id)
                          message.channel.send(`<@${message.author.id}> Vous avez le rôle ` + roleName)
                        })
                    }
                  }
                }
              }
            } else {
              // Si l'utilisateur n'existe pas alors le bot l'insert dans la BDD, mais la valeur d'xp_count est initialisée à 1 car il a envoyé un message 
              db.executeQuery("INSERT INTO xp ( `xp_count`, `user_id`, `guild_id`) VALUES ('1','" + message.author.id + "', '" + message.guildId + "')")
            }
            /* Permets de vérifier si le message ne contient pas d'insulte */
            await client.commands.get('messageinsulte').run(client,message)
                
            /* Permets de faire le bridge entre les différents serveurs */
            await client.commands.get('sharedmessage').run(client,message)
          })
};

module.exports.name = 'levelup';
