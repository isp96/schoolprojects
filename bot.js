import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import imgur from 'imgur'
// import Intents from 'discord.js'
import gis from 'g-i-s'
import { MessageEmbed } from 'discord.js'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING

    ]

})

// just some test stuff 
client.on('messageCreate', (message) => {
    if (message.content.startsWith('>>>gis')) {
        message.reply({
            content: 'w ',
        })
    }
})


client.on('ready', () => {
    const __dirname = path.resolve()
    new WOKCommands(client, {
      // The name of the local folder for command files
      commandsDir: path.join(__dirname, 'commands'),
      // Allow importing of .ts files if are using ts-node
      typeScript: true,
      testServers: ['585164250482212914', '397005882573062144', '532922936114413578', '533103790337818624', '989123679759781909', '253193352755937280'],
    })
  })




client.login(process.env.TOKEN)