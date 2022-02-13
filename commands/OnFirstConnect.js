const Discord = require('discord.js');
const db = require('../database');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (member) => {
  db.executeQuery("SELECT * FROM xp WHERE user_id = " + member.id + " AND guild_id = " + member.guild.id)
  .then((resp) => {
    // Si la personne n'existe pas dans la BDD alors il est initiliasé 
    if(!resp[0]){
      db.executeQuery("INSERT INTO xp (user_id, guild_id) VALUES (" + member.id + ", " + member.guild.id + ")")
    }
  })
    const firstConnect = member.guild.roles.cache.map(r => r);
      var Role0 = 0
      for (var t = 0; t < firstConnect.length; t++) {
        // Si le role niveau 0 existe deja sur le serveur alors il est ajouté
        if (firstConnect[t].name == "Niveau 0") {
          member.roles.add(firstConnect[t].id)
        } else {
          Role0 += 1
          // Si Role0 est égale au nombre de role présent sur le serveur, c'est que le role n'existe pas alors il est crée
          if (Role0 == firstConnect.length) {
            member.guild.roles.create({
                name: 'Niveau 0',
                color: "RANDOM"
              })
              .then((res) => {
                member.roles.add(res.id)
              })
          }
        }
      }
};

module.exports.name = 'firstconnect';