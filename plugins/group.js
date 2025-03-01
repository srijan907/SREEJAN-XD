const { cmd } = require('../lib');

module.exports = (sock) => {

    // 🔒 Group Lock/Unlock Command
    cmd({
        pattern: 'grouplock',
        desc: 'Lock or Unlock Group',
        category: 'Group',
        react: '🔒'
    }, async (msg, args) => {
        if (!msg.isAdmin) return msg.reply("❌ You must be an Admin!");
        let action = args[0] === 'on' ? 'announcement' : 'not_announcement';
        await sock.groupSettingUpdate(msg.chat, action);
        msg.reply(`✅ Group has been ${action === 'announcement' ? 'Locked 🔒' : 'Unlocked 🔓'}!`);
    });

    // 🏅 Promote Member to Admin
    cmd({
        pattern: 'promote',
        desc: 'Promote a member to Admin',
        category: 'Group',
        react: '⚡'
    }, async (msg, args) => {
        if (!msg.isAdmin || !msg.isGroup) return msg.reply("❌ This command is for Group Admins only!");
        if (!msg.mentioned.length) return msg.reply("🔹 Mention a user to promote.");
        await sock.groupParticipantsUpdate(msg.chat, msg.mentioned, "promote");
        msg.reply(`✅ Successfully Promoted ${msg.mentioned.map(u => '@' + u.split('@')[0]).join(', ')}`, { mentions: msg.mentioned });
    });

    // 📉 Demote Admin to Member
    cmd({
        pattern: 'demote',
        desc: 'Demote an Admin to Member',
        category: 'Group',
        react: '📉'
    }, async (msg, args) => {
        if (!msg.isAdmin || !msg.isGroup) return msg.reply("❌ This command is for Group Admins only!");
        if (!msg.mentioned.length) return msg.reply("🔹 Mention an admin to demote.");
        await sock.groupParticipantsUpdate(msg.chat, msg.mentioned, "demote");
        msg.reply(`✅ Successfully Demoted ${msg.mentioned.map(u => '@' + u.split('@')[0]).join(', ')}`, { mentions: msg.mentioned });
    });

    // ❌ Remove/Kick a Member
    cmd({
        pattern: 'kick',
        desc: 'Remove a member from the group',
        category: 'Group',
        react: '❌'
    }, async (msg, args) => {
        if (!msg.isAdmin || !msg.isGroup) return msg.reply("❌ You must be an Admin!");
        if (!msg.mentioned.length) return msg.reply("🔹 Mention a user to kick.");
        await sock.groupParticipantsUpdate(msg.chat, msg.mentioned, "remove");
        msg.reply(`👋 Removed: ${msg.mentioned.map(u => '@' + u.split('@')[0]).join(', ')}`, { mentions: msg.mentioned });
    });

};
