module.exports.config = {
	name: "groupemoji",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "NOBITA CHAT BOT",
	description: "Change your group Emoji",
	commandCategory: "Box", 
	usages: "groupemoji [name]", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	var emoji = args.join(" ")
	if (!emoji) api.sendMessage("𝐘𝐨𝐮 𝐇𝐚𝐯𝐞 𝐍𝐨𝐭 𝐄𝐧𝐭𝐞𝐫𝐞𝐝 𝐄𝐦𝐨𝐣𝐢 🐸", event.threadID, event.messageID)
	else api.changeThreadEmoji(emoji, event.threadID, () => api.sendMessage(`🔨 𝐓𝐡𝐞 𝐁𝐨𝐭 𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐂𝐡𝐚𝐧𝐠𝐞𝐝 𝐄𝐦𝐨𝐣𝐢 𝐓𝐨 : ${emoji}`, event.threadID, event.messageID));
});
}
