const { cmd } = require('../lib');
const config = require('../config');

module.exports = (sock) => {

    sock.ev.on('group-participants.update', async (update) => {
        let { id, participants, action } = update;

        for (let user of participants) {
            let username = `@${user.split('@')[0]}`;
            let message;

            if (action === 'add') {
                message = `👋 *Welcome ${username} to the Group!* 🎉\n\n💡 *Rules:* Be respectful and enjoy!`;
            } else if (action === 'remove') {
                message = `😢 *Goodbye ${username}!* We will miss you!`;
            }

            await sock.sendMessage(id, { text: message, mentions: [user] });
        }
    });

    cmd({
        pattern: 'welcome',
        desc: 'Toggle welcome message on/off',
        category: 'Group',
        react: '👋'
    }, async (msg, args) => {
        if (!msg.isAdmin) return msg.reply("❌ You must be an Admin!");
        msg.reply("✅ Welcome messages are now enabled!");
    });

};
