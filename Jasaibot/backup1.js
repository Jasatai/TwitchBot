/**
 * 
 * ----------------------------
 * TODO: achivements
 * ----------------------------
 * TODO: logs
 */
const tmi = require('tmi.js');
const { timeout } = require('tmi.js/lib/commands');
const { info } = require('tmi.js/lib/logger');
const { username } = require('tmi.js/lib/utils');
const winston = require('winston');
const maxMessages = 20;
var chronos = 0;
var chronosStart = true;
var cmds = ['!commands', 'cmd', '!dice', '!die', '!easteregg', '!bot info', 'ara ara', 'moin', 'gn8', '!naughty', '!dev', 'time', '!lurk', '!bye', '!duschAdventure', '!dev messages', '!discord', '!dc', '!swimsuits', '!devlog', '!raid', '!test'];
var commands = 'COMMANDS: [!commands;cmd], [!bot info], [!dice;!die], [moin <username>], [gn8], [!naughty <username>], [!lurk], [!bye <username>], [!discord;!dc]';
var eastereggs = '[ara ara], [!easteregg], [!duschadventure <user1> <user2>]';
var commandsString = '';
var messageCount = 0;

const cmdAndResponse = [];

//chat logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

commandsString += commands[commands.length-1];
// Define configuration options
const opts = {
  identity: {
    username: 'jasaibot', //<BOT_USERNAME>
    password: 'oauth:go37hgd08bfj0o7i85dmckiulcrpjl' //<OAUTH_TOKEN>
  },
  channels: [
    //'sayuri_und_sato', //<CHANNEL_NAME>
    'jasatai',
    'jasatest'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
// Connect to Twitch:
client.connect();
// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  logger.log({
    level: 'silly',
    message: msg.trim(),
  });

  //start the 30 seconds timer at first message
  if (chronos+30000 <= Date.now()) {
    chronosStart = true;
  }
  if (chronosStart) {
    chronos = Date.now();
    chronosStart = false;
    messageCount = 0
  }
  if (messageCount >= maxMessages) {
    return;
  }

  // Remove whitespace from chat message
  const cm = msg.trim();
  const cmw = msg.trim().split(' ');
  /* comand over array
  for (let i = 0; i < commands.length; i++) {
    if (commandName === commands[i]) {
      command
    }
  } 
  */

  console.log(client.getUsername());
  var validCmd = true;
  
  // If the command is known, let's execute it
  if (cmw[0] === cmds[0] || cmw[0] === cmds[1]) {
    client.say(target, `${commands}`);
  //'!dice', '!die'
  } else if (cm === cmds[2] || cm === cmds[3]) {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
  //'!easteregg'
  } else if (cm === cmds[4]) {
    client.say(target, 'du hast das ei gefunden parzival')
  //'!bot info'
  } else if (cm === cmds[5]) {
    client.say(target, 'bot programiert von @jasatai fuer sayu und sato <3')
  //'ara ara'
  } else if (cm === cmds[6]) {
    client.say(target, 'ara ara :p')
  //'moin <username>'
  } else if (cmw[0] === cmds[7]) {
    client.say(target, 'servus @' + cmw[1]);
  //'gn8'
  } else if (cm === cmds[8]) {
    client.say(target, 'sayu, sato und Jasatai wünschen dir eine gute nacht und angenehme träume🌙');
  //'!naughty <username>'
  } else if (cmw[0] === cmds[9]) {
    client.say(target, '@' + cmw[1] + ' has been put on the naughty step');
  //'!dev time'
  } else if (cmw[0] === cmds[10] && cmw[1] ===  cmds[11]) {
    client.say(target, 'time in ms sice 01.01.1970: ' + Date.now())
  //'!lurk'
  } else if (cmw[0] === cmds[12]) {
    client.say(target, '@' + cmw[1] + ' erfeut sich jetzt still an dem stream, danke fürs da sein ')
  //'!bye <username>'
  } else if (cmw[0] === cmds[13]) {
    client.say(target, '@' + cmw[1] + ' okay, bis später')
  //'!duschAdventure'
  } else if (cmw[0] === cmds[14]) {
    client.say(target, 'du hast das geheime duschadventure von ' + cmw[1] + ' und ' + cmw[2] + ' gefunden... achivement unlocked ∘∘, to be addet... ')
  //'!dev messages'
  } else if (cm === cmds[15]) {
    const timeOutput = Date.now() - chronos
    client.say(target, 'devs only: message count: ' + messageCount + ' & time: ' + timeOutput)
  //'!discord || !dc'
  } else if (cmw[0] === cmds[16] || cmw[0] === cmds[17]) {
    client.say(target, 'Kommt doch mal vorbei in unser schönes Mondkönigreich, wo euch Sayuri und Sato gerne begrüssen. https://discord.com/invite/bgz6mbQ5bZ')
  //'!swimsuits'
  } else if (cmw[0] === cmds[18]) {
    client.say(target, 'those swimsuits are so cuuuuute <3 💜')
  //'!devlog'
  } else if (cmw[0] === cmds[19]) {
    client.say(target, 'dev log send, check your console')
    console.log(`-------------------\n\n\ntarget: ${target}\ncontext: ${context}\nmsg: ${msg}\nself ${self}\n`)
    for (let index = 0; index < context.length; index++) {
      console.log(i + ' ' + `${context[i]}`)
    }
    console.log('\n\n\n-------------------');
  } else if (cmw[0] === cmds[20]) {
    client.say(cmw[1], `raaaaaid! alle vom channel ${target} wünschen dir viel spaß`)
  } else if (cm === cmds[21]) {
    client.say(target, 'Jasatai\'s Jasaibot is working!')
  } else {
    validCmd = false;
  } 

  //poll

  //log
  if (validCmd) {
    console.log(`* Executed ${cm} command`);
    messageCount++;
    console.log(`messageCount: ${messageCount}`)
    console.log(`time left: ++to be addet++`)
  } else {
    console.log(`* Unknown command ${cm}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 100;
  return 69;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
