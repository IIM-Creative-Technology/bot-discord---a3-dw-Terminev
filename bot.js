const clientLoader = require('./src/clientLoader');
const commandLoader = require('./src/commandLoader');
const Discord = require('discord.js');
require('colors');

const COMMAND_PREFIX = '!';

clientLoader.createClient(["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"])
  .then(async (client) => {
    await commandLoader.load(client);

    /* Quand une personne arrive sur le serveur un rôle lui est automatiquement attribué */
    client.on('guildMemberAdd', async (member) => {
      if(!member.user.bot){
        await client.commands.get('firstconnect').run(member)
      }
    })

    /* Permets d'ajouter de l'xp à chaque envoie de message */
    client.on('messageCreate', async (message) => {
      if (!message.author.bot && !message.content.startsWith(COMMAND_PREFIX)) {
        await client.commands.get('levelup').run(client,message)
      }
    })

    client.on('messageCreate', async (message) => {
      // Ne pas tenir compte des messages envoyés par les bots ou qui commencent par le préfix
      if (message.author.bot || !message.content.startsWith(COMMAND_PREFIX)) return;

      // On découpe le message pour récupérer tous les mots
      const words = message.content.split(' ');

      const commandName = words[0].slice(1); // Le premier mot du message, auquel on retire le préfix
      const arguments = words.slice(1); // Tous les mots suivants sauf le premier

      if (client.commands.has(commandName)) {
        // La commande existe, on la lance
        client.commands.get(commandName).run(client, message, arguments);
      } else {
        // La commande n'existe pas, on prévient l'utilisateur
        await message.delete();
        await message.channel.send(`The ${commandName} does not exist.`);
      }
    })
  });