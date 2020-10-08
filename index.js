const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix, token } = require('./config.json')
const questions = require('./questions.json')

client.once('ready', () => {
    console.log("Ready!")
})

client.on('message', msg => {
    if(!msg.content.startsWith(prefix) || msg.author.bot)
        return

    command = msg.content.slice(prefix.length).trim().split(/ +/)
    const commandName = command.shift().toLowerCase()

    if(commandName === 'ping')
        msg.reply("Pong!")
    
    else if(commandName === 'question'){

        const index = Math.floor(Math.random() * questions.length)
        
        const questionEmbed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle(questions[index].Question)
            .setDescription(questions[index].Description)
            .setURL(questions[index].Url)
            .addFields(
                { name: 'Companies', value: questions[index]["Companies Asked"]},
                { name: 'Tags', value: questions[index]["Tags"] }
            )
            .setTimestamp()
            .setFooter('Happy Coding!')

        msg.reply(questionEmbed)
    }
})

client.login(token)