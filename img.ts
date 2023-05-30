// const { MessageEmbed } = require("discord.js")
const imgur = require('imgur');
// let client
const DiscordJS = require('discord.js')

module.exports = {
    category: 'Imgur',
    description: 'upload image to imgur',
    slash: true,
    testOnly: true,
    expectedArgs: 'FILE URL',
    minArgs: 1,
    maxArgs: 1,
    syntaxError: 'please provide file url"',
    options: [{
        name: 'FileURL',
        description: 'upload image to imgur',
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }],

    callback: async ({ message, interaction, args }) => {
     //   const client = new ImgurClient({ clientId: 'fcba0f06727eb7e' });
      //  const imgur = require('imgur')
        interaction.deferReply();
        const query = args[0]
        console.log(query)

      imgur
      .uploadUrl(query)
      .then((json) => {
        var imgurl = (json.link);
        console.log('upload complete, url: ' + imgurl);
        setTimeout(() => {  interaction.editReply(imgurl); }, 2000);
      })
    }


} 
