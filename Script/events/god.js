module.exports.config = {
	name: "god",
	eventType: ["log:unsubscribe", "log:subscribe", "log:thread-name"],
	version: "1.0.0",
	credits: "NOBITA CHAT BOT",
	description: "Record bot activity notifications!",
	envConfig: {
		enable: true
	}
};

module.exports.run = async function({ api, event, Threads }) {
	const logger = require("../../utils/log");
	if (!global.configModule[this.config.name].enable) return;
	
	let formReport = "=== 𝐍𝐎𝐁𝐈𝐓𝐀 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓 𝐍𝐎𝐅𝐈𝐅𝐈𝐂𝐀𝐓𝐈𝐎𝐍 ===" +
					"\n\n» ᴛʜʀᴇᴀᴅ : " + event.threadID +
					"\n» ᴀᴄᴛɪᴏɴ : {task}" +
					"\n» ᴀᴄᴛɪᴏɴ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴜsᴇʀ ɪᴅ : " + event.author +
					"\n» " + Date.now() + " «";
	
	let task = "";
	
	switch (event.logMessageType) {
		case "log:thread-name": {
			const oldName = (await Threads.getData(event.threadID)).name || "𝐍𝐚𝐦𝐞 𝐃𝐨𝐞𝐬 𝐍𝐨𝐭 𝐄𝐱𝐢𝐬𝐭";
			const newName = event.logMessageData.name || "𝐍𝐚𝐦𝐞 𝐃𝐨𝐞𝐬 𝐍𝐨𝐭 𝐄𝐱𝐢𝐬𝐭";
			task = "𝐔𝐬𝐞𝐫 𝐂𝐡𝐚𝐧𝐠𝐞𝐝 𝐆𝐫𝐨𝐮𝐩 𝐍𝐚𝐦𝐞 𝐅𝐫𝐨𝐦 : '" + oldName + "' 𝐓𝐨 '" + newName + "'";
			await Threads.setData(event.threadID, { name: newName });
			break;
		}
		case "log:subscribe": {
			if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
				task = "𝐓𝐡𝐞 𝐔𝐬𝐞𝐫 𝐀𝐝𝐝𝐞𝐝 𝐓𝐡𝐞 𝐁𝐨𝐭 𝐓𝐨 𝐍𝐞𝐰 𝐆𝐫𝐨𝐮𝐩..🔥";
			}
			break;
		}
		case "log:unsubscribe": {
			if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) {
				task = "𝐓𝐡𝐞 𝐔𝐬𝐞𝐫 𝐊𝐢𝐜𝐤𝐞𝐝 𝐓𝐡𝐞 𝐁𝐨𝐭 𝐎𝐮𝐭 𝐎𝐟 𝐓𝐡𝐞 𝐆𝐫𝐨𝐮𝐩..⚠️";
			}
			break;
		}
		default: 
			break;
	}

	if (task.length === 0) return;

	formReport = formReport.replace(/\{task}/g, task);

	const receivers = [
		"100071130680863",   // Replace youR UID
		"2056569868083458"   //  Replace youR Group UID
	];

	for (const id of receivers) {
		try {
			await api.sendMessage(formReport, id);
		} catch (error) {
			logger(formReport, "[ Logging Event ]");
		}
	}
};
