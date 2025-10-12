module.exports.config = {
	name: "autosetname",
	eventType: ["log:subscribe"],
	version: "1.0.3",
	credits: "NOBITA CHAT BOT",
	description: "Automatically set new member nicknames"
};

module.exports.run = async function({ api, event, Users }) {
const { threadID } = event;
var memJoin = event.logMessageData.addedParticipants.map(info => info.userFbId)
	for (let idUser of memJoin) {
		const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
		const { join } = global.nodemodule["path"]
		const pathData = join("./modules/commands","cache", "autosetname.json");
		var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
		var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, nameUser: [] };
		if (thisThread.nameUser.length == 0) return 
		if (thisThread.nameUser.length != 0) {  
		var setName = thisThread.nameUser[0] 
		await new Promise(resolve => setTimeout(resolve, 1000));
		var namee1 = await api.getUserInfo(idUser)
        var namee = namee1[idUser].name
		api.changeNickname(`${setName} ${namee}`, threadID, idUser);
		} 
	}	
	return api.sendMessage(`𝐒𝐞𝐭 𝐚 𝐓𝐞𝐦𝐩𝐨𝐫𝐚𝐫𝐲 𝐍𝐢𝐜𝐤𝐧𝐚𝐦𝐞 𝐅𝐨𝐫 𝐓𝐡𝐞 𝐍𝐞𝐰 𝐌𝐞𝐦𝐛𝐞𝐫 💞`, threadID, event.messageID)
}
