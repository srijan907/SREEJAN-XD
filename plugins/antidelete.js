const { cmd } = require('../lib');

module.exports = (sock) => {
    
    sock.ev.on('message.delete', async (deleted) => {
        let { remoteJid, participant, message } = deleted;
        let sender = participant.split('@')[0];
        let chat = remoteJid;

        if (message) {
            let m = await sock.loadMessage(chat, message.key);
            sock.sendMessage(chat, {
                text: `❌ *Anti-Delete Alert!* ❌\n\n📌 *Sender:* @${sender}\n🗑️ *Deleted Message:* ${m.message.conversation || "Unsupported message type."}`
            }, { mentions: [participant] });
        }
    });

    cmd({
        pattern: 'antidelete',
        desc: 'Enable or Disable Anti-Delete feature',
        category: 'Group',
        react: '🛡️'
    }, async (msg, args) => {
        if (!msg.isAdmin) return msg.reply("❌ You must be an Admin!");
        msg.reply("✅ Anti-Delete Protection is Enabled! 🛡️");
    });

};
