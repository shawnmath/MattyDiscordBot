require('dotenv').config();
const https = require('https');

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

client.on('ready', () => console.log('BOT READY'));

client.on('message', msg => {
  if (msg.content === '!PlsJoke') {

    let jokeData = '';
    https
      .get('https://api.jokes.one/jod', res => {
        res.on('data', chunk => jokeData += chunk);
        res.on('end', () => {
          const joke = JSON.parse(jokeData).contents.jokes[0].joke.text;
          msg.reply(joke);
        });
      })
      .on('error', err => {
        msg.reply('JokeBox not working right now...');
      });    
  }
});
