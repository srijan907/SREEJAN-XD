const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// Start the WhatsApp Bot
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const sock = makeWASocket({
        printQRInTerminal: true,
        logger: pino({ level: 'silent' }),
        auth: state,
        browser: [config.BOT_NAME, 'Chrome', '10.0.0']
    });

    sock.ev.on('creds.update', saveCreds);

    // Load plugins from plugins/ folder
    const pluginsDir = path.join(__dirname, 'plugins');
    fs.readdirSync(pluginsDir).forEach(file => {
        if (file.endsWith('.js')) {
            require(path.join(pluginsDir, file))(sock);
        }
    });

    // Example event: handle incoming messages
    sock.ev.on('messages.upsert', async m => {
        console.log('Received messages', m);
        // Add your command handlers etc here
    });

    sock.ev.on('connection.update', (update) => {
        const { connection } = update;
        if(connection === 'close') {
            console.log('Connection closed. Reconnecting...');
            startBot();
        } else if(connection === 'open') {
            console.log('Connected successfully!');
        }
    });
}

startBot();
