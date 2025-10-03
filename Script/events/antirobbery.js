module.exports.config = {
    name: "guard",
    eventType: ["log:thread-admins"],
    version: "1.0.0",
    credits: "NOBITA CHAT BOT",
    description: "Prevent admin changes",
};

module.exports.run = async function ({ event, api, Threads, Users }) {
    const { logMessageType, logMessageData, senderID } = event;
 	let data = (await Threads.getData(event.threadID)).data
 	if (data.guard == false) return;
    if (data.guard == true ) {
        switch (logMessageType) {
          case "log:thread-admins": {
            if (logMessageData.ADMIN_EVENT == "add_admin") {
              if(event.author == api.getCurrentUserID()) return
              if(logMessageData.TARGET_ID == api.getCurrentUserID()) return
              else {
                api.changeAdminStatus(event.threadID, event.author, false, editAdminsCallback)
                api.changeAdminStatus(event.threadID, logMessageData.TARGET_ID, false)
                function editAdminsCallback(err) {
                  if (err) return api.sendMessage("𝐂𝐡𝐞 𝐒𝐭𝐮𝐩𝐢𝐝..😝", event.threadID, event.messageID);
                    return api.sendMessage(`» 𝐀𝐜𝐭𝐢𝐯𝐞 𝐀𝐧𝐭𝐢 - 𝐑𝐨𝐛𝐛𝐞𝐫𝐲 𝐁𝐨𝐱 𝐌𝐨𝐝𝐞✅`, event.threadID, event.messageID);
                }
              }
            }
            else if (logMessageData.ADMIN_EVENT == "remove_admin") {
              if(event.author == api.getCurrentUserID()) return
              if(logMessageData.TARGET_ID == api.getCurrentUserID()) return
              else {
                api.changeAdminStatus(event.threadID, event.author, false, editAdminsCallback)
                api.changeAdminStatus(event.threadID, logMessageData.TARGET_ID, true)
                function editAdminsCallback(err) {
                if (err) return api.sendMessage("𝐂𝐡𝐞 𝐒𝐭𝐮𝐩𝐢𝐝..😝", event.threadID, event.messageID);
                return api.sendMessage(`» 𝐀𝐜𝐭𝐢𝐯𝐞 𝐀𝐧𝐭𝐢 - 𝐑𝐨𝐛𝐛𝐞𝐫𝐲 𝐁𝐨𝐱 𝐌𝐨𝐝𝐞✅`, event.threadID, event.messageID);
              }
            }
          }
        }
      }
    }
}
