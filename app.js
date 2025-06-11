const express = require('express')
const path = require('path')
const fs = require('fs');
const url = require('url');
const bodyParser = require('body-parser');
const { json } = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const favicon = require('serve-favicon');
const http = require('http');
const $ = require('jquery');
const qrcode = require('qrcode-terminal');
const schedule = require('node-schedule');
const dayjs = require('dayjs')
const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);
const { Client, LocalAuth } = require('whatsapp-web.js');


const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});
//http
const app = express();
const port = 9876;

//app.use(favicon(path.join(__dirname, '/', 'favicon.ico')));



//################################
//||          Website           ||
//################################
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (_, res) => {res.sendFile('/public/html/index.html', {root: __dirname })});
app.use('/public',express.static('public'));


app.listen(port, () => {console.log(`App listening on port ${port}!`)});

let current_index = 0;

const schüler  = new Array ("Abboud Al-Ibrahim","Amary Niyomsuk", "Ate Veenstra", "Bennet Frey","Charlotte Weber", "Deike Ferdinand", "Finn Gebken", "Hendrik Bodenstein", "Henry Ulferts", "Imke Meints", "Inke Baumfalk", "Ivo Sander","Jannes Lehmann", "Jannik Peters","Jonah Elsner", "Julian Bruns", "Justus Hartmann","Kim Grüssing", "Leon Wenke", "Lucian Frey","Lukas Adler","Maya Harb", "Mila Bleeker", "Patricia Ruberg", "Suvi Kuwan", "Tammo Helbig", "Tim Renken","Tino Brinker")
let fridays = getFridays()


const startDate = new Date();





app.post('/public/getData', function(req, res) {  
  res.status(200).send([{"schüler":schüler[current_index], "tag":fridays[current_index]}, {"schüler":schüler[current_index +1], "tag":fridays[current_index +1]}])  
  
});


// cron job shenaningens
const job = schedule.scheduleJob('0 0 6 * * 4', function(){
	let tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1)
	if(tomorrow.toDateString() === fridays[current_index]) {
		groupChat.sendMessage("Morgen muss: " + schüler[current_index] + " einen Kuchen mitbringen");
	}
});


//################################
//||        Whatsapp Web        ||
//################################
let groupChat

client.on('ready', () => {
    console.log('Client is ready!');

    const chats = client.getChats();
    chats.then(res => {
		res.forEach((item) => {
			//Informatik LK
			if (item.name == "blub") {
				groupChat = item
				console.log(item.name + "Gefunden!")
				//groupChat.sendMessage("Halöle")
			}
		})
    	//console.log(res) 
    }).catch(err => {
    	console.log(err)
	})
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
client.on('message_create', message => {
	if (message.body === '!ping') {
		message.reply('pong');
	}
});
client.initialize();





function isWeekEven(date = new Date()) {
    const target = new Date(date.valueOf());
    const dayNum = (date.getUTCDay() + 6) % 7;
    target.setUTCDate(target.getUTCDate() - dayNum + 3);
    const firstThursday = new Date(target.getUTCFullYear(), 0, 4);
    const weekNum = 1 + Math.round(
        ((target - firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7
    );
	return weekNum % 2 == 0;
}



function getFridays() {
	let lastday = new Date();	
	let fridays = new Array();
	for (let i = 0; i < 30; i++){
		const day = lastday.getDay(); // 0 (Sun) - 6 (Sat)
		const diff = (5 - day + 7) % 7; // 5 = Friday
		const friday = new Date(lastday);
		
		if(!isWeekEven(friday)) {
			friday.setDate(lastday.getDate() + diff);
		}else{
			friday.setDate(lastday.getDate() + diff + 7);
		}
		lastday.setDate(lastday.getDate() + 14)
		if(!dayjs(friday).isBetween("2025-07-03", "2025-08-14", "day")){
			fridays.push(friday)
		}
		
	}
	console.log(fridays)
	return fridays
	
}

