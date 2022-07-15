/**
 * TODO: automatic repeating messages
 * TODO: polls
 * ----------------------------
 * TODO: achivements
 * ----------------------------
 * TODO: logs
 */
const tmi = require('tmi.js');
const maxMessages = 20;
var chronos = 0;
var chronosStart = true;
var cmds = ['!commands', 'cmd', '!dice', '!die', '!easteregg', '!bot info', 'ara ara', 'moin', 'gn8', '!naughty', '!dev', 'time', '!lurk', '!bye', '!duschAdventure', '!dev messages', '!discord', '!dc', '!swimsuits', '!devlog', '!raid', '!test'];
var commands = 'COMMANDS: [!commands;cmd], [!bot info], [!dice;!die], [moin <username>], [gn8], [!naughty <username>], [!lurk], [!bye <username>], [!discord;!dc]';
var eastereggs = '[ara ara], [!easteregg], [!duschadventure <user1> <user2>]';
var commandsString = '';
var messageCount = 0;
/**-----------------------
 * load cmds from csv file
 *------------------------
 * Requiring fs module in which
 * readFile function is defined.
 */
const fs = require('fs');
const arrcmds = csv_To_Array(fs.readFileSync('./cmds.csv', {encoding:'utf8', flag:'r'}).toString());

function csv_To_Array(str, delimiter = ",") {
  const header_cols = str.slice(0, str.indexOf("\n")).split(delimiter);
  const row_data = str.slice(str.indexOf("\n") + 1).split("\n");
  row_data.pop();
  const arr = row_data.map(function (row) {
    const values = row.split(delimiter);
    const el = header_cols.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });
  // return the array
  return arr;
}
console.log(arrcmds);
/**
 * command and response (just one liner text resposes)
 * ---------------------------------------------------
 * []   cmd, alias
 * []   channels          '$target', 'GLOBAL'
 * ''   kategorie         'dev', 'easteregg',''
 * ''   usage desciption
 * ``   response
 * bool full message?
 *
const cmdAndResponse = [
  [['!bot info'],           ['sayuri_und_sato'],  '','!bot info',`bot programiert von @jasatai fuer sayu und sato <3`,true],
  [['moin'],                ['GLOBAL'],           '', 'moin <username>',`servus @${cmw[1]}`, false],
  [['ara ara'],             ['sayuri_und_sato'],  'ara ara',`ara ara :p`, true],
  [['!gn8', '!gute nacht'], ['sayuri_und_sato'],  '!gn8; !gute nacht',`sayu, sato und Jasatai wünschen dir/euch eine gute nacht und angenehme träume🌙`,true],
  [['!gn8', '!good night'], ['GLOBAL'],           '!gn8; !good night',`${target} and Jasatai wish you a good night and sweet dreams🌙`,true],
  [['!easteregg'],          ['sayuri_und_sato'],  '','',`du hast das ei gefunden pazival`,false]
]
 */


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

  //start the 30 seconds timer at first message
  if (chronos+30000 <= Date.now()) {
    chronosStart = true;
  }
  if (chronosStart) {
    chronos = Date.now();
    chronosStart = false;
    messageCount = 0;
  }
  if (messageCount >= maxMessages) {
    console.log('too many messages');
    return;
  }

  // Remove whitespace from chat message
  const cm = msg.trim();
  const cmw = msg.trim().split(' ');

  console.log(target)
  /* comand over array*/
  for (let i = 0; i < arrcmds.length; i++) {
    if (arrcmds[i].fullMessage === 'true'){
      if (arrcmds[i].cmd === cm && (arrcmds[i].channel === target || arrcmds[i].channel === 'GLOBAL')) {
        client.say(target, arrcmds[i].response);
        console.log(`* Executed ${cm} command`);
        messageCount++;
        console.log(`* messageCount: ${messageCount}`);
        console.log(`* time left: ++to be addet++`);
        return;
      }
    } else {
      if (arrcmds[i].cmd === cmw[0] && (arrcmds[i].channel === target || arrcmds[i].channel === 'GLOBAL')) {    
        client.say(target, arrcmds[i].response);
        console.log(`* Executed ${cm} command`);
        messageCount++;
        console.log(`* messageCount: ${messageCount}`);
        console.log(`* time left: ++to be addet++`);
        return;
      }
    }
  }

  var validCmd = true;
  
  // If the command is known, let's execute it
  if (cmw[0] === cmds[0] || cmw[0] === cmds[1]) {
    let disciptions;
    disciptions = 'COMMANDS: [!commands;cmd], ';;
    for (let i = 0; i < arrcmds.length-1; i++) {
      if (arrcmds[i].channel === target || arrcmds[i].channel === 'GLOBAL') {
        disciptions += '[';
        disciptions += arrcmds[i].usageDesciption;
        disciptions += '], '; 
      }
    }
    disciptions += '[' + arrcmds[arrcmds.length-1].usageDesciption + ']';
    client.say(target, `${disciptions}`);
  //'!dice', '!die'
  } else if (cm === '!dice' || cm === '!die') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
  //'!dev messages'
  } else if (cm === '!dev messages') {
    const timeOutput = Date.now() - chronos
    client.say(target, 'devs only: message count: ' + messageCount + ' & time: ' + timeOutput)
  //'!devlog'
  } else if (cmw[0] === '!devlog') {
    client.say(target, 'dev log send, check your console')
    console.log(`-------------------\n\n\ntarget: ${target}\ncontext: ${context}\nmsg: ${msg}\nself ${self}\n`)
    for (let index = 0; index < context.length; index++) {
      console.log(i + ' ' + `${context[i]}`)
    }
    console.log('\n\n\n-------------------');
  //'!raid <username>'
  } else if (cmw[0] === '!raid') {
    client.say(cmw[1], `raaaaaid! alle vom channel ${target} wünschen dir viel spaß`)
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
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
