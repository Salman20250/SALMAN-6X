module.exports.config = {
  name: "ban",
  version: "2.4.0",
  hasPermssion: 2,
  credits: "NOBITA CHAT BOT",
  description: "Ban or unban a user directly, works on reply too",
  commandCategory: "group",
  usages: `${global.config.PREFIX}ban <UID/@tag>\n${global.config.PREFIX}unban <UID/@tag>`,
  cooldowns: 5
};

module.exports.languages = {
  "en": {
    "banSuccess": "[ Ban User ] Banned user: %1",
    "unbanSuccess": "[ Unban User ] Unbanned user: %1",
    "errorReponse": "%1 Can't do what you request",
    "IDNotFound": "%1 ID you import doesn't exist in database",
    "notBanned": "[ Unban User ] User %1 is not banned.",
  }
}

module.exports.run = async ({ event, api, args, Users, getText }) => {
  const { threadID, messageID, messageReply } = event;

  if (!args[0] && !messageReply) 
    return api.sendMessage("ᴜsᴀɢᴇ : ban <ᴜɪᴅ /@ᴛᴀɢ > ᴏʀ ᴜɴʙᴀɴ <ᴜɪᴅ/@ᴛᴀɢ >, ᴏʀ ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴜsᴇʀ's ᴍᴀssᴀɢᴇ", threadID, messageID);

  const command = event.body.split(" ")[0].slice(global.config.PREFIX.length).toLowerCase(); // ban or unban
  let targetID;
  if (messageReply) {
    targetID = messageReply.senderID;
  }
  else if (Object.keys(event.mentions).length > 0) {
    targetID = Object.keys(event.mentions)[0];
  } 
  else {
    targetID = args[0];
  }

  if (!targetID) return api.sendMessage("ᴘʟᴇᴀsᴇ ᴍᴇɴᴛɪᴏɴ ʀᴇᴘʟʏ ᴏʀ ɢɪᴠᴇ ᴜɪᴅ..!", threadID, messageID);
  if (isNaN(targetID)) return api.sendMessage("ɪɴᴠᴀʟɪᴅ ᴜɪᴅ", threadID, messageID);
  if (!global.data.allUserID.includes(targetID)) 
    return api.sendMessage(getText("IDNotFound", "[ User System ]"), threadID, messageID);

  const nameTarget = global.data.userName.get(targetID) || await Users.getNameUser(targetID);

  if (command === "ban") {
    try {
      let data = (await Users.getData(targetID)).data || {};
      data.banned = true;
      await Users.setData(targetID, { data });
      global.data.userBanned.set(targetID, { reason: null, dateAdded: new Date().toLocaleString("en-GB", { timeZone: "Asia/Dhaka" }) });
      return api.sendMessage(getText("banSuccess", `${targetID} - ${nameTarget}`), threadID, messageID);
    } catch {
      return api.sendMessage(getText("errorReponse", "[ ʙᴀɴ ᴜsᴇʀ ]"), threadID);
    }
  }

  else if (command === "unban") {
    try {
      let data = (await Users.getData(targetID)).data || {};
      if (!data.banned) return api.sendMessage(getText("ɴᴏᴛ ʙᴀɴɴᴇᴅ", `${targetID} - ${nameTarget}`), threadID);

      data.banned = false;
      await Users.setData(targetID, { data });
      global.data.userBanned.delete(targetID);

      return api.sendMessage(getText("ᴜɴʙᴀɴ sᴜᴄᴄᴇss", `${targetID} - ${nameTarget}`), threadID, messageID);
    } catch {
      return api.sendMessage(getText("errorReponse", "[ ᴜɴʙᴀɴ ᴜsᴇʀ ]"), threadID);
    }
  }

  else {
    return api.sendMessage("ᴡʀᴏɴɢ ɪɴᴘᴜᴛ ! ᴜsᴇ ʙᴀɴ/ᴜɴʙᴀɴ <ᴜɪᴅ /@ᴛᴀɢ > ᴏʀ ʀᴇᴘʟʏ ᴛᴏ ᴜsᴇʀ's ᴍᴇssᴀɴɢᴇ", threadID, messageID);
  }
};
