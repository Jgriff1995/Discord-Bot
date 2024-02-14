const { Events } = require('discord.js');

module.exports = {
    // name: states which event this file is for
    // once: property holds a boolean valuethat specifies if the event should run only once
    // execute: holds event logic, which will be called by the event handler whenever the event emits
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};

