const { cmd } = require('../lib');
const config = require('../config');

module.exports = (sock) => {
    // Command to toggle auto status react
    cmd({
        pattern: 'autoreact',
        desc: 'Toggle auto status react on/off',
        category: 'Settings',
        react: '❤️'
    }, async (msg, args) => {
        if (!msg.isOwner) return msg.reply("❌ Only the owner can change settings!");
        if (args && args[0] === "on") {
            config.FEATURES.AUTO_STATUS_REACT = "true";
            msg.reply("✅ Auto Status React Enabled!");
        } else if (args && args[0] === "off") {
            config.FEATURES.AUTO_STATUS_REACT = "false";
            msg.reply("❌ Auto Status React Disabled!");
        } else {
            msg.reply("⚙️ Usage: .autoreact on/off");
        }
    });

    // Example: Listening to status updates (if supported)
    sock.ev.on('status-update', async (status) => {
        if (config.FEATURES.AUTO_STATUS_REACT === "true") {
            let emojis = config.FEATURES.AUTO_REACT_EMOJIS.split(",");
            let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            // Assuming status.react exists
            await status.react(randomEmoji);
        }
    });
};
