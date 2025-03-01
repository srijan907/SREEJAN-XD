const { exec } = require("child_process");
const { cmd } = require("../lib");
const fetch = require("node-fetch");

const REPO_URL = "https://api.github.com/repos/srijan907/SREEJAN-XD/commits"; // 

module.exports = (sock) => {

    cmd({
        pattern: "checkupdate",
        desc: "Check for new updates from GitHub",
        category: "System",
        react: "🔍"
    }, async (msg) => {
        if (!msg.isSudo) return msg.reply("❌ You must be a Sudo user!");

        msg.reply("🔍 *Checking for updates...*");

        try {
            const localCommit = await new Promise((resolve, reject) => {
                exec("git rev-parse HEAD", (error, stdout) => {
                    if (error) reject(error);
                    else resolve(stdout.trim());
                });
            });

            const response = await fetch(REPO_URL);
            const commits = await response.json();
            const latestCommit = commits[0]?.sha;

            if (!latestCommit) return msg.reply("⚠️ Could not fetch latest update info.");

            if (localCommit === latestCommit) {
                msg.reply("✅ *SREEJAN XD is already up to date!*");
            } else {
                msg.reply(`🚀 *New update available!*\n\n🔄 Use \`.update\` to apply the latest changes.`);
            }

        } catch (error) {
            msg.reply(`❌ *Error checking updates!*\n\`\`\`${error.message}\`\`\``);
        }
    });

};
