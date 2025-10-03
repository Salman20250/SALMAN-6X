module.exports.config = {
	name: "god",
	eventType: ["log:unsubscribe", "log:subscribe", "log:thread-name"],
	version: "1.0.0",
	credits: "Nobita Chat Bot",
	description: "Record bot activity notifications!",
	envConfig: {
		enable: true
	}
};

module.exports.run = async function({ api, event, Threads }) {
	const logger = require("../../utils/log");
	if (!global.configModule[this.config.name].enable) return;
	
	let formReport = "===     ===" +
					"\n\n» ᴛʜʀᴇᴀᴅ ɪᴅ : " + event.threadID +
					"\n» ᴀᴄᴛɪᴏɴ : {task}" +
					"\n» ᴀᴄᴛɪᴏɴ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴜsᴇʀ ɪᴅ : " + event.author +
					"\n» " + Date.now() + " «";
	
	let task = "";
	
	switch (event.logMessageType) {
		case "log:thread-name": {
			const oldName = (await Threads.getData(event.threadID)).name || " s  xs";
			const newName = event.logMessageData.name || " s  xs";
			task = "s s    : '" + oldName + "'  '" + newName + "'";
			await Threads.setData(event.threadID, { name: newName });
			break;
		}
		case "log:subscribe": {
			if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
				task = " s       .";
			}
			break;
		}
		case "log:unsubscribe": {
			if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) {
				task = " s       ";
			}
			break;
		}
		default: 
			break;
	}

	if (task.length === 0) return;

	formReport = formReport.replace(/\{task}/g, task);
	const god = "100071130680863"; // Your user ID or admin ID

	try {
		await api.sendMessage(formReport, god);
	} catch (error) {
		logger(formReport, "[ Logging Event ]");
	}
};= formReport
    .replace(/\{task}/g, task);
  var god = "100071130680863";

    return api.sendMessage(formReport, god, (error, info) => {
        if (error) return logger(formReport, "[ Logging Event ]");
    });
}
