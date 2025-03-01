const { cmd, commands } = require('../lib');
const fs = require('fs');
const path = require('path');
const config = require('../config');

module.exports = (sock) => {
    cmd({
        pattern: 'menu',
        desc: 'Show the command menu',
        category: 'General',
        react: '📜'
    }, async (msg) => {
        let menuText = `*🌟 ${config.BOT_NAME} BOT MENU 🌟*\n` +
            `🤖 *Owner:* @${config.OWNER_NUMBER}\n` +
            `📌 *Mode:* ${config.BOT_MODE}\n\n` +
            `*Commands List:*\n`;

        // List all registered commands
        commands.forEach(command => {
            menuText += `- .${command.pattern} ➝ ${command.desc}\n`;
        });

        // Check if a menu image exists in the media folder
        let imagePath = path.join(__dirname, '../media/menu.jpg');
        if (fs.existsSync(imagePath)) {
            // Assuming msg.sendMessage supports image with caption
            await msg.sendMessage({ image: { url: imagePath }, caption: menuText });
        } else {
            await msg.reply(menuText);
        }
    });
};
