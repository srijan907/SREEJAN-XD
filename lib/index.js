// Simple command registration system
const commands = [];

// cmd function: registers a command with options and a handler function
function cmd(options, handler) {
    commands.push({ ...options, handler });
}

// Export both the cmd function and the list of commands (for the menu)
module.exports = { cmd, commands };
