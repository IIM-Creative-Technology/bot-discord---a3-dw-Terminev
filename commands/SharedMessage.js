const Discord = require('discord.js');
const db = require('../database');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
    db.executeQuery("SELECT * FROM xp WHERE user_id = " + message.author.id + " AND guild_id = " + message.guildId)
          .then((level) => {
            // Permets de récuperer tous les serveurs discord où le bot est présent
            const serveurs = client.guilds.cache.map(resp => resp)
            for (var i = 0; i < serveurs.length; i++) {
              // Si le serveur est différent de celui où le message a été envoyé
              if (serveurs[i].id != message.guildId) {
                // Permets de récuperer tous les channels présents sur le serveur
                const serv = serveurs[i].channels.cache.map(res => res)
                for (var h = 0; h < serv.length; h++) {
                  // Si le nom du channel est égale à shared
                  if (serv[h].name === "shared") {
                    const role = message.guild.roles.cache.map(r => r)
                    if (level[0]) {
                      for (var k = 0; k < role.length; k++) {
                        // Permets de récupérer les informations liées au rôle comme le niveau ou la couleur du rôle
                        if (role[k].name == "Niveau " + level[0].xp_level) {
                          // Setup de l'embed
                          const embed = new Discord.MessageEmbed();
                          embed
                            .setTitle('Nouveau Message')
                            .setColor(`#${role[k].color.toString(16)}`)
                            .setDescription(`${message.author.username} a envoyé un message sur ${message.guild.name} et il est niveau ${level[0].xp_level}`)
                          serv[h].send({
                            embeds: [embed]
                          })
                        }
                      }
                    }
                  }
                }
              }
            }
          })
};

module.exports.name = 'sharedmessage';
