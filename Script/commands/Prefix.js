module.exports.config = {
  name: "prefix",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "NOBITA CHAT BOT",
  description: "Display the bot's prefix and owner info",
  commandCategory: "Information",
  usages: "",
  cooldowns: 5
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body } = event;
  if (!body) return;

  var dataThread = await Threads.getData(threadID);
  var data = dataThread.data || {};
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  const groupName = dataThread.threadInfo?.threadName || "Unnamed Group";

  const triggerWords = [
    "prefix", "mprefix", "mpre", "bot prefix", "what is the prefix", "bot name",
    "how to use bot", "bot not working", "bot is offline", "prefx", "prfix",
    "perfix", "bot not talking", "where is bot", "bot dead", "bots dead",
    "dấu lệnh", "daulenh", "what prefix", "freefix", "what is bot", "what prefix bot",
    "how use bot", "where are the bots", "where prefix"
  ];

  let lowerBody = body.toLowerCase();
  if (triggerWords.includes(lowerBody)) {
    return api.sendMessage(
`🌟━━━━━━━━━━━━━━━━━🌟
　『 𝐏𝐑𝐄𝐅𝐈𝐗 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 』
🌟━━━━━━━━━━━━━━━━━🌟
『 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 』

➤ 𝗕𝗢𝗧 𝗣𝗥𝗘𝗙𝗜𝗫 : [ ${prefix} ]
➤ 𝗕𝗢𝗧 𝗡𝗔𝗠𝗘 : ─꯭─⃝‌‌𝐍𝐎𝐁𝐈𝐓𝐀 𝐂𝐇𝐀𝐓 𝐁𝐎𝐓
➤ 𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡 : 𝐒𝐀𝐋𝐌𝐀𝐍 𝐀𝐇𝐌𝐄𝐃

『 𝐁𝐎𝐗 𝐈𝐍𝐅𝐎 』

➤ 𝗕𝗢𝗫 𝗣𝗥𝗘𝗙𝗜𝗫 : ${prefix}
➤ 𝗕𝗢𝗫 𝗡𝗔𝗠𝗘 : ${groupName}
➤ 𝗕𝗢𝗫 𝗨𝗜𝗗 : ${threadID}

『 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 』

➤ 𝗢𝗪𝗡𝗘𝗥 𝗡𝗔𝗠𝗘 : 𝐍𝐎𝐁𝐈𝐓𝐀 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘
➤ 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞     : https://www.facebook.com/DEATH.USER1
➤ 𝗠𝗘𝗦𝗦𝗘𝗡𝗚𝗘𝗥  : https://m.me/DEATH.USER1
➤ 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣     : https://wa.me/+8801941010189

🌟━━━━━━━━━━━━━━━━━🌟
　　𝗧𝗛𝗔𝗡𝗞 𝗬𝗢𝗨 𝗨𝗦𝗜𝗡𝗚..💖
🌟━━━━━━━━━━━━━━━━━🌟`,
      threadID,
      null
    );
  }
};

module.exports.run = async ({ event, api }) => {
  return api.sendMessage("𝐓𝐲𝐩𝐞 '𝐏𝐫𝐞𝐟𝐢𝐱' 𝐎𝐫 𝐒𝐢𝐦𝐢𝐥𝐨𝐫 𝐓𝐨 𝐆𝐞𝐭 𝐓𝐡𝐞 𝐁𝐨𝐭 𝐈𝐧𝐟𝐨.", event.threadID);
};
