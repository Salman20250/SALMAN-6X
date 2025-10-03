module.exports.config = {
 name: "antijoin",
 eventType: ["log:subscribe"],
 version: "1.0.0",
 credits: "NOBITA CHAT BOT",
 description: "Welcome new members to the group"
};

module.exports.run = async function ({ event, api, Threads, Users }) {
 	let data = (await Threads.getData(event.threadID)).data
 	if (data.newMember == false) return;
 	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) return
    else if(data.newMember == true) {
    var memJoin = event.logMessageData.addedParticipants.map(info => info.userFbId)
			for (let idUser of memJoin) {
					await new Promise(resolve => setTimeout(resolve, 1000));
					api.removeUserFromGroup(idUser, event.threadID, async function (err) {
                        if (err) return data["newMember"] = false;
                            await Threads.setData(event.threadID, { data });
                              global.data.threadData.set(event.threadID, data);
                    })
			}
 	return api.sendMessage(`» 𝐘𝐨𝐮𝐫 𝐎𝐮𝐫 𝐓𝐞𝐚𝐦 𝐍𝐨𝐰 𝐇𝐚𝐬 𝐀𝐧𝐭𝐢 𝐉𝐨𝐢𝐧 𝐌𝐨𝐝𝐞 𝐓𝐮𝐫𝐧𝐞𝐝 𝐎𝐧, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐓𝐮𝐫𝐧 𝐢𝐭 𝐎𝐟𝐟 𝐁𝐞𝐟𝐨𝐫𝐞 𝐀𝐝𝐝𝐢𝐧𝐠 𝐀 𝐍𝐞𝐰 𝐌𝐞𝐦𝐛𝐞𝐫🔥`, event.threadID);
 }
}
