module.exports.config = {
  name: "boxadmin",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "ɴᴏʙɪᴛᴀ ᴄʜᴀᴛ ʙᴏᴛ",
  description: "Add/remove admin via me, mention, or reply",
  commandCategory: "system",
  usages: "boxadmin me | boxadmin add/remove @mention | reply",
  cooldowns: 5
};

const cleanName = (name) => {
  if (!name) return null;
  return name.replace(/\s+/g, " ").trim();
};

module.exports.run = async function({ api, event, args }) {
  const threadID = event.threadID;
  const botID = api.getCurrentUserID();

  try {
    let action = args[0]?.toLowerCase();

    if (action === "me") action = "add";

    if (!["add", "remove"].includes(action)) 
      return api.sendMessage("🌸 ᴜsᴀɢᴇ : ʙᴏxᴀᴅᴍɪɴ ᴍᴇ | ʙᴏxᴀᴅᴍɪɴ ᴀᴅᴅ/ʀᴇᴍᴏᴠᴇ @ᴍᴇɴᴛɪᴏɴ | ʀᴇᴘʟʏ", threadID, event.messageID);

    let uid;
    let targetName;

    if (args[0]?.toLowerCase() === "me") {
      uid = event.senderID;
    } else if (event.mentions && Object.keys(event.mentions).length > 0) {
      uid = Object.keys(event.mentions)[0];
    } else if (event.type === "message_reply" && event.messageReply) {
      uid = event.messageReply.senderID;
    } else if (args[1]?.toLowerCase() === "me") {
      uid = event.senderID;
    } else {
      return api.sendMessage("🌸 🌸 ᴜsᴀɢᴇ : ʙᴏxᴀᴅᴍɪɴ ᴍᴇ | ʙᴏxᴀᴅᴍɪɴ ᴀᴅᴅ/ʀᴇᴍᴏᴠᴇ @ᴍᴇɴᴛɪᴏɴ | ʀᴇᴘʟʏ", threadID, event.messageID);
    }

    const userInfo = await api.getUserInfo([uid, event.senderID]);
    
    const senderName = cleanName(userInfo[event.senderID]?.name) || "আপনি";
    
    if (event.mentions && Object.keys(event.mentions).length > 0) {
      targetName = cleanName(Object.values(event.mentions)[0]);
    } else if (event.type === "message_reply" && event.messageReply) {
      targetName = cleanName(event.messageReply.senderName) || cleanName(userInfo[uid]?.name);
    } else {
      targetName = cleanName(userInfo[uid]?.name);
    }
    
    if (!targetName) targetName = "User";

    const threadInfo = await api.getThreadInfo(threadID);
    const botIsAdmin = threadInfo.adminIDs.some(admin => admin.id == botID);
    const targetIsAdmin = threadInfo.adminIDs.some(admin => admin.id == uid);

    if (!botIsAdmin && uid !== event.senderID) 
      return api.sendMessage("এই কমান্ডটি Usage  করার জন্য আগে আমাকে গ্রুপের এডমিন দিতে হবে 🌺", threadID, event.messageID);

    if (action === "add") {
      if (targetIsAdmin) 
        return api.sendMessage(`${targetName} আগে থেকেই গ্রুপের এডমিন রয়েছেন ✅`, threadID, event.messageID);

      await api.changeAdminStatus(threadID, uid, true);
      if (uid === event.senderID) 
        return api.sendMessage(`✅ ${senderName} নিজেকে এডমিন বানিয়েছে! 🌸`, threadID, event.messageID);
      else 
        return api.sendMessage(`✅ ${senderName} ${targetName}-কে এডমিন বানিয়েছে! 😘`, threadID, event.messageID);

    } else if (action === "remove") {
      if (!targetIsAdmin) 
        return api.sendMessage(`${targetName} এখনো গ্রুপের এডমিন নয়! ❌`, threadID, event.messageID);

      await api.changeAdminStatus(threadID, uid, false);
      if (uid === event.senderID) 
        return api.sendMessage(` ${senderName} নিজেকে এডমিন থেকে রিমুভ করেছে! 🐸`, threadID, event.messageID);
      else 
        return api.sendMessage(` ${targetName} কে এডমিন থেকে রিমুভ করেছে! 🤣`, threadID, event.messageID);
    }

  } catch (e) {
    return api.sendMessage("⚠️ Error: " + e.message, threadID, event.messageID);
  }
};
