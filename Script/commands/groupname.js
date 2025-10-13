module.exports.config = {
	name: "groupname",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "NOBITA CHAT BOT",
	description: "Rename your group",
	commandCategory: "Box", 
	usages: "groupname [name]", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async function({ api, event, args }) {
	var name = args.join(" ")
	if (!name) api.sendMessage("𝐘𝐨𝐮 𝐇𝐚𝐯𝐞 𝐍𝐨𝐭 𝐄𝐧𝐭𝐞𝐫𝐞𝐝 𝐓𝐡𝐞 𝐆𝐫𝐨𝐮𝐩 𝐍𝐚𝐦𝐞 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐨 𝐂𝐡𝐚𝐧𝐠𝐞💥", event.threadID, event.messageID)
	else api.setTitle(name, event.threadID, () => api.sendMessage(`🔨 𝐓𝐡𝐞 𝐁𝐨𝐭 𝐂𝐡𝐚𝐧𝐠𝐞𝐝 𝐓𝐡𝐞 𝐆𝐫𝐨𝐮𝐩 𝐍𝐚𝐦𝐞 𝐓𝐨 : ${name}`, event.threadID, event.messageID));
}
