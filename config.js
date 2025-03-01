module.exports = {
    SESSION_ID: process.env.SESSION_ID || '', // WhatsApp Session ID
    OWNER_NUMBER: process.env.OWNER_NUMBER || '918123456789', // Bot Owner Number
    BOT_NAME: process.env.BOT_NAME || 'SREEJAN-XD', // Bot Name
    PREFIX: process.env.PREFIX || '.', // Command Prefix
    BOT_MODE: process.env.BOT_MODE || 'public', // 'public' or 'private'
    SUDO: process.env.SUDO ? process.env.SUDO.split(',') : ['918123456789'], // Sudo Users
    THEME: process.env.THEME || 'dark', // Bot Theme

    API_KEYS: {
        OPENAI: process.env.OPENAI_API || '', // OpenAI API Key (for AI features)
        UNSPLASH: process.env.UNSPLASH_API || '' // Image API Key
    },

    FEATURES: {
        AUTO_STATUS_VIEW: process.env.AUTO_STATUS_VIEW || 'true', // Auto Status View
        AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || 'true', // Auto React on Status
        AUTO_REACT_EMOJIS: process.env.AUTO_REACT_EMOJIS || "❤️,😂,🔥,😍,👍,😜,💖", // Random Emoji List
        LOG_MESSAGES: process.env.LOG_MESSAGES || 'false' // Log all messages
    },

    HEROKU: {
        ENABLED: process.env.HEROKU_ENABLED || 'false', // Enable Heroku Deployment
        APP_NAME: process.env.HEROKU_APP_NAME || '', // Heroku App Name
        API_KEY: process.env.HEROKU_API_KEY || '' // Heroku API Key
    }
};
