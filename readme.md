# Node Bot Discord


## Les Commandes

- !claim (Permets de récupérer son niveau actuel)
- !clear (1-100) (Permets de supprimer entre 1 et 100 messages sur le channel ou la commande est écrite)
- !admin (permet de se passer administrateur)
- !level (Permets de voir son expérience sur le serveur)
- !baninfo (Permets de voir son nombre d'avertissement sur le serveur)

## Installation
Pour installer le projet:
```sh
git clone ...
cd le projet
npm install
node bot.js
```
## La structure de la BDD

Pour faire fonctionner le bot il vous faut:
une BDD avec le nom: 'discordbot'
une table avec le nom: 'xp'
et les champs suivants:
- id
- user_id
- xp_count
- xp_level
- guild_id
- avertissement

Le fichier SQL de la BDD est disponible dans les fichiers 'discordbot.sql'
