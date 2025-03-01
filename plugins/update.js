const { exec } = require("child_process");
const { cmd } = require("../lib");

module.exports = (sock) => {

    cmd({
        pattern: "update",
        desc: "Update bot from GitHub",
        category: "System",
        react: "🔄"
    }, async (msg) => {
        if (!msg.isSudo) return msg.reply("❌ You must be a Sudo user!");

        msg.reply("🔄 *Checking for updates...*");

        exec("git pull && npm install", (error, stdout, stderr) => {
            if (error) {
                return msg.reply(`❌ *Update Failed!*\n\`\`\`${stderr}\`\`\``);
            }
            msg.reply(`✅ *Update Successful! Restarting bot...*\n\`\`\`${stdout}\`\`\``);

            setTimeout(() => {
                process.exit(0); // Bot Restart
            }, 3000);
        });
    });

};
