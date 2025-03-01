const { cmd } = require('../lib');

module.exports = (sock) => {
    cmd({
        pattern: 'mee',
        desc: 'Mention yourself in the chat',
        category: 'Fun',
        react: '🙋‍♂️'
    }, async (msg) => {
        let mention = `@${msg.sender.split('@')[0]}`;
        await msg.reply(mention, { mentions: [msg.sender] });
    });
};
